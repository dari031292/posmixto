import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { BazasRoundDefinition, BazasPlayerScores } from '../../models/bazas.types';
import { BazasStateService } from '../../services/bazas-state.service';
import { BazasDialogComponent, BazasDialogResult } from '../bazas-dialog/bazas-dialog.component';

@Component({
    selector: 'app-bazas-cell',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './bazas-cell.component.html'
})
export class BazasCellComponent {
    private stateService = inject(BazasStateService);
    private dialogService = inject(HlmDialogService);

    playerId = input.required<string>();
    round = input.required<BazasRoundDefinition>();
    scores = input.required<BazasPlayerScores>();

    entry = computed(() => this.scores()[this.round().id]);
    isFinished = computed(() => this.stateService.gameState()?.isFinished ?? false);

    toggleSelection() {
        if (this.isFinished()) {
            return;
        }

        const dialogRef = this.dialogService.open(BazasDialogComponent, {
            context: {
                round: this.round(),
                hasValue: !!this.entry(),
                entry: this.entry() ?? null
            },
            contentClass: 'w-[340px]'
        });

        dialogRef.closed$.subscribe((result: BazasDialogResult) => {
            if (!result) {
                return;
            }

            if (result.action === 'select') {
                this.stateService.setRoundScore(this.playerId(), this.round(), result.entry);
                return;
            }

            this.stateService.setRoundScore(this.playerId(), this.round(), null);
        });
    }
}
