package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    @NotNull
    private Long id;

    @NotNull
    private String authorEmail;

    @NotNull
    private String description;

    @NotNull
    private Timestamp createdAt;

    @NotNull
    private Long postId;
}

