package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/")
public class CommentController {
    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
        }

    /**
     * Add a comment to a post
     * @param postId
     * @param commentDTO
     * @return http status 200 if the comment is added
     */
    @PostMapping("posts/{postId}")
    public ResponseEntity<?> addCommentToPost(@PathVariable Long postId, @RequestBody CommentDto commentDTO) {
        try {
            commentService.addComment(commentDTO, postId);
            return ResponseEntity.ok().build();
        } catch (Exception  e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
