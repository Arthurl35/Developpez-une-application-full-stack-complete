package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {
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
}

