package com.algoalyzer.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.algoalyzer.backend.dto.SortRequestDTO;
import com.algoalyzer.backend.dto.SortResultDTO;
import com.algoalyzer.backend.service.ComparisonService;

@RestController
@RequestMapping("/api/v1/sort")
@CrossOrigin(origins = "http://localhost:4200")
public class AlgorithmController {

    @Autowired
    private ComparisonService comparisonService;

    @PostMapping("/compare")
    public List<SortResultDTO> runComparison(@RequestBody SortRequestDTO request) {
        return comparisonService.runComparisons(request);
    }
}