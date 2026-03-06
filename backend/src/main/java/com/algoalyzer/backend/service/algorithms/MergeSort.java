package com.algoalyzer.backend.service.algorithms;

import org.springframework.stereotype.Service;

import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.service.SortingService;

@Service("Merge Sort")
public class MergeSort implements SortingService {

    @Override
    public SortResultDTO sort(int[] array, String mode) {
        long[] metrics = new long[2]; // metrics[0] = comparisons, metrics[1] = interchanges
        long startTime = System.nanoTime();
        
        mergeSort(array, 0, array.length - 1, metrics);
        
        long endTime = System.nanoTime();
        double timeMs = (endTime - startTime) / 1_000_000.0;
        return new SortResultDTO("Merge Sort", array.length, mode, 1, timeMs, timeMs, timeMs, metrics[0], metrics[1]);
    }

    private void mergeSort(int[] arr, int l, int r, long[] metrics) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m, metrics);
            mergeSort(arr, m + 1, r, metrics);
            merge(arr, l, m, r, metrics);
        }
    }

    private void merge(int[] arr, int l, int m, int r, long[] metrics) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        
        System.arraycopy(arr, l, L, 0, n1);
        System.arraycopy(arr, m + 1, R, 0, n2);

        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            metrics[0]++; // Comparison
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
                metrics[1]++; // Interchange
            }
            k++;
        }
        while (i < n1) { arr[k] = L[i]; i++; k++; }
        while (j < n2) { arr[k] = R[j]; j++; k++; }
    }
}