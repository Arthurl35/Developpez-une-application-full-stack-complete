package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.openclassrooms.mddapi.models.Post;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTopicIn(List<Topic> subscribedTopics);
}
