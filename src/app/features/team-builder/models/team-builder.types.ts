export interface PlayerToken {
  id: string;
  name: string;
  initialX: number;
  initialY: number;
  currentY?: number;
  team: 'A' | 'B';
}
