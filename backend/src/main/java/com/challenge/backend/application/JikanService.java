package com.challenge.backend.application;

import com.challenge.backend.domain.Anime;
import com.challenge.backend.domain.AnimeResult;
import com.challenge.backend.domain.JikanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JikanService {
    private final RestTemplate restTemplate;

    @Value("${jikan.api.url}")
    private String jikanApiUrl;

    public List<Anime> searchAnimeByTitle(String title){
        String url = jikanApiUrl + title;
        ResponseEntity<JikanResponse> response = restTemplate.getForEntity(url, JikanResponse.class);
        JikanResponse body = response.getBody();
        if (body == null || body.getData() == null) {
            return Collections.emptyList();
        }
        return body.getData().stream()
                .map(this::mapToDomainAnime)
                .collect(Collectors.toList());
    }

    private Anime mapToDomainAnime(AnimeResult animeResult) {
        Anime anime = new Anime();
        anime.setTitle(animeResult.getTitle());
        anime.setScore(Math.round(animeResult.getScore()));
        anime.setRecommendationMessage(getRecommendationMessage(animeResult.getScore()));
        anime.setImageUrl(animeResult.getImages().getJpg().getImageUrl());

        return anime;
    }

    private String getRecommendationMessage(double score) {
        if(score > 7){
            return "Great, this is one of the best anime.";
        } else if (score >= 5) {
            return "You may have fun.";
        } else {
            return "i do not recommend it.";
        }
    }

    public double  calculateAverageScore(List<Anime> animes){
        double sum = animes.stream().mapToDouble(Anime::getScore).sum();
        double average = sum / animes.size();
        return (int) Math.round(average);
    }
}