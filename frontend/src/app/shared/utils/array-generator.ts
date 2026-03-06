import { GenerationMode } from '../../core/models/array-config.model';

export class ArrayGenerator {
  /**
   * Generates an array of integers based on size and mode.
   * Values range from 5 to 105 to ensure visual bars have a minimum height.
   */
  static generate(size: number, mode: GenerationMode): number[] {
    const arr: number[] = new Array(size);

    for (let i = 0; i < size; i++) {
      if (mode === 'Sorted') {
        arr[i] = Math.floor((i / size) * 100) + 5;
      } else if (mode === 'Inversely Sorted') {
        arr[i] = Math.floor(((size - i) / size) * 100) + 5;
      } else {
        // Random
        arr[i] = Math.floor(Math.random() * 100) + 5;
      }
    }
    return arr;
  }

  /**
   * Parses a comma-separated string from a .txt file into an array of numbers.
   */
  static parseFileContent(content: string): number[] {
    return content
      .split(',')
      .map(str => str.trim())
      .filter(str => str.length > 0 && !isNaN(Number(str)))
      .map(str => Number(str));
  }
}
