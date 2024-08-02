package com.challenge.backend.application;

import com.challenge.backend.domain.Anime;
import com.challenge.backend.infrastructure.AnimeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimeService {
    private final AnimeRepository animeRepository;

    public List<Anime> searchAnime(String title){
        return animeRepository.findByTitleContaining(title);
    }
}
