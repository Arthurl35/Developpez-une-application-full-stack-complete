package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostGetDto {
    @NotNull
    private Long id;

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private Timestamp createdAt;

    @NotNull
    private String authorEmail;

    @NotNull
    private Long topicId;

    @NotNull
    private String topicTitle;

    @NotNull
    private List<CommentDto> comments;
}
