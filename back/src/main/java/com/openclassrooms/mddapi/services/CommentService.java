package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private SecurityUtils securityUtils;
    private PostRepository postRepository;

    public CommentService(CommentRepository commentRepository,
                          SecurityUtils securityUtils,
                          PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.securityUtils = securityUtils;
        this.postRepository = postRepository;
    }

    /**
     * Add a comment to a post
     * @param commentDto
     * @param postId
     * @return Comment
     */
    public Comment addComment(CommentDto commentDto, Long postId) throws ResourceNotFoundException {
        User currentUser = securityUtils.getCurrentUser();

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + commentDto.getPostId()));

        Comment comment = new Comment();
        comment.setDescription(commentDto.getDescription());
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        comment.setUser(currentUser);
        comment.setPost(post);
        return commentRepository.save(comment);
    }
}
