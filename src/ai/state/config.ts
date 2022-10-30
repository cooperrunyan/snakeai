export interface Config {
  unitSize: number;

  width: number;
  widthUnit: number;
  widthUnitAmt: number;

  height: number;
  heightUnit: number;
  heightUnitAmt: number;
}

export const config: Config = {} as any;

config.unitSize = Number(new URL(window.location.href).searchParams.get('unitSize')) || 20;

const setProps = () => {
  config.width = document.documentElement.clientWidth;
  config.widthUnitAmt = Math.round(config.width / config.unitSize);
  config.widthUnit = config.width / config.widthUnitAmt;

  config.height = document.documentElement.clientHeight;
  config.heightUnitAmt = Math.round(config.height / config.unitSize);
  config.heightUnit = config.height / config.heightUnitAmt;
};

setProps();
window.addEventListener('resize', setProps);
