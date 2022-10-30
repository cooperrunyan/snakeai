import { config } from '../state/config';
import { pause } from '../state/pause';
import { wait } from './lib/wait';
import { render } from './render';

export async function clock(el: HTMLElement, fn: () => Promise<void> | void): Promise<void> {
  if (!pause.value) await fn();
  render(el);
  await wait(config.value.tickRate);

  return clock(el, fn);
}
