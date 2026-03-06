package com.algoalyzer.backend.util;

import java.util.Random;

public class ArrayGenerator {

    /**
     * Generates an array of integers based on the specified size and mode.
     *
     * @param size The number of elements in the array (up to 10,000 per assignment specs).
     * @param mode The distribution mode ("Random", "Sorted", or "Inversely Sorted").
     * @return The generated integer array.
     */
    public static int[] generate(int size, String mode) {
        int[] array = new int[size];
        Random random = new Random();

        for (int i = 0; i < size; i++) {
            if ("Sorted".equalsIgnoreCase(mode)) {
                // Generates strictly increasing numbers: 1, 2, 3, ...
                array[i] = i + 1;
            } else if ("Inversely Sorted".equalsIgnoreCase(mode)) {
                // Generates strictly decreasing numbers: size, size-1, ...
                array[i] = size - i;
            } else {
                // "Random" mode (Default)
                // We multiply by 10 to give a wide spread of values and reduce duplicates,
                // which makes the sorting metrics more accurate and realistic.
                array[i] = random.nextInt(size * 10) + 1;
            }
        }

        return array;
    }
}