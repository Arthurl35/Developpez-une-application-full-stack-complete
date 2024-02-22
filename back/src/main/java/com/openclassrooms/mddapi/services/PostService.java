package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.models.Post;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post findById(Long id) {
        return postRepository.findById(id).orElse(null);
        //return postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
    }
}