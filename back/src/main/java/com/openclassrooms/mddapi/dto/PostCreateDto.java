package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostCreateDto {

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private Long topicId;

}
