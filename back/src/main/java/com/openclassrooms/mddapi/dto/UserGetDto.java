package com.openclassrooms.mddapi.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGetDto {
    @NotNull
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String email;

    @NotNull
    private Timestamp createdAt;

    @NotNull
    private Timestamp updatedAt;
}