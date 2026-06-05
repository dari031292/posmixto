import { Injectable, computed, inject, signal } from '@angular/core';
import { nanoid } from 'nanoid';
import { GameSessionService } from '../../../core/services/game-session.service';
import { Player } from '../../../core/models/player.types';
import { BazasGameState, BazasPlayerScores, BazasRoundDefinition, BazasScoreEntry } from '../models/bazas.types';
import { BazasScoringService } from './bazas-scoring.service';

const STORAGE_KEY = 'PWA_BAZAS_STATE';

interface BazasStorageData {
    state: BazasGameState | null;
    players: Player[];
}

@Injectable({
    providedIn: 'root'
})
export class BazasStateService {
    private sessionService = inject(GameSessionService);
    private scoringService = inject(BazasScoringService);

    private state = signal<BazasGameState | null>(null);
    private playersRef = signal<Player[]>([]);

    gameState = this.state.asReadonly();
    activePlayers = this.playersRef.asReadonly();
    isGameActive = computed(() => this.state() !== null);

    constructor() {
        this.loadSavedGame();
    }

    private loadSavedGame() {
        const saved = this.sessionService.loadGame<BazasStorageData>(STORAGE_KEY);
        if (!saved) {
            return;
        }

        this.state.set(saved.state);
        this.playersRef.set(saved.players ?? []);
    }

    private persist() {
        const currentState = this.state();
        const currentPlayers = this.playersRef();

        if (currentState || currentPlayers.length > 0) {
            this.sessionService.saveGame(STORAGE_KEY, { state: currentState, players: currentPlayers });
            return;
        }

        this.sessionService.clearGame(STORAGE_KEY);
    }

    setPlayers(players: Player[]) {
        this.playersRef.set(players);
        this.persist();
    }

    startGame(players: Player[] = this.playersRef()) {
        const scores: Record<string, BazasPlayerScores> = {};
        players.forEach(player => {
            scores[player.id] = {};
        });

        this.playersRef.set(players);
        this.state.set({
            id: nanoid(),
            createdAt: Date.now(),
            players: players.map(player => player.id),
            scores,
            isFinished: false
        });
        this.persist();
    }

    resetGame() {
        this.state.set(null);
        this.persist();
    }

    setRoundScore(playerId: string, round: BazasRoundDefinition, entry: BazasScoreEntry | null) {
        this.state.update(current => {
            if (!current) {
                return current;
            }

            const nextPlayerScores: BazasPlayerScores = {
                ...current.scores[playerId]
            };

            if (entry === null) {
                delete nextPlayerScores[round.id];
            } else {
                nextPlayerScores[round.id] = entry;
            }

            const nextScores = {
                ...current.scores,
                [playerId]: nextPlayerScores
            };

            return {
                ...current,
                scores: nextScores,
                isFinished: this.scoringService.isScoreboardComplete(nextScores, current.players)
            };
        });

        this.persist();
    }
}
