package com.example.Backend.service;

import com.example.Backend.entity.Media;
import com.example.Backend.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    public Media createMedia(Media media) {
        return mediaRepository.save(media);
    }

    public Page<Media> getAllMedia(int page, int size, String sortBy) {
        return mediaRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public Optional<Media> getMediaById(Long id) {
        return mediaRepository.findById(id);
    }

    public Media updateMedia(Long id, Media updated) {
        return mediaRepository.findById(id).map(media -> {
            media.setUrl(updated.getUrl());
            media.setType(updated.getType());
            return mediaRepository.save(media);
        }).orElseThrow(() -> new RuntimeException("Media not found"));
    }

    public void deleteMedia(Long id) {
        mediaRepository.deleteById(id);
    }
}
