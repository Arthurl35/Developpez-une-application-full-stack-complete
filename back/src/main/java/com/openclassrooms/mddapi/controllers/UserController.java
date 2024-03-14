package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.UserGetDto;
import com.openclassrooms.mddapi.dto.UserUpdateDto;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private ModelMapper modelMapper;
    private SecurityUtils securityUtils;


    public UserController(UserService userService,
                          ModelMapper modelMapper,
                          SecurityUtils securityUtils) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.securityUtils = securityUtils;
    }

    /**
     * Find a user by its ID
     * @param id The ID of the user to find
     * @return A ResponseEntity containing the UserGetDto if found, otherwise a not found or bad request response
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            User user = this.userService.findById(id);

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(modelMapper.map(user, UserGetDto.class));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update a user
     * @param userUpdateDto The user to update
     * @return A ResponseEntity containing a success or bad request response
     */
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody UserUpdateDto userUpdateDto) {
        try {
            User currentUser = securityUtils.getCurrentUser();
            User user = this.userService.findById(currentUser.getId());

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            user.setEmail(userUpdateDto.getEmail());
            user.setUsername(userUpdateDto.getUsername());
            user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

            this.userService.save(user);

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
