package com.example.Backend.service;

import com.example.Backend.entity.Comment;
import com.example.Backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Page<Comment> getAllComments(int page, int size, String sortBy) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by(sortBy)));
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public Comment updateComment(Long id, Comment updated) {
        return commentRepository.findById(id).map(comment -> {
            comment.setMessage(updated.getMessage());
            comment.setTimestamp(updated.getTimestamp());
            return commentRepository.save(comment);
        }).orElseThrow(() -> new RuntimeException("Comment not found"));
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
