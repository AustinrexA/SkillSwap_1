package com.skillswap.controller;

import com.skillswap.model.Message;
import com.skillswap.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {

    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message send(Message message) {

        String currentTime = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));

        message.setTime(currentTime);

        return messageRepository.save(message);
    }
}