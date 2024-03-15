package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PostCreateDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.PostGetDto;
import com.openclassrooms.mddapi.exception.ResourceNotFoundException;
import com.openclassrooms.mddapi.models.*;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    private PostRepository postRepository;
    private SecurityUtils securityUtils;
    private TopicRepository topicRepository;
    @Autowired
    public PostService(PostRepository postRepository,
                       SecurityUtils securityUtils,
                       TopicRepository topicRepository) {
        this.postRepository = postRepository;
        this.securityUtils = securityUtils;
        this.topicRepository = topicRepository;
    }

    /**
     * Add a new post
     * @param postCreateDto
     * @return the new post
     */
    public Post addPost(PostCreateDto postCreateDto) {
        User currentUser = securityUtils.getCurrentUser();

        Topic topic = topicRepository.findById(postCreateDto.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found with id: " + postCreateDto.getTopicId()));

        Post post = new Post();
        post.setTitle(postCreateDto.getTitle());
        post.setDescription(postCreateDto.getDescription());
        post.setUser(currentUser);
        post.setTopic(topic);
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return postRepository.save(post);
    }

    /**
     * Get all posts
     * @return the list of posts subscribed by the current user
     */
    public List<PostDto> getAllPosts() {
        List<Topic> subscribedTopics = getTopics();
        List<Post> posts = postRepository.findByTopicIn(subscribedTopics);
        return posts.stream()
                .map(post -> {
                    PostDto postDto = new PostDto();
                    postDto.setId(post.getId());
                    postDto.setTitle(post.getTitle());
                    postDto.setDescription(post.getDescription());
                    postDto.setCreatedAt(post.getCreatedAt());
                    postDto.setAuthorEmail(post.getUser().getEmail());
                    postDto.setTopicId(post.getTopic().getId());
                    return postDto;
                })
                .collect(Collectors.toList());
    }

    /**
     * Get details of a post and its comments
     * @return the post details
     */
    public PostGetDto getPostById(Long postId) throws ResourceNotFoundException {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        PostGetDto postGetDto = new PostGetDto();
        postGetDto.setId(post.getId());
        postGetDto.setTitle(post.getTitle());
        postGetDto.setDescription(post.getDescription());
        postGetDto.setCreatedAt(post.getCreatedAt());
        postGetDto.setAuthorEmail(post.getUser().getEmail());
        postGetDto.setTopicId(post.getTopic().getId());
        postGetDto.setTopicTitle(post.getTopic().getTitle());

        List<CommentDto> commentDtoList = post.getComments().stream()
                .map(comment -> {
                    CommentDto commentItemDto = new CommentDto();
                    commentItemDto.setId(comment.getId());
                    commentItemDto.setDescription(comment.getDescription());
                    commentItemDto.setCreatedAt(comment.getCreatedAt());
                    commentItemDto.setAuthorEmail(comment.getUser().getEmail());
                    commentItemDto.setPostId(comment.getPost().getId());
                    return commentItemDto;
                })
                .collect(Collectors.toList());
        postGetDto.setComments(commentDtoList);

        return postGetDto;
    }

    /**
     * Get the topics that the current user is subscribed to
     * @return A list of topics that the current user is subscribed
     */
    private List<Topic> getTopics() {
        User currentUser = securityUtils.getCurrentUser();

        List<Topic> subscribedTopics = currentUser.getSubscriptions().stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());
        return subscribedTopics;
    }
}
