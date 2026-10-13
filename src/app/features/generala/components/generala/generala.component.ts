import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerInputComponent } from '../../../shared/components/player-input/player-input.component';
import { ScoreGridComponent } from '../score-grid/score-grid.component';
import { GeneralaStateService } from '../../services/generala-state.service';
import { Player } from '../../../shared/models/player.types';
import { HlmButton } from '@spartan-ng/helm/button';
import { actionClickTrigger, LayoutService } from '../../../../layout/layout.service';

@Component({
    selector: 'app-generala',
    imports: [CommonModule, RouterModule, PlayerInputComponent, ScoreGridComponent, HlmButton],
    templateUrl: './generala.component.html'
})
export class GeneralaComponent {
    stateService = inject(GeneralaStateService);
    private layoutService = inject(LayoutService);
    isGameActive = this.stateService.isGameActive;
    players = this.stateService.activePlayers;

    constructor() {
        // Listen to layout header action clicks for reset
        effect(() => {
            const action = actionClickTrigger();
            if (action === 'reset') {
                this.resetGame();
                this.layoutService.resetActionTrigger();
            }
        });
    }

    updatePlayers(players: Player[]) {
        this.stateService.setPlayers(players);
    }

    startGame(playersList: Player[]) {
        if (playersList.length > 0) {
            this.stateService.startGame(playersList);
        }
    }

    endGame() {
        if (confirm('¿Estás seguro de que quieres terminar la partida?')) {
            this.stateService.endGame();
        }
    }

    resetGame() {
        if (confirm('¿Estás seguro de reiniciar? Se perderán todos los datos actuales.')) {
            this.stateService.resetGame();
        }
    }
}
