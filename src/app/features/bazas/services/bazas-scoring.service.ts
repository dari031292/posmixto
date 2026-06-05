import { Injectable } from '@angular/core';
import { BAZAS_ROUNDS } from '../models/bazas.domain';
import { BazasPlayerScores, BazasRoundDefinition, BazasScoreEntry } from '../models/bazas.types';

@Injectable({
    providedIn: 'root'
})
export class BazasScoringService {
    readonly rounds = BAZAS_ROUNDS;

    calculatePoints(tricksWon: number, predictedCorrectly: boolean): number {
        return (tricksWon * 2) + (predictedCorrectly ? 10 : 0);
    }

    buildEntry(round: BazasRoundDefinition, tricksWon: number, predictedCorrectly: boolean): BazasScoreEntry {
        if (!this.isValidTrickCount(round, tricksWon)) {
            throw new Error(`Invalid tricks count ${tricksWon} for round ${round.order}`);
        }

        return {
            tricksWon,
            predictedCorrectly,
            points: this.calculatePoints(tricksWon, predictedCorrectly)
        };
    }

    isValidTrickCount(round: BazasRoundDefinition, tricksWon: number): boolean {
        return Number.isInteger(tricksWon) && tricksWon >= 0 && tricksWon <= round.trickCount;
    }

    getTrickOptions(round: BazasRoundDefinition): number[] {
        return Array.from({ length: round.trickCount + 1 }, (_, index) => index);
    }

    getPointOptions(round: BazasRoundDefinition): number[] {
        return this.getTrickOptions(round).flatMap(tricksWon => {
            const basePoints = this.calculatePoints(tricksWon, false);
            return [basePoints, basePoints + 10];
        }).sort((left, right) => left - right);
    }

    calculatePlayerTotal(scores: BazasPlayerScores): number {
        return Object.values(scores).reduce((total, entry) => total + (entry?.points ?? 0), 0);
    }

    isScoreboardComplete(allScores: Record<string, BazasPlayerScores>, playerIds: string[]): boolean {
        if (playerIds.length === 0) {
            return false;
        }

        return playerIds.every(playerId => this.rounds.every(round => !!allScores[playerId]?.[round.id]));
    }
}
