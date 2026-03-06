export type GenerationMode = 'Random' | 'Sorted' | 'Inversely Sorted';

export interface ArrayConfig {
  /** The number of elements in the array */
  size: number;

  /** How the data is distributed initially */
  mode: GenerationMode;

  /** The actual raw integer data (useful if generated on the client side for visualization) */
  data?: number[];

  /** * Optional file reference if the user uploaded a custom .txt file
   * instead of using the generator
   */
  sourceFile?: File | null;
}
