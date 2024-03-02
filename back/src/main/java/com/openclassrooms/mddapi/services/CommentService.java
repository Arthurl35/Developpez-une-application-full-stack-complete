package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import com.openclassrooms.mddapi.models.Subscription;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

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

    public Comment addComment(CommentDto commentDto, Long postId) {
        User currentUser = securityUtils.getCurrentUser();
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + commentDto.getPostId()));

        Topic postTopic = post.getTopic();

        List<Topic> subscribedTopics = currentUser.getSubscriptions().stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());

        if (!subscribedTopics.contains(postTopic)) {
            throw new RuntimeException("You are not subscribed to the topic of this post.");
        }

        Comment comment = new Comment();
        comment.setDescription(commentDto.getDescription());
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        comment.setUser(currentUser);
        comment.setPost(post);
        return commentRepository.save(comment);
    }
}
