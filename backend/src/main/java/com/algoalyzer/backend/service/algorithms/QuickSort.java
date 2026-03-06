package com.algoalyzer.backend.service.algorithms;

import org.springframework.stereotype.Service;

import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.service.SortingService;

@Service("Quick Sort")
public class QuickSort implements SortingService {

    @Override
    public SortResultDTO sort(int[] array, String mode) {
        long[] metrics = new long[2]; // metrics[0] = comparisons, metrics[1] = interchanges
        long startTime = System.nanoTime();
        
        quickSort(array, 0, array.length - 1, metrics);
        
        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;
        return new SortResultDTO("Quick Sort", array.length, mode, 1, timeMs, timeMs, timeMs, metrics[0], metrics[1]);
    }

    private void quickSort(int[] arr, int low, int high, long[] metrics) {
        if (low < high) {
            int pi = partition(arr, low, high, metrics);
            quickSort(arr, low, pi - 1, metrics);
            quickSort(arr, pi + 1, high, metrics);
        }
    }

    private int partition(int[] arr, int low, int high, long[] metrics) {
        int pivot = arr[high];
        int i = (low - 1);
        
        for (int j = low; j < high; j++) {
            metrics[0]++; // Comparison
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
                metrics[1]++; // Interchange
            }
        }
        int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
        metrics[1]++; // Interchange
        return i + 1;
    }
}