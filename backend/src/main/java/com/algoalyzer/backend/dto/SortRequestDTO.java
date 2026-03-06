package com.algoalyzer.backend.dto;

import java.util.List;

public class SortRequestDTO {
    private List<String> generationModes; 
    private List<Integer> arraySizes;     
    private List<String> algorithms;      

    public List<String> getGenerationModes() {
        return generationModes;
    }

    public void setGenerationModes(List<String> generationModes) {
        this.generationModes = generationModes;
    }

    public List<Integer> getArraySizes() {
        return arraySizes;
    }

    public void setArraySizes(List<Integer> arraySizes) {
        this.arraySizes = arraySizes;
    }

    public List<String> getAlgorithms() {
        return algorithms;
    }

    public void setAlgorithms(List<String> algorithms) {
        this.algorithms = algorithms;
    }
}