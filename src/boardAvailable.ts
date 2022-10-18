import { buildGrid } from './buildGrid';
import { findNeighbors } from './findNeighbors';
import { Cell } from './types/Cell';
import { Segment } from './types/Segment';

export function boardAvailable(snake: (Segment | Cell)[]) {
  const grid = buildGrid(snake);
  const head = snake.at(-1)!;

  // "x y"[]
  const accessibleNodeCoordinates: Set<string> = new Set();

  const addNeighbors = (current: Segment | Cell) => {
    for (const neighbor of findNeighbors(current, grid)) {
      if (neighbor.wall) continue;

      if (accessibleNodeCoordinates.has(`${neighbor.x} ${neighbor.y}`)) continue;
      accessibleNodeCoordinates.add(`${neighbor.x} ${neighbor.y}`);

      addNeighbors(neighbor);
    }
  };

  addNeighbors(head);

  return {
    amtOfOpenNodes: grid.flatMap(row => row.filter(node => !node.wall)).length,
    amtOfTotalNodes: grid.flat().length,
    amtOfAccessibleNodes: accessibleNodeCoordinates.size,
    amtOfBoardAvailable: accessibleNodeCoordinates.size / grid.flatMap(row => row.filter(node => !node.wall)).length,
  };
}
