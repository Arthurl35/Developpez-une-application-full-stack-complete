package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Subscribe the current user to a topic
     * @param topicId
     * @return http response entity
     */
    @PostMapping("/{topicId}/subscribe")
    public ResponseEntity<?> subscribeCurrentUserToTopic(@PathVariable Long topicId) {
        try {
            subscriptionService.subscribeCurrentUserToTopic(topicService.findById(topicId));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    /**
     * Unsubscribe the current user from a topic
     * @param topicId
     * @return http response entity
     */
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
