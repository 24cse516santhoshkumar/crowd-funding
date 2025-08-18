package com.example.Backend.controller;

import com.example.Backend.entity.Comment;
import com.example.Backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment create(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @GetMapping
    public Page<Comment> getAll(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size,
                                @RequestParam(defaultValue = "id") String sortBy) {
        return commentService.getAllComments(page, size, sortBy);
    }

    @GetMapping("/{id}")
    public Comment getById(@PathVariable Long id) {
        return commentService.getCommentById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    @PutMapping("/{id}")
    public Comment update(@PathVariable Long id, @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
