package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);

    Optional<User> findByEmailOrUsername(String email, String username);

    Boolean existsByEmail(String email);
}



