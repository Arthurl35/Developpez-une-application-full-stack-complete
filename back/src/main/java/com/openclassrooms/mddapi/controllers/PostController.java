package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.PostGetDto;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.services.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private PostService postService;
    private ModelMapper modelMapper;

    public PostController(PostService postService, ModelMapper modelMapper) {
        this.postService = postService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<?> addPost(@RequestBody PostDto postDTO) {
        try {
            postService.addPost(postDTO);
            return ResponseEntity.ok("Le post a été créé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        List<PostDto> posts = postService.getAllPosts().stream()
                .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                .map(post -> {
                    PostDto postDto = modelMapper.map(post, PostDto.class);
                    postDto.setAuthorEmail(post.getUser().getEmail()); // set authorEmail
                    return postDto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPost(@PathVariable Long postId) {
        try {
            Post post = postService.getPostById(postId);
            PostGetDto postDto = modelMapper.map(post, PostGetDto.class);
            postDto.setCreatedAt(post.getCreatedAt());
            postDto.setAuthorEmail(post.getUser().getEmail());
            postDto.setTopicTitle(post.getTopic().getTitle());
            List<CommentDto> commentDtoList = post.getComments().stream()
                    .map(comment -> {
                        CommentDto commentDtoItem = modelMapper.map(comment, CommentDto.class);
                        commentDtoItem.setAuthorEmail(comment.getUser().getEmail());
                        return commentDtoItem;
                    })
                    .collect(Collectors.toList());
            postDto.setComments(commentDtoList);
            return ResponseEntity.ok(postDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
