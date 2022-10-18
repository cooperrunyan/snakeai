import { config } from './state/config';
import { Cell } from './types/Cell';
import { Segment } from './types/Segment';

export function buildGrid(snake: (Segment | Cell)[]) {
  const grid: Cell[][] = [];

  const cols = config.widthUnitAmt;
  const rows = config.heightUnitAmt;

  for (let x = 0; x < cols; x++) {
    grid[x] = new Array(rows);
    for (let y = 0; y < rows; y++) {
      grid[x][y] = {
        x,
        y,
        f: 0,
        g: 0,
        h: 0,
        wall: false,
      };
    }
  }

  for (const segment of snake.slice(0, -1)) {
    if (grid.at(segment.x)?.at(segment.y)) grid.at(segment.x)!.at(segment.y)!.wall = true;
  }

  return grid;
}
