import { buildGrid } from './buildGrid';
import { config } from './state/config';
import { Cell } from './types/Cell';
import { Segment } from './types/Segment';

export function findNeighbors(node: Segment, grid: ReturnType<typeof buildGrid>) {
  // neighbors
  const neighbors: Cell[] = [];

  if (grid.at(node[1] - 1)?.at(node[2]) && node[1] - 1 >= 0) neighbors.push(grid.at(node[1] - 1)?.at(node[2])!);
  if (grid.at(node[1] + 1)?.at(node[2]) && node[1] + 1 < config.widthUnitAmt) neighbors.push(grid.at(node[1] + 1)?.at(node[2])!);
  if (grid.at(node[1])?.at(node[2] - 1) && node[2] - 1 >= 0) neighbors.push(grid.at(node[1])?.at(node[2] - 1)!);
  if (grid.at(node[1])?.at(node[2] + 1) && node[2] + 1 < config.heightUnitAmt) neighbors.push(grid.at(node[1])?.at(node[2] + 1)!);

  return neighbors;
}
