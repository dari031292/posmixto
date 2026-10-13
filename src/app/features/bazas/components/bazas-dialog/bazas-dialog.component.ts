import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { BrnDialogRef, injectBrnDialogCtx } from '@spartan-ng/brain/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BazasRoundDefinition, BazasScoreEntry } from '../../models/bazas.types';
import { BazasScoringService } from '../../services/bazas-scoring.service';

export interface BazasDialogData {
    round: BazasRoundDefinition;
    hasValue: boolean;
    entry: BazasScoreEntry | null;
}

export type BazasDialogResult = { action: 'select', entry: BazasScoreEntry } | { action: 'clear' } | null;

@Component({
    selector: 'app-bazas-dialog',
    standalone: true,
    imports: [CommonModule, HlmDialogImports, HlmButton],
    templateUrl: './bazas-dialog.component.html'
})
export class BazasDialogComponent {
    private scoringService = inject(BazasScoringService);
    private dialogRef = inject(BrnDialogRef);

    context = injectBrnDialogCtx<BazasDialogData>();
    selectedTricks = signal(this.context.entry?.tricksWon ?? 0);
    predictedCorrectly = signal(this.context.entry?.predictedCorrectly ?? false);

    trickOptions = computed(() => this.scoringService.getTrickOptions(this.context.round));
    totalPoints = computed(() => this.scoringService.calculatePoints(this.selectedTricks(), this.predictedCorrectly()));

    confirmSelection() {
        const entry = this.scoringService.buildEntry(this.context.round, this.selectedTricks(), this.predictedCorrectly());
        this.dialogRef.close({ action: 'select', entry });
    }

    clearScore() {
        this.dialogRef.close({ action: 'clear' });
    }
}
