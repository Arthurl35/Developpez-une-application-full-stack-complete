package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private ModelMapper modelMapper;
    private SecurityUtils securityUtils;

    public CommentService(CommentRepository commentRepository, ModelMapper modelMapper, SecurityUtils securityUtils) {
        this.commentRepository = commentRepository;
        this.modelMapper = modelMapper;
        this.securityUtils = securityUtils;
    }

    public Comment addComment(CommentDto commentDto) {
        User currentUser = securityUtils.getCurrentUser();
        Comment comment = modelMapper.map(commentDto, Comment.class);
        comment.setUser(currentUser);
        comment.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return commentRepository.save(comment);
    }

}
