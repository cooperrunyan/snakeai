import { findRoute } from './findRoute';
import { move } from './lib/move';
import { onTick } from './lib/onTick';
import { config } from './state/config';
import { Direction } from './types/Direction';

onTick((snake, apple) => {
  const head = snake.at(-1)!;

  // get closer to the apple
  const route = findRoute(snake.slice(), apple, true);

  if (!route) return;

  const nextHead = route.at(-2)!;

  if (nextHead.x > head.x) {
    if (head.x + 1 < config.widthUnitAmt) move(Direction.Right);
  } else if (nextHead.x < head.x) {
    if (head.x - 1 >= 0) move(Direction.Left);
  }

  if (nextHead.y > head.y) {
    if (head.y + 1 < config.heightUnitAmt) move(Direction.Down);
  } else if (nextHead.y < head.y) {
    if (head.y - 1 >= 0) move(Direction.Up);
  }
});

export {};
