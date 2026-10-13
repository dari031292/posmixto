import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('title', 'Mus');
    fixture.componentRef.setInput('actions', ['subtract']);
  });

  it('should expose the inactive subtract mode accessibly', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Activar modo restar');
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('should expose the active subtract mode accessibly', () => {
    fixture.componentRef.setInput('activeActions', ['subtract']);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.getAttribute('aria-label')).toBe('Desactivar modo restar');
    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(button.classList.contains('spartan-button-variant-destructive')).toBe(true);
  });
});
