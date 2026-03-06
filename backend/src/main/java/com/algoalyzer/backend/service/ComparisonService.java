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

    @Autowired
    private Map<String, SortingService> algorithms;

    public List<SortResultDTO> runComparisons(SortRequestDTO request) {
        List<SortResultDTO> results = new ArrayList<>();
        int RUNS = 10; 

        for (int size : request.getArraySizes()) {
            for (String mode : request.getGenerationModes()) {
                
                int[] baseArray = ArrayGenerator.generate(size, mode);

                for (String algoName : request.getAlgorithms()) {
                    SortingService algo = algorithms.get(algoName);
                    
                    if (algo != null) {
                        double minRuntime = Double.MAX_VALUE;
                        double maxRuntime = Double.MIN_VALUE;
                        double totalRuntime = 0.0;
                        SortResultDTO finalResult = null;

                        for (int i = 0; i < RUNS; i++) {
                            int[] arrayToSort = baseArray.clone();
                            
                            SortResultDTO currentResult = algo.sort(arrayToSort, mode);
                            double time = currentResult.getAvgRuntime();
                            
                            if (time < minRuntime) minRuntime = time;
                            if (time > maxRuntime) maxRuntime = time;
                            totalRuntime += time;
                            
                            if (i == RUNS - 1) {
                                finalResult = currentResult;
                            }
                        }

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