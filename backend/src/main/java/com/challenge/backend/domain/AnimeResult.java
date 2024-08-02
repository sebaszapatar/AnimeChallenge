package com.challenge.backend.domain;

import lombok.Data;

@Data
public class AnimeResult {
    private String title;
    private double score;
    private Images images;
}
