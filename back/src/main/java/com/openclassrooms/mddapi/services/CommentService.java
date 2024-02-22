package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.repository.CommentRepository;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.models.Comment;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
