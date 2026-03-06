package com.algoalyzer.backend.dto;

import java.util.List;

public class VisualizationStepDTO {
    private int[] arrayState;
    private List<Integer> comparingIndices; // Indices currently comparing
    private List<Integer> swappingIndices;  // Indices currently swapping
    private String status;                  // "comparing", "swapping", or "sorted"

    public VisualizationStepDTO() {}

    public VisualizationStepDTO(int[] arrayState, List<Integer> comparingIndices, List<Integer> swappingIndices, String status) {
        this.arrayState = arrayState != null ? arrayState.clone() : null; 
        this.comparingIndices = comparingIndices;
        this.swappingIndices = swappingIndices;
        this.status = status;
    }

    public int[] getArrayState() { return arrayState; }
    public List<Integer> getComparingIndices() { return comparingIndices; }
    public List<Integer> getSwappingIndices() { return swappingIndices; }
    public String getStatus() { return status; }

    public void setArrayState(int[] arrayState) { this.arrayState = arrayState; }
    public void setComparingIndices(List<Integer> comparingIndices) { this.comparingIndices = comparingIndices; }
    public void setSwappingIndices(List<Integer> swappingIndices) { this.swappingIndices = swappingIndices; }
    public void setStatus(String status) { this.status = status; }
}