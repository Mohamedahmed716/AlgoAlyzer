package com.algoalyzer.backend.service.algorithms;

import org.springframework.stereotype.Service;

import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.service.SortingService;

@Service("Heap Sort")
public class HeapSort implements SortingService {

    @Override
    public SortResultDTO sort(int[] array, String mode) {
        long[] metrics = new long[2]; // metrics[0] = comparisons, metrics[1] = interchanges
        long startTime = System.nanoTime();
        int n = array.length;

        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(array, n, i, metrics);
        }
        for (int i = n - 1; i > 0; i--) {
            int temp = array[0]; array[0] = array[i]; array[i] = temp;
            metrics[1]++; // Interchange
            heapify(array, i, 0, metrics);
        }

        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;
        return new SortResultDTO("Heap Sort", array.length, mode, 1, timeMs, timeMs, timeMs, metrics[0], metrics[1]);
    }

    private void heapify(int[] arr, int n, int i, long[] metrics) {
        int largest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;

        metrics[0]++;
        if (l < n && arr[l] > arr[largest]) largest = l;

        metrics[0]++;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest != i) {
            int swap = arr[i]; arr[i] = arr[largest]; arr[largest] = swap;
            metrics[1]++; // Interchange
            heapify(arr, n, largest, metrics);
        }
    }
}