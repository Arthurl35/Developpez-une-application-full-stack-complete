package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostGetDto {
    private Long id;
    private String title;
    private String description;
    private Long topicId;
    private Timestamp createdAt;
    private String authorEmail;
    private String topicTitle;
}
