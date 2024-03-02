package com.openclassrooms.mddapi.dto;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGetDto {
    private Long id;
    private String username;
    private String email;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}