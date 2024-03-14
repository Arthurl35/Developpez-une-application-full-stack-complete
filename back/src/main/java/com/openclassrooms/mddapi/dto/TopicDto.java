package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicDto{
    @NotNull
    private Long id;

    @NotBlank
    @Size(max = 25)
    private String title;

    @NotBlank
    @Size(max = 255)
    private String description;
}
