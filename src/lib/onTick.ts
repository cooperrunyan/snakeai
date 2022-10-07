import { Apple } from '../types/Apple';
import { Direction } from '../types/Direction';
import { Segment } from '../types/Segment';

export function onTick(callback: (snake: Segment[], apple: Apple, direction: Direction) => void) {
  window.addEventListener(
    'message',
    e => {
      if (e.data.type === 'tick') callback(e.data.snake, e.data.apple, e.data.direction);
    },
    false,
  );
}
