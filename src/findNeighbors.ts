import { buildGrid } from './buildGrid';
import { config } from './state/config';
import { Cell } from './types/Cell';
import { Segment } from './types/Segment';

export function findNeighbors(node: Cell | Segment, grid: ReturnType<typeof buildGrid>) {
  // neighbors
  const neighbors: Cell[] = [];

  if (grid.at(node.x - 1)?.at(node.y) && node.x - 1 >= 0) neighbors.push(grid.at(node.x - 1)?.at(node.y)!);
  if (grid.at(node.x + 1)?.at(node.y) && node.x + 1 < config.widthUnitAmt) neighbors.push(grid.at(node.x + 1)?.at(node.y)!);
  if (grid.at(node.x)?.at(node.y - 1) && node.y - 1 >= 0) neighbors.push(grid.at(node.x)?.at(node.y - 1)!);
  if (grid.at(node.x)?.at(node.y + 1) && node.y + 1 < config.heightUnitAmt) neighbors.push(grid.at(node.x)?.at(node.y + 1)!);

  return neighbors;
}
