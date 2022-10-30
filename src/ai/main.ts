import { boardAvailable } from './boardAvailable';
import { closest } from './closest';

import { init } from './init';
import { move } from './lib/move';
import { onTick } from './lib/onTick';
import { panic } from './panic';
import { config } from './state/config';
import { Direction } from './types/Direction';

init(false);

onTick((snake, apple, direction) => {
  try {
    const head = snake.at(-1)!;

    if (boardAvailable(snake.slice()).percent <= 0.8) return panic(snake, direction);

    const route = closest(snake.slice(), apple, direction);

    if (!route) return panic(snake, direction);

    const nextHead = route.at(-2)!;

    if (nextHead.x > head[1]) {
      if (head[1] + 1 < config.widthUnitAmt) move(Direction.Right);
    } else if (nextHead.x < head[1]) {
      if (head[1] - 1 >= 0) move(Direction.Left);
    }

    if (nextHead.y > head[2]) {
      if (head[2] + 1 < config.heightUnitAmt) move(Direction.Down);
    } else if (nextHead.y < head[2]) {
      if (head[2] - 1 >= 0) move(Direction.Up);
    }
  } catch {}
});

export {};
