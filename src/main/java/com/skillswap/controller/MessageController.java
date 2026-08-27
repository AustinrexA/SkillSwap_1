package com.skillswap.controller;

import com.skillswap.model.Message;
import com.skillswap.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    // Send Message
    @PostMapping
    public Message sendMessage(@RequestBody Message message) {

        String currentTime = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));

        message.setTime(currentTime);

        return messageRepository.save(message);
    }

    // Get Conversation
    @GetMapping("/{user1}/{user2}")
    public List<Message> getConversation(@PathVariable Long user1,
                                         @PathVariable Long user2) {

        List<Message> messages = new ArrayList<>();

        messages.addAll(messageRepository.findBySenderIdAndReceiverId(user1, user2));
        messages.addAll(messageRepository.findBySenderIdAndReceiverId(user2, user1));

        messages.sort(Comparator.comparing(Message::getId));

        return messages;
    }
}