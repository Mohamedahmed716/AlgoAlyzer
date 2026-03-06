package com.algoalyzer.backend.dto;

public class SortResultDTO {
    private String algorithmName;
    private int arraySize;
    private String mode;
    private int runs;
    private double avgRuntime;
    private double minRuntime;
    private double maxRuntime;
    
    private long comparisons;
    private long interchanges;

    // Default Constructor (deserialize JSON properly)
    public SortResultDTO() {
    }

    // All-Args Constructor
    public SortResultDTO(String algorithmName, int arraySize, String mode, int runs, 
                         double avgRuntime, double minRuntime, double maxRuntime, 
                         long comparisons, long interchanges) {
        this.algorithmName = algorithmName;
        this.arraySize = arraySize;
        this.mode = mode;
        this.runs = runs;
        this.avgRuntime = avgRuntime;
        this.minRuntime = minRuntime;
        this.maxRuntime = maxRuntime;
        this.comparisons = comparisons;
        this.interchanges = interchanges;
    }


    public String getAlgorithmName() { 
        return algorithmName; 
    }
    
    public void setAlgorithmName(String algorithmName) { 
        this.algorithmName = algorithmName; 
    }

    public int getArraySize() { 
        return arraySize; 
    }
    
    public void setArraySize(int arraySize) { 
        this.arraySize = arraySize; 
    }

    public String getMode() { 
        return mode; 
    }
    
    public void setMode(String mode) { 
        this.mode = mode; 
    }

    public int getRuns() { 
        return runs; 
    }
    
    public void setRuns(int runs) { 
        this.runs = runs; 
    }

    public double getAvgRuntime() { 
        return avgRuntime; 
    }
    
    public void setAvgRuntime(double avgRuntime) { 
        this.avgRuntime = avgRuntime; 
    }

    public double getMinRuntime() { 
        return minRuntime; 
    }
    
    public void setMinRuntime(double minRuntime) { 
        this.minRuntime = minRuntime; 
    }

    public double getMaxRuntime() { 
        return maxRuntime; 
    }
    
    public void setMaxRuntime(double maxRuntime) { 
        this.maxRuntime = maxRuntime; 
    }

    public long getComparisons() { 
        return comparisons; 
    }
    
    public void setComparisons(long comparisons) { 
        this.comparisons = comparisons; 
    }

    public long getInterchanges() { 
        return interchanges; 
    }
    
    public void setInterchanges(long interchanges) { 
        this.interchanges = interchanges; 
    }
}