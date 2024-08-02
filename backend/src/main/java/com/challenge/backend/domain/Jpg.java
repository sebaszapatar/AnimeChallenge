package com.challenge.backend.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Jpg {
    @JsonProperty("image_url")
    private String imageUrl;
}
