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
    template: `
        <hlm-dialog-header>
            <h3 hlmDialogTitle>Anotar</h3>
        </hlm-dialog-header>

        <div class="space-y-4 py-4">
            <section class="space-y-2">
                <p class="text-sm font-medium">Bazas ganadas</p>
                <div class="grid grid-cols-3 gap-2">
                    @for (option of trickOptions(); track option) {
                    <button hlmBtn [variant]="selectedTricks() === option ? 'default' : 'outline'" (click)="selectedTricks.set(option)">
                        {{ option }}
                    </button>
                    }
                </div>
            </section>

            <section class="space-y-2">
                <p class="text-sm font-medium">¿Adivinó?</p>
                <div class="grid grid-cols-2 gap-2">
                    <button hlmBtn [variant]="!predictedCorrectly() ? 'default' : 'outline'" (click)="predictedCorrectly.set(false)">
                        No (+0)
                    </button>
                    <button hlmBtn [variant]="predictedCorrectly() ? 'default' : 'outline'" (click)="predictedCorrectly.set(true)">
                        Sí (+10)
                    </button>
                </div>
            </section>
        </div>

        <div class="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            @if (context.hasValue) {
            <button hlmBtn variant="secondary" (click)="clearScore()">Borrar anotación</button>
            }
            <button hlmBtn (click)="confirmSelection()">{{ totalPoints() }} puntos</button>
        </div>
    `
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
