package com.algoalyzer.backend.service;

import com.algoalyzer.backend.dto.SortResultDTO;

public interface SortingService {
    SortResultDTO sort(int[] array, String mode);
}