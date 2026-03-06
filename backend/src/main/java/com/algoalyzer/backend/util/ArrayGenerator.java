package com.algoalyzer.backend.util;

import java.util.Random;

public class ArrayGenerator {

    public static int[] generate(int size, String mode) {
        int[] array = new int[size];
        Random random = new Random();

        for (int i = 0; i < size; i++) {
            if ("Sorted".equalsIgnoreCase(mode)) {
                array[i] = i + 1;
            } else if ("Inversely Sorted".equalsIgnoreCase(mode)) {
                array[i] = size - i;
            } else {
                array[i] = random.nextInt(size * 10) + 1;
            }
        }

        return array;
    }
}