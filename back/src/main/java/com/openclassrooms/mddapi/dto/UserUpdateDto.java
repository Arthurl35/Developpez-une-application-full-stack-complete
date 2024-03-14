package com.openclassrooms.mddapi.dto;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {
    @NotNull
    private String username;

    @NotNull
    private String email;
}