import { buildGrid } from './buildGrid';
import { config } from './state/config';
import { Cell } from './types/Cell';
import { Segment } from './types/Segment';

export function boardAvailable(snake: (Segment | Cell)[]) {
  const grid = buildGrid(snake);
  const head = snake.at(-1)!;

  // "x y"[]
  const accessibleNodeCoordinates: Set<string> = new Set();

  const addNeighbors = (node: Segment | Cell) => {
    const neighbors = [];

    if (node.x - 1 >= 0 && !grid.at(node.x - 1)?.at(node.y)?.wall) neighbors.push(grid.at(node.x - 1)?.at(node.y)!);
    if (node.x + 1 < config.widthUnitAmt && !grid.at(node.x + 1)?.at(node.y)?.wall) neighbors.push(grid.at(node.x + 1)?.at(node.y)!);
    if (node.y - 1 >= 0 && !grid.at(node.x)?.at(node.y - 1)?.wall) neighbors.push(grid.at(node.x)?.at(node.y - 1)!);
    if (node.y + 1 < config.heightUnitAmt && !grid.at(node.x)?.at(node.y + 1)?.wall) neighbors.push(grid.at(node.x)?.at(node.y + 1)!);

    for (const neighbor of neighbors) {
      if (accessibleNodeCoordinates.has(`${neighbor.x} ${neighbor.y}`)) continue;
      accessibleNodeCoordinates.add(`${neighbor.x} ${neighbor.y}`);
      addNeighbors(neighbor);
    }
  };

  addNeighbors(head);

  return accessibleNodeCoordinates.size / grid.flatMap(row => row.filter(node => !node.wall)).length;
}
