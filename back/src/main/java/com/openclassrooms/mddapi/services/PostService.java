package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

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

    public Post addPost(PostDto postDto) {
        User currentUser = securityUtils.getCurrentUser();
        Post post = modelMapper.map(postDto, Post.class);
        post.setUser(currentUser);
        post.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        User currentUser = securityUtils.getCurrentUser();
        return postRepository.findByUser(currentUser);
    }

    public Post getPostById(Long id) {

        User currentUser = securityUtils.getCurrentUser();
        return postRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }
}
