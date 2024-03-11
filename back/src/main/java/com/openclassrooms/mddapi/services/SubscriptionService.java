package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final TopicRepository topicRepository;
    private final SecurityUtils securityUtils;

    private final TopicService topicService;


    public SubscriptionService(SubscriptionRepository subscriptionRepository,
                                                SecurityUtils securityUtils,
                                                TopicService topicService,
                                                TopicRepository topicRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.securityUtils = securityUtils;
        this.topicService = topicService;
        this.topicRepository = topicRepository;
    }

    public void subscribeCurrentUserToTopic(Topic topic) throws Exception {
        User currentUser = securityUtils.getCurrentUser();

        Subscription existingSubscription = subscriptionRepository.findByUserAndTopic(currentUser, topic);

        if (existingSubscription != null) {
            throw new Exception("You are already subscribed to this topic.");
        }

        Subscription subscription = new Subscription();
        subscription.setUser(currentUser);
        subscription.setTopic(topic);
        subscriptionRepository.save(subscription);
    }

    public void unsubscribeCurrentUserFromTopic(Topic topic) throws Exception {
        User currentUser = securityUtils.getCurrentUser();

        Subscription subscription = subscriptionRepository.findByUserAndTopic(currentUser, topic);

        if (subscription == null) {
            throw new Exception("You are not subscribed to this topic.");
        }
        subscriptionRepository.delete(subscription);
    }

    public List<TopicDto> getSubscribedTopics() {
        return getSubscribedTopicsByCurrentUser().stream()
                .map(topic -> {
                     TopicDto topicDto = new TopicDto();
                        topicDto.setId(topic.getId());
                        topicDto.setTitle(topic.getTitle());
                        topicDto.setDescription(topic.getDescription());
                     return topicDto;
                })
                .collect(Collectors.toList());
    }

    public List<TopicDto> getUnsubscribedTopics() {
        List<Topic> subscribedTopics = getSubscribedTopicsByCurrentUser();
        List<Topic> allTopics = topicRepository.findAll();
        return allTopics.stream()
                .filter(topic -> !subscribedTopics.contains(topic))
                .map(topic -> {
                    TopicDto topicDto = new TopicDto();
                    topicDto.setId(topic.getId());
                    topicDto.setTitle(topic.getTitle());
                    topicDto.setDescription(topic.getDescription());
                    return topicDto;
                })
                .collect(Collectors.toList());
    }


    public List<Topic> getSubscribedTopicsByCurrentUser() {
        User currentUser = securityUtils.getCurrentUser();
        return subscriptionRepository.findByUser(currentUser).stream()
                .map(Subscription::getTopic)
                .collect(Collectors.toList());
    }
}
