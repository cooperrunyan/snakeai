export function init(local: boolean) {
  const src = `${local ? 'http://localhost:3000' : 'https://cooperrunyan-snake.netlify.app'}${window.location.search}`;
  document.querySelector('#snake-frame')?.setAttribute('src', src);
}
