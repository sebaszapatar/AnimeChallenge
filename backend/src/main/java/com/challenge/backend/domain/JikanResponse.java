package com.challenge.backend.domain;

import lombok.Data;

import java.util.List;

@Data
public class JikanResponse {
    private List<AnimeResult> data;
}
