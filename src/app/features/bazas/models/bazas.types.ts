export interface BazasScoreEntry {
    tricksWon: number;
    predictedCorrectly: boolean;
    points: number;
}

export type BazasPlayerScores = Record<number, BazasScoreEntry | undefined>;

export interface BazasGameState {
    id: string;
    createdAt: number;
    players: string[];
    scores: Record<string, BazasPlayerScores>;
    isFinished: boolean;
}

export interface BazasRoundDefinition {
    id: number;
    order: number;
    trickCount: number;
}
