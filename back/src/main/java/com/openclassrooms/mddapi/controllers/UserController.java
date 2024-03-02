package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.UserGetDto;
import com.openclassrooms.mddapi.dto.UserUpdateDto;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private SecurityUtils securityUtils;


    public UserController(UserService userService,
                          ModelMapper modelMapper,
                          PasswordEncoder passwordEncoder,
                          SecurityUtils securityUtils) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.securityUtils = securityUtils;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            User user = this.userService.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(modelMapper.map(user, UserGetDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody UserUpdateDto userUpdateDto) {
        try {
            User currentUser = securityUtils.getCurrentUser();
            User user = this.userService.findById(Long.valueOf(currentUser.getId()));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            if (userUpdateDto.getUsername() != null && !userUpdateDto.getUsername().isEmpty()) {
                user.setUsername(userUpdateDto.getUsername());
            }

            if (userUpdateDto.getEmail() != null && !userUpdateDto.getEmail().isEmpty()) {
                user.setEmail(userUpdateDto.getEmail());
            }

            if (userUpdateDto.getPassword() != null && !userUpdateDto.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userUpdateDto.getPassword()));
            }

            user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            user = this.userService.save(user);

            return ResponseEntity.ok().body(modelMapper.map(user, UserUpdateDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
