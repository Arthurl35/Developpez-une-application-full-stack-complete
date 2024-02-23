package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/topics")
public class TopicController{
    private final TopicService topicService;
    private final UserService userService;
    private final ModelMapper modelMapper;


    public TopicController(TopicService topicService,
                            UserService userService,
                           ModelMapper modelMapper) {
        this.topicService = topicService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            Topic topic = this.topicService.findById(Long.valueOf(id));

            if (topic == null) {
                return ResponseEntity.notFound().build();
            }

            TopicDto topicDto = modelMapper.map(topic, TopicDto.class);

            return ResponseEntity.ok().body(topicDto);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        List<Topic> topics = this.topicService.findAll();

        List<TopicDto> topicsDto = topics.stream()
                .map(topic -> modelMapper.map(topic, TopicDto.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(topicsDto);
    }
}
