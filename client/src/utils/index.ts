import { IRangeParams } from '../type/Interfaces';

// @ts-ignore
export const range: number[] = (n: number, init = 0): IRangeParams => [...(Array(n).keys())].map((_, i) => i + init);
