package com.example.Backend.controller;

import com.example.Backend.entity.Media;
import com.example.Backend.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/media")
@CrossOrigin
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping
    public Media create(@RequestBody Media media) {
        return mediaService.createMedia(media);
    }

    @GetMapping
    public Page<Media> getAll(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(defaultValue = "id") String sortBy) {
        return mediaService.getAllMedia(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public Media getById(@PathVariable Long id) {
        return mediaService.getMediaById(id)
                .orElseThrow(() -> new RuntimeException("Media not found"));
    }

    @PutMapping("/{id}")
    public Media update(@PathVariable Long id, @RequestBody Media media) {
        return mediaService.updateMedia(id, media);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        mediaService.deleteMedia(id);
    }
}
