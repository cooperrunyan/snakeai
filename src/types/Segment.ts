export type Segment = {
  x: number;
  y: number;
  id: string;
  border: {
    top: boolean;
    left: boolean;
    right: boolean;
    bottom: boolean;
  };
};
