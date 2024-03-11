package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("/subscribed")
    public ResponseEntity<?> getSubscribedTopics() {
        List<TopicDto> subscribedTopics = subscriptionService.getSubscribedTopics();
        return ResponseEntity.ok().body(subscribedTopics);
    }

    @GetMapping("/unsubscribed")
    public ResponseEntity<?> getUnsubscribedTopics() {
        List<TopicDto> unsubscribedTopics = subscriptionService.getUnsubscribedTopics();
        return ResponseEntity.ok().body(unsubscribedTopics);
    }
}
