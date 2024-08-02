package com.challenge.backend.ui;

import com.challenge.backend.domain.Anime;
import com.challenge.backend.application.AnimeService;
import com.challenge.backend.application.JikanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/animes")
@RequiredArgsConstructor
public class AnimeController {
    private final JikanService jikanService;
    private final AnimeService animeService;

    @GetMapping("/search")
    public ResponseEntity<List<Anime>> searchAnimes(@RequestParam String title) {
        List<Anime> animes = jikanService.searchAnimeByTitle(title);
        if (animes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(animes);
    }


    @GetMapping("/average-score")
    public ResponseEntity<Double> getAverageScore(@RequestParam String title) {
        List<Anime> animes = jikanService.searchAnimeByTitle(title);
        if (animes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        double averageScore = jikanService.calculateAverageScore(animes);
        return ResponseEntity.ok(averageScore);
    }
}
