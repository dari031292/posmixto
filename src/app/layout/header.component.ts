import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideRotateCcw, lucideShare, lucideUndo2 } from '@ng-icons/lucide';

export type HeaderAction = 'reset' | 'share' | 'undo';

@Component({
  selector: 'app-header',
  imports: [RouterModule, HlmButtonImports, NgIconComponent],
  providers: [provideIcons({ lucideArrowLeft, lucideRotateCcw, lucideShare, lucideUndo2 })],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly actions = input<HeaderAction[]>([]);
  readonly actionClick = output<HeaderAction>();

  onActionClick(action: HeaderAction) {
    this.actionClick.emit(action);
  }

  getActionLabel(action: HeaderAction): string {
    if (action === 'reset') {
      return 'Reiniciar';
    }

    if (action === 'share') {
      return 'Compartir';
    }

    return 'Deshacer';
  }
}
