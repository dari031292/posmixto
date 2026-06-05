import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { PlayerInputComponent } from '../../../../core/components/player-input/player-input.component';
import { Player } from '../../../../core/models/player.types';
import { actionClickTrigger, LayoutService } from '../../../../layout/layout.service';
import { BazasGridComponent } from '../bazas-grid/bazas-grid.component';
import { BazasStateService } from '../../services/bazas-state.service';

@Component({
    selector: 'app-bazas',
    standalone: true,
    imports: [CommonModule, PlayerInputComponent, BazasGridComponent, HlmButton],
    templateUrl: './bazas.component.html'
})
export class BazasComponent {
    stateService = inject(BazasStateService);
    private layoutService = inject(LayoutService);

    isGameActive = this.stateService.isGameActive;
    players = this.stateService.activePlayers;

    constructor() {
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
        if (playersList.length === 0) {
            return;
        }

        this.stateService.startGame(playersList);
    }

    resetGame() {
        if (confirm('¿Estás seguro de reiniciar? Se perderán todos los datos actuales.')) {
            this.stateService.resetGame();
        }
    }
}
