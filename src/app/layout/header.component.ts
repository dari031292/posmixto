import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideCircleMinus, lucideRotateCcw, lucideShare, lucideUndo2 } from '@ng-icons/lucide';

export const HEADER_ACTIONS = {
  RESET: 'reset',
  SHARE: 'share',
  UNDO: 'undo',
  SUBTRACT: 'subtract'
} as const;

export type HeaderAction = (typeof HEADER_ACTIONS)[keyof typeof HEADER_ACTIONS];

@Component({
  selector: 'app-header',
  imports: [RouterModule, HlmButtonImports, NgIconComponent],
  providers: [provideIcons({ lucideArrowLeft, lucideCircleMinus, lucideRotateCcw, lucideShare, lucideUndo2 })],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly actions = input<HeaderAction[]>([]);
  readonly activeActions = input<HeaderAction[]>([]);
  readonly actionClick = output<HeaderAction>();

  onActionClick(action: HeaderAction) {
    this.actionClick.emit(action);
  }

  isActionActive(action: HeaderAction): boolean {
    return this.activeActions().includes(action);
  }

  getActionLabel(action: HeaderAction): string {
    switch (action) {
      case HEADER_ACTIONS.RESET:
        return 'Reiniciar';
      case HEADER_ACTIONS.SHARE:
        return 'Compartir';
      case HEADER_ACTIONS.UNDO:
        return 'Deshacer';
      case HEADER_ACTIONS.SUBTRACT:
        return this.isActionActive(action) ? 'Desactivar modo restar' : 'Activar modo restar';
    }
  }
}
