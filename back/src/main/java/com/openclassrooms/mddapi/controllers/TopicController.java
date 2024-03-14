package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController{
    private final TopicService topicService;
    private final ModelMapper modelMapper;
    private final SubscriptionService subscriptionService;


    public TopicController(TopicService topicService,
                           ModelMapper modelMapper,
                           SubscriptionService subscriptionService) {
        this.topicService = topicService;
        this.modelMapper = modelMapper;
        this.subscriptionService = subscriptionService;
    }

    /**
     * Find a topic by its ID
     * @param id The ID of the topic to find
     * @return A ResponseEntity containing the TopicDto if found, otherwise a not found or bad request response
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Topic topic = this.topicService.findById(id);

            if (topic == null) {
                return ResponseEntity.notFound().build();
            }

            TopicDto topicDto = modelMapper.map(topic, TopicDto.class);

            return ResponseEntity.ok().body(topicDto);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all topics
     * @return List of topics subscribed by the user
     */
    @GetMapping("/subscribed")
    public ResponseEntity<?> getSubscribedTopics() {
        List<TopicDto> subscribedTopics = subscriptionService.getSubscribedTopics();
        return ResponseEntity.ok().body(subscribedTopics);
    }

    /**
     * Get all topics
     * @return List of topics  unsubscribed by the user
     */
    @GetMapping("/unsubscribed")
    public ResponseEntity<?> getUnsubscribedTopics() {
        List<TopicDto> unsubscribedTopics = subscriptionService.getUnsubscribedTopics();
        return ResponseEntity.ok().body(unsubscribedTopics);
    }
}
