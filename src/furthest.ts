import { buildGrid } from './buildGrid';
import { config } from './state/config';
import { Apple } from './types/Apple';
import { Direction } from './types/Direction';
import { Segment } from './types/Segment';

type Cell = {
  f: number;
  g: number;
  h: number;
  x: number;
  y: number;
  parent?: Cell;
  wall: boolean;
};

export function furthest(snake: Segment[], apple: Apple, direction: Direction) {
  try {
    const grid = buildGrid(snake);

    let path: Cell[] = [];

    const openSet: Cell[] = [
      {
        f: 0,
        g: 0,
        h: 0,
        x: snake.at(-1)!.x,
        y: snake.at(-1)!.y,
        wall: false,
      },
    ];

    const closedSet: Cell[] = [];

    while (openSet.length !== 0) {
      const current = openSet
        .slice()
        .sort((a, b) => a.f - b.f)
        .at(-1)!;
      if (current.x === apple.x && current.y === apple.y) {
        path = [];

        let temp = current;
        path.push(temp);

        while (temp.parent) {
          path.push(temp.parent);
          temp = temp.parent;
        }

        return path;
      }

      const currentIndex = openSet.indexOf(current);
      if (currentIndex === -1) break;
      openSet.splice(currentIndex, 1);

      closedSet.push(current);

      // neighbors
      const neighbors: Cell[] = [];

      if (grid.at(current.x - 1)?.at(current.y) && current.x - 1 >= 0) neighbors.push(grid.at(current.x - 1)?.at(current.y)!);
      if (grid.at(current.x + 1)?.at(current.y) && current.x + 1 < config.widthUnitAmt) neighbors.push(grid.at(current.x + 1)?.at(current.y)!);
      if (grid.at(current.x)?.at(current.y - 1) && current.y - 1 >= 0) neighbors.push(grid.at(current.x)?.at(current.y - 1)!);
      if (grid.at(current.x)?.at(current.y + 1) && current.y + 1 < config.heightUnitAmt) neighbors.push(grid.at(current.x)?.at(current.y + 1)!);

      for (const neighbor of neighbors) {
        if (closedSet.includes(neighbor) || neighbor.wall) continue;
        if (direction === Direction.Up && neighbor.y - 1 === current.y) continue;
        if (direction === Direction.Down && neighbor.y + 1 === current.y) continue;
        if (direction === Direction.Left && neighbor.x - 1 === current.x) continue;
        if (direction === Direction.Right && neighbor.x + 1 === current.x) continue;

        const tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) neighbor.g = tempG;
        } else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, apple);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = current;
      }
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function heuristic(neighbor: Cell, apple: Apple): number {
  // euclidian
  return Math.sqrt(Math.pow(apple.y - neighbor.y, 2) + Math.pow(apple.x - neighbor.x, 2));

  // manhattan
  // return Math.abs(apple.y - neighbor.y) + Math.abs(apple.x - neighbor.x);
}