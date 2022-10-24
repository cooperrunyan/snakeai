import { frame } from '../frame';
import { Direction } from '../types/Direction';

export function move(direction: Direction) {
  frame.contentWindow!.postMessage(direction, '*');
}
