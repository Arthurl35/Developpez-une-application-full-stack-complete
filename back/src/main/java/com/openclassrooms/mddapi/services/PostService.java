package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.PostGetDto;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    private PostRepository postRepository;
    private ModelMapper modelMapper;
    private SecurityUtils securityUtils;
    private TopicRepository topicRepository;
    @Autowired
    public PostService(PostRepository postRepository,
                       ModelMapper modelMapper,
                       SecurityUtils securityUtils,
                       TopicRepository topicRepository) {
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;
        this.securityUtils = securityUtils;
        this.topicRepository = topicRepository;
    }

    public Post addPost(PostDto postDto) throws Exception {
        User currentUser = securityUtils.getCurrentUser();
        Topic topic = topicRepository.findById(postDto.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found with id: " + postDto.getTopicId()));

        List<Topic> subscribedTopics = currentUser.getSubscriptions().stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());

        if (!subscribedTopics.contains(topic)) {
            throw new Exception("You are not subscribed to this topic.");
        }

        Post post = modelMapper.map(postDto, Post.class);
        post.setUser(currentUser);
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        User currentUser = securityUtils.getCurrentUser();
        List<Topic> subscribedTopics = currentUser.getSubscriptions().stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());
        return postRepository.findByTopicIn(subscribedTopics);
    }

    public Post getPostById(Long postId){
        User currentUser = securityUtils.getCurrentUser();
        List<Topic> subscribedTopics = currentUser.getSubscriptions().stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        if (!subscribedTopics.contains(post.getTopic())) {
            throw new RuntimeException("You are not subscribed to the topic of this post.");
        }

        return post;
    }
}
