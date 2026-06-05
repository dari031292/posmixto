import { BazasRoundDefinition } from './bazas.types';

const ROUND_PATTERN = [1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1] as const;

export const BAZAS_ROUNDS: BazasRoundDefinition[] = ROUND_PATTERN.map((trickCount, index) => ({
    id: index,
    order: index + 1,
    trickCount
}));

export function getRoundTitle(round: BazasRoundDefinition): string {
    return `${round.trickCount}`;
}
