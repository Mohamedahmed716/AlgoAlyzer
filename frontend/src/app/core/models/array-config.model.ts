export type GenerationMode = 'Random' | 'Sorted' | 'Inversely Sorted';

export interface ArrayConfig {
  size: number;
  mode: GenerationMode;
  data?: number[];
  sourceFile?: File | null;
}
