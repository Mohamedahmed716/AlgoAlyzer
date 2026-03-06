package com.algoalyzer.backend.service.algorithms;

import org.springframework.stereotype.Service;

import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.service.SortingService;

@Service("Insertion Sort")
public class InsertionSort implements SortingService {
    @Override
    public SortResultDTO sort(int[] array, String mode) {
        long comparisons = 0, interchanges = 0;
        long startTime = System.nanoTime();
        int n = array.length;

        for (int i = 1; i < n; ++i) {
            int key = array[i];
            int j = i - 1;
            
            comparisons++;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
                interchanges++;
                if (j >= 0) comparisons++; // Count comparison for the next loop condition check
            }
            array[j + 1] = key;
        }

        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;
        return new SortResultDTO("Insertion Sort", n, mode, 1, timeMs, timeMs, timeMs, comparisons, interchanges);
    }
}