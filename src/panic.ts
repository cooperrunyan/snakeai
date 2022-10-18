import { boardAvailable } from './boardAvailable';
import { buildGrid } from './buildGrid';
import { findNeighbors } from './findNeighbors';
import { move } from './lib/move';
import { config } from './state/config';
import { Direction } from './types/Direction';
import { Segment } from './types/Segment';

export function panic(snake: Segment[], direction: Direction) {
  console.log('panicking');
  const head = snake.at(-1)!;

  const possible = findNeighbors(snake.at(-1)!, buildGrid(snake))
    .map(n => ({
      node: n,
      available: boardAvailable([n, ...snake.slice(1)]).amtOfBoardAvailable,
    }))
    .filter(cell => {
      if (direction === Direction.Up && cell.node.y - 1 === head.y) return false;
      if (direction === Direction.Down && cell.node.y + 1 === head.y) return false;
      if (direction === Direction.Left && cell.node.x - 1 === head.x) return false;
      if (direction === Direction.Right && cell.node.x + 1 === head.x) return false;
      if (cell.node.wall) return false;

      return true;
    })
    .sort((a, b) => a.available - b.available);

  const bestNode = possible[0]!.node;

  if (bestNode.x > head.x) {
    if (head.x + 1 < config.widthUnitAmt) move(Direction.Right);
  } else if (bestNode.x < head.x) {
    if (head.x - 1 >= 0) move(Direction.Left);
  }

  if (bestNode.y > head.y) {
    if (head.y + 1 < config.heightUnitAmt) move(Direction.Down);
  } else if (bestNode.y < head.y) {
    if (head.y - 1 >= 0) move(Direction.Up);
  }
}
