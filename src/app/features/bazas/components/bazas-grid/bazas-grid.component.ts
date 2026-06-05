import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BazasStateService } from '../../services/bazas-state.service';
import { BazasScoringService } from '../../services/bazas-scoring.service';
import { getRoundTitle } from '../../models/bazas.domain';
import { BazasRoundDefinition } from '../../models/bazas.types';
import { BazasCellComponent } from '../bazas-cell/bazas-cell.component';

@Component({
    selector: 'app-bazas-grid',
    standalone: true,
    imports: [CommonModule, BazasCellComponent],
    templateUrl: './bazas-grid.component.html'
})
export class BazasGridComponent {
    private stateService = inject(BazasStateService);
    private scoringService = inject(BazasScoringService);

    players = this.stateService.activePlayers;
    gameState = this.stateService.gameState;
    rounds = this.scoringService.rounds;

    getPlayerTotal(playerId: string): number {
        const state = this.gameState();
        if (!state) {
            return 0;
        }

        return this.scoringService.calculatePlayerTotal(state.scores[playerId] ?? {});
    }

    getRoundTitle(round: BazasRoundDefinition): string {
        return getRoundTitle(round);
    }
}
