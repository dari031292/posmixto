import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { actionClickTrigger, LayoutService } from '../../../../layout/layout.service';
import { PalitosComponent } from '../../../shared/components/palitos/palitos.component';
import { HlmButton } from '@spartan-ng/helm/button';
import { TRUCO_HALF_SCORE, TRUCO_MAX_SCORE } from '../../models/truco.domain';
import { TrucoScores, TrucoTeam } from '../../models/truco.types';
import { TrucoService } from '../../services/truco.service';

@Component({
  selector: 'app-truco',
  standalone: true,
  imports: [CommonModule, PalitosComponent, HlmButton],
  templateUrl: './truco.component.html'
})
export class TrucoComponent {
  private trucoService = inject(TrucoService);
  private layoutService = inject(LayoutService);

  readonly Math = Math;
  readonly maxScore = TRUCO_MAX_SCORE;
  readonly halfScore = TRUCO_HALF_SCORE;

  constructor() {
    // Escucha la acción de reinicio emitida por el layout.
    effect(() => {
      const action = actionClickTrigger();
      if (action === 'reset') {
        this.reset();
        this.layoutService.resetActionTrigger();
      }
    });
  }

  get scores(): TrucoScores {
    return this.trucoService.scores;
  }

  addPoint(team: TrucoTeam) {
    this.trucoService.addPoint(team);
  }

  addPointFromControl(event: Event, team: TrucoTeam) {
    event.stopPropagation();
    this.addPoint(team);
  }

  removePoint(event: Event, team: TrucoTeam) {
    event.preventDefault(); // Evita el menú contextual.
    event.stopPropagation();
    this.trucoService.removePoint(team);
  }

  reset() {
    this.trucoService.reset();
  }

  // Devuelve siempre tres grupos de palitos para conservar la alineación del tablero.
  getSticks(points: number): number[] {
    const p1 = Math.min(5, Math.max(0, points));
    const p2 = Math.min(5, Math.max(0, points - 5));
    const p3 = Math.min(5, Math.max(0, points - 10));
    return [p1, p2, p3];
  }
}
