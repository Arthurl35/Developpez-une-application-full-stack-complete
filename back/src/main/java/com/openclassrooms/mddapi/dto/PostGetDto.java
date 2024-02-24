package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostGetDto {
    private Long id;
    private String title;
    private String description;
    private Timestamp createdAt;
    private String authorEmail;
    private Long topicId;
    private String topicTitle;
    private List<CommentDto> comments;
}
