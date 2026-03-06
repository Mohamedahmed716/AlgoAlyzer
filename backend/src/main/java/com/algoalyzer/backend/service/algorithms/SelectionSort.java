package com.algoalyzer.backend.service.algorithms;

import org.springframework.stereotype.Service;

import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.service.SortingService;

@Service("Selection Sort")
public class SelectionSort implements SortingService {
    @Override
    public SortResultDTO sort(int[] array, String mode) {
        long comparisons = 0, interchanges = 0;
        long startTime = System.nanoTime();
        int n = array.length;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                comparisons++;
                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx != i) {
                int temp = array[minIdx];
                array[minIdx] = array[i];
                array[i] = temp;
                interchanges++;
            }
        }

        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;
        return new SortResultDTO("Selection Sort", n, mode, 1, timeMs, timeMs, timeMs, comparisons, interchanges);
    }
}