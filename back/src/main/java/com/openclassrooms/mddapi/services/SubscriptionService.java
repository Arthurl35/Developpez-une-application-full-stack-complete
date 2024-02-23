package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public void subscribeUserToTopic(User user, Topic topic) {
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setTopic(topic);
        subscriptionRepository.save(subscription);
    }

    public void unsubscribeUserFromTopic(User user, Topic topic) {
        Subscription subscription = subscriptionRepository.findByUserAndTopic(user, topic);
        if (subscription != null && subscription.isSubscribed()) {
            subscriptionRepository.delete(subscription);
        }
    }

    public boolean isUserSubscribedToTopic(User user, Topic topic) {
        Subscription subscription = subscriptionRepository.findByUserAndTopic(user, topic);
        return subscription != null && subscription.isSubscribed();
    }

    public List<Topic> getSubscribedTopicsByUser(User user) {
        return subscriptionRepository.findByUser(user).stream()
                .filter(Subscription::isSubscribed)
                .map(Subscription::getTopic)
                .collect(Collectors.toList());
    }
}