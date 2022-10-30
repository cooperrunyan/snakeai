const INITIAL_PAUSE = false;

export const pause = { value: false };

export const resetPauseState = () => (pause.value = INITIAL_PAUSE);
