package com.skillswap.controller;

import com.skillswap.model.Notification;
import com.skillswap.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationRepository.save(notification);
    }

    @PutMapping("/read/{id}")
    public Notification markAsRead(@PathVariable Long id) {

        Notification notification =
                notificationRepository.findById(id).orElse(null);

        if (notification != null) {
            notification.setRead(true);
            return notificationRepository.save(notification);
        }

        return null;
    }
}