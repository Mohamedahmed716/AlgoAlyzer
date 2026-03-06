package com.algoalyzer.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.algoalyzer.backend.dto.SortRequestDTO;
import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.util.ArrayGenerator;

@Service
public class ComparisonService {

    // Spring Boot automatically injects all implementations of SortingService into this map.
    @Autowired
    private Map<String, SortingService> algorithms;

    public List<SortResultDTO> runComparisons(SortRequestDTO request) {
        // === SANITY CHECK: This will print in your terminal if the new code is actually running ===
        System.out.println("============== NEW CODE IS RUNNING! RUNS = 10 ==============");
        
        List<SortResultDTO> results = new ArrayList<>();
        
        // Force the algorithms to run 10 times to get actual Minimum and Maximum variations
        int RUNS = 10; 

        for (int size : request.getArraySizes()) {
            for (String mode : request.getGenerationModes()) {
                
                // Generate the base array ONCE for this specific size and mode combination
                int[] baseArray = ArrayGenerator.generate(size, mode);

                for (String algoName : request.getAlgorithms()) {
                    SortingService algo = algorithms.get(algoName);
                    
                    if (algo != null) {
                        double minRuntime = Double.MAX_VALUE;
                        double maxRuntime = Double.MIN_VALUE;
                        double totalRuntime = 0.0;
                        SortResultDTO finalResult = null;

                        // Loop 10 times to gather real statistical data
                        for (int i = 0; i < RUNS; i++) {
                            // Clone the array so every run gets an identical, unsorted starting point
                            int[] arrayToSort = baseArray.clone();
                            
                            // Run the algorithm
                            SortResultDTO currentResult = algo.sort(arrayToSort, mode);
                            
                            // Extract the exact time it took for THIS specific run
                            double time = currentResult.getAvgRuntime();
                            
                            // Track the fastest (min), slowest (max), and total
                            if (time < minRuntime) minRuntime = time;
                            if (time > maxRuntime) maxRuntime = time;
                            totalRuntime += time;
                            
                            // Keep the last result to safely reuse its name, comparisons, and interchanges
                            if (i == RUNS - 1) {
                                finalResult = currentResult;
                            }
                        }

                        // Now that we have ran it 10 times, overwrite the DTO with the REAL stats
                        if (finalResult != null) {
                            finalResult.setRuns(RUNS);
                            finalResult.setAvgRuntime(totalRuntime / RUNS);
                            finalResult.setMinRuntime(minRuntime);
                            finalResult.setMaxRuntime(maxRuntime);
                            results.add(finalResult);
                        }
                    }
                }
            }
        }
        return results;
    }
}