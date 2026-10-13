import { inject, Injectable } from '@angular/core';
import { GameSessionService } from '../../../core/services/game-session.service';
import { TRUCO_MAX_SCORE, TRUCO_STORAGE_KEY } from '../models/truco.domain';
import { TrucoScores, TrucoTeam } from '../models/truco.types';

@Injectable({
  providedIn: 'root'
})
export class TrucoService {
  private sessionService = inject(GameSessionService);

  scores: TrucoScores = [0, 0];

  constructor() {
    this.loadSavedGame();
  }

  addPoint(team: TrucoTeam) {
    if (this.scores[team] < TRUCO_MAX_SCORE) {
      this.scores[team]++;
      this.persist();
    }
  }

  removePoint(team: TrucoTeam) {
    if (this.scores[team] > 0) {
      this.scores[team]--;
      this.persist();
    }
  }

  reset() {
    this.scores = [0, 0];
    this.sessionService.clearGame(TRUCO_STORAGE_KEY);
  }

  private loadSavedGame() {
    const saved = this.sessionService.loadGame<TrucoScores>(TRUCO_STORAGE_KEY);
    if (saved) {
      this.scores = saved;
    }
  }

  private persist() {
    this.sessionService.saveGame(TRUCO_STORAGE_KEY, this.scores);
  }
}
