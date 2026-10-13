import { ComponentFixture, TestBed } from '@angular/core/testing';

import { actionClickTrigger, LayoutService } from '../../../../layout/layout.service';
import { MUS_STORAGE_KEY } from '../../models/mus.domain';
import { MusComponent } from './mus.component';

describe('MusComponent', () => {
  let component: MusComponent;
  let fixture: ComponentFixture<MusComponent>;
  let layoutService: LayoutService;

  beforeEach(async () => {
    localStorage.removeItem(MUS_STORAGE_KEY);
    actionClickTrigger.set(null);

    await TestBed.configureTestingModule({
      imports: [MusComponent]
    })
      .overrideComponent(MusComponent, {
        set: { template: '' }
      })
      .compileComponents();

    fixture = TestBed.createComponent(MusComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    component.cancelLongPress();
    actionClickTrigger.set(null);
    localStorage.removeItem(MUS_STORAGE_KEY);
  });

  it('should subtract from teams and categories when subtract mode is active', async () => {
    component.handleTeamTap(0);
    component.handleCategoryTap('grande');
    fixture.detectChanges();
    await fixture.whenStable();

    layoutService.triggerActionClick('subtract');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.subtractMode()).toBe(true);
    expect(layoutService.config().activeActions).toEqual(['subtract']);

    component.handleTeamTap(0);
    component.handleCategoryTap('grande');

    expect(component.scores[0]).toBe(0);
    expect(component.categoryValue('grande')).toBe(0);
  });

  it('should disable subtract mode after resetting the game', async () => {
    layoutService.triggerActionClick('subtract');
    fixture.detectChanges();
    await fixture.whenStable();

    component.reset();

    expect(component.subtractMode()).toBe(false);
    expect(layoutService.config().activeActions).toEqual([]);
  });

  it('should not begin a category drag while subtract mode is active', async () => {
    component.handleCategoryTap('grande');
    fixture.detectChanges();
    await fixture.whenStable();

    layoutService.triggerActionClick('subtract');
    fixture.detectChanges();
    await fixture.whenStable();

    component.startCategoryInteraction({
      currentTarget: null,
      pointerId: 1,
      clientX: 0,
      clientY: 0
    } as unknown as PointerEvent, 'grande');

    component.onWindowPointerMove({
      pointerId: 1,
      clientX: 20,
      clientY: 20
    } as unknown as PointerEvent);

    expect(component.dragPreview()).toBeNull();
    expect(component.hoveredDropTeam()).toBeNull();
  });
});
