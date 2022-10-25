export function init(local: boolean) {
  let qs = window.location.search;

  if (!/\?/g.test(qs)) qs += '?noQueue=true';
  else qs += '&noQueue=true';

  const src = `${local ? 'http://localhost:3000' : 'https://cooperrunyan-snake.netlify.app'}${qs}`;
  document.querySelector('#snake-frame')?.setAttribute('src', src);
}
