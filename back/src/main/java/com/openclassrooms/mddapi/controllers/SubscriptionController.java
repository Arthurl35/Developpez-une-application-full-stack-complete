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
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;
    private final TopicService topicService;
    private final ModelMapper modelMapper;

    public SubscriptionController(SubscriptionService subscriptionService,
                                  TopicService topicService,
                                  ModelMapper modelMapper) {
        this.subscriptionService = subscriptionService;
        this.topicService = topicService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/{topicId}/subscribe")
    public ResponseEntity<?> subscribeCurrentUserToTopic(@PathVariable Long topicId) {
        Topic topic = topicService.findById(topicId);
        if (topic == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Topic not found with id: " + topicId);
        }

        try {
            subscriptionService.subscribeCurrentUserToTopic(topic);
            return ResponseEntity.ok().body(Map.of("message", "Successfully subscribed to the topic with id: " + topicId));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/{topicId}/unsubscribe")
    public ResponseEntity<?> unsubscribeCurrentUserFromTopic(@PathVariable Long topicId) {
        Topic topic = topicService.findById(topicId);
        if (topic == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            subscriptionService.unsubscribeCurrentUserFromTopic(topic);
            return ResponseEntity.ok().body(Map.of("message", "Successfully unsubscribed from the topic with id: " + topicId));


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
