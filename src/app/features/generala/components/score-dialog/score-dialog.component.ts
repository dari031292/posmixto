import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectBrnDialogCtx } from '@spartan-ng/brain/dialog';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmButton } from '@spartan-ng/helm/button';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';

export interface ScoreDialogData {
  title: string;
  hasValue: boolean;
  options: { points: number, type: any, label: string }[];
}

export type ScoreDialogResult = { action: 'select', option: any } | { action: 'clear' } | null;

@Component({
  selector: 'app-score-dialog',
  standalone: true,
  imports: [CommonModule, HlmDialogImports, HlmButton],
  templateUrl: './score-dialog.component.html'
})
export class ScoreDialogComponent {
  context = injectBrnDialogCtx<ScoreDialogData>();
  private dialogRef = inject(BrnDialogRef);

  selectOption(option: any) {
    this.dialogRef.close({ action: 'select', option });
  }

  clearScore() {
    this.dialogRef.close({ action: 'clear' });
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
