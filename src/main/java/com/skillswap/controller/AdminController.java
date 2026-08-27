package com.skillswap.controller;

import com.skillswap.model.Message;
import com.skillswap.model.SwapRequest;
import com.skillswap.model.User;
import com.skillswap.repository.MessageRepository;
import com.skillswap.repository.SwapRequestRepository;
import com.skillswap.repository.UserRepository;
import com.skillswap.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SwapRequestRepository swapRequestRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private EmailService emailService;

    // ================= Test Email =================

    @GetMapping("/test-email")
    public String testEmail() {

        emailService.sendEmail(
                "austinrex25012004@gmail.com",
                "SkillSwap Email Test",
                "Congratulations! Your SkillSwap email service is working successfully."
        );

        return "Email sent successfully!";
    }

    // ================= Dashboard Statistics =================

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("users", userRepository.count());
        stats.put("swapRequests", swapRequestRepository.count());
        stats.put("messages", messageRepository.count());

        stats.put(
                "pending",
                (long) swapRequestRepository.findByStatus("PENDING").size()
        );

        stats.put(
                "accepted",
                (long) swapRequestRepository.findByStatus("ACCEPTED").size()
        );

        stats.put(
                "rejected",
                (long) swapRequestRepository.findByStatus("REJECTED").size()
        );

        return stats;
    }

    // ================= Users =================

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    // ================= Swap Requests =================

    @GetMapping("/swaps")
    public List<SwapRequest> getAllSwapRequests() {
        return swapRequestRepository.findAll();
    }

    @DeleteMapping("/swaps/{id}")
    public String deleteSwapRequest(@PathVariable Long id) {
        swapRequestRepository.deleteById(id);
        return "Swap request deleted successfully";
    }

    // ================= Messages =================

    @GetMapping("/messages")
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @DeleteMapping("/messages/{id}")
    public String deleteMessage(@PathVariable Long id) {
        messageRepository.deleteById(id);
        return "Message deleted successfully";
    }
}