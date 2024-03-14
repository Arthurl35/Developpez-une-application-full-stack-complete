package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.PostGetDto;
import com.openclassrooms.mddapi.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    /**
     * Add a post
     * @param postDTO
     * @return http status 200 if the post is added
     */
    @PostMapping
    public ResponseEntity<?> addPost(@RequestBody PostDto postDTO) {
        try {
            postService.addPost(postDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Get all posts
     * @return a list of all posts
     */
    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        try {
            List<PostDto> postsDto = postService.getAllPosts();
            return ResponseEntity.ok(postsDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * Get a post by its id
     * @param postId
     * @return the post
     */
    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Long postId) {
        try {
            PostGetDto postGetDto = postService.getPostById(postId);
            return ResponseEntity.ok(postGetDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
