package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;
    private final TopicService topicService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public SubscriptionController(SubscriptionService subscriptionService,
                                  UserService userService,
                                  TopicService topicService,
                                  ModelMapper modelMapper) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
        this.topicService = topicService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/{topicId}/subscribe/{userId}")
    public ResponseEntity<?> subscribeUserToTopic(@PathVariable Long topicId, @PathVariable Long userId) {
        Topic topic = topicService.findById(topicId);
        User user = userService.findById(userId);

        if (topic == null || user == null) {
            return ResponseEntity.notFound().build();
        }

        if (subscriptionService.isUserSubscribedToTopic(user, topic)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User is already subscribed to this topic");
        }

        subscriptionService.subscribeUserToTopic(user, topic);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{topicId}/unsubscribe/{userId}")
    public ResponseEntity<?> unsubscribeUserFromTopic(@PathVariable Long topicId, @PathVariable Long userId) {
        Topic topic = topicService.findById(topicId);
        User user = userService.findById(userId);

        if (topic == null || user == null) {
            return ResponseEntity.notFound().build();
        }

        subscriptionService.unsubscribeUserFromTopic(user, topic);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscribed/{userId}")
    public ResponseEntity<?> getSubscribedTopicsByUser(@PathVariable Long userId) {
        User user = userService.findById(userId);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<Topic> topics = subscriptionService.getSubscribedTopicsByUser(user);
        List<TopicDto> topicsDto = topics.stream()
                .map(topic -> modelMapper.map(topic, TopicDto.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(topicsDto);
    }
}