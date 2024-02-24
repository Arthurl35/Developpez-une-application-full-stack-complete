package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private ModelMapper modelMapper;
    private SecurityUtils securityUtils;
    private PostRepository postRepository;

    public CommentService(CommentRepository commentRepository,
                          ModelMapper modelMapper,
                          SecurityUtils securityUtils,
                          PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.securityUtils = securityUtils;
        this.postRepository = postRepository;
    }

    public Comment addComment(CommentDto commentDto) {
        User currentUser = securityUtils.getCurrentUser();
        Post post = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + commentDto.getPostId()));
        Comment comment = new Comment();
        comment.setDescription(commentDto.getDescription());
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        comment.setUser(currentUser);
        comment.setPost(post);
        return commentRepository.save(comment);
    }
}
