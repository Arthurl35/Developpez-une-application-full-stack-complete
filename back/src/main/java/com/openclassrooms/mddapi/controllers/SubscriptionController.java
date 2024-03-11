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

    public SubscriptionController(SubscriptionService subscriptionService,
                                  TopicService topicService) {
        this.subscriptionService = subscriptionService;
        this.topicService = topicService;
    }

    @PostMapping("/{topicId}/subscribe")
    public ResponseEntity<?> subscribeCurrentUserToTopic(@PathVariable Long topicId) {
        try {
            subscriptionService.subscribeCurrentUserToTopic(topicService.findById(topicId));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/{topicId}/unsubscribe")
    public ResponseEntity<?> unsubscribeCurrentUserFromTopic(@PathVariable Long topicId) {
        try {
            subscriptionService.unsubscribeCurrentUserFromTopic(topicService.findById(topicId));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
