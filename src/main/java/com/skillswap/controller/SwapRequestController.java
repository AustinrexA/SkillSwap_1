package com.skillswap.controller;

import com.skillswap.model.Notification;
import com.skillswap.model.SwapRequest;
import com.skillswap.repository.NotificationRepository;
import com.skillswap.repository.SwapRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/swap")
@CrossOrigin(origins = "http://localhost:5173")
public class SwapRequestController {

    @Autowired
    private SwapRequestRepository swapRequestRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // Send a new swap request
    @PostMapping
    public SwapRequest sendRequest(@RequestBody SwapRequest request) {

        System.out.println("========== NEW SWAP REQUEST ==========");
        System.out.println("Sender ID   : " + request.getSenderId());
        System.out.println("Receiver ID : " + request.getReceiverId());
        System.out.println("Offered     : " + request.getOfferedSkill());
        System.out.println("Requested   : " + request.getRequestedSkill());

        request.setStatus("PENDING");

        SwapRequest savedRequest = swapRequestRepository.save(request);

        System.out.println("Swap Request Saved. ID = " + savedRequest.getId());

        Notification notification = new Notification();
        notification.setUserId(savedRequest.getReceiverId());
        notification.setMessage("You have received a new swap request.");
        notification.setRead(false);

        System.out.println("Creating notification for user: " + savedRequest.getReceiverId());

        Notification savedNotification = notificationRepository.save(notification);

        System.out.println("Notification Saved. ID = " + savedNotification.getId());
        System.out.println("======================================");

        return savedRequest;
    }

    // Get all requests sent by a user
    @GetMapping("/sent/{senderId}")
    public List<SwapRequest> getSentRequests(@PathVariable Long senderId) {
        return swapRequestRepository.findBySenderId(senderId);
    }

    // Get all requests received by a user
    @GetMapping("/received/{receiverId}")
    public List<SwapRequest> getReceivedRequests(@PathVariable Long receiverId) {
        return swapRequestRepository.findByReceiverId(receiverId);
    }

    // Accept a request
    @PutMapping("/accept/{id}")
    public SwapRequest acceptRequest(@PathVariable Long id) {

        SwapRequest request = swapRequestRepository.findById(id).orElse(null);

        if (request != null) {

            request.setStatus("ACCEPTED");

            SwapRequest savedRequest = swapRequestRepository.save(request);

            Notification notification = new Notification();
            notification.setUserId(savedRequest.getSenderId());
            notification.setMessage("Your swap request has been accepted.");
            notification.setRead(false);

            Notification savedNotification = notificationRepository.save(notification);

            System.out.println("Acceptance Notification Saved. ID = " + savedNotification.getId());

            return savedRequest;
        }

        return null;
    }

    // Reject a request
    @PutMapping("/reject/{id}")
    public SwapRequest rejectRequest(@PathVariable Long id) {

        SwapRequest request = swapRequestRepository.findById(id).orElse(null);

        if (request != null) {

            request.setStatus("REJECTED");

            SwapRequest savedRequest = swapRequestRepository.save(request);

            Notification notification = new Notification();
            notification.setUserId(savedRequest.getSenderId());
            notification.setMessage("Your swap request has been rejected.");
            notification.setRead(false);

            Notification savedNotification = notificationRepository.save(notification);

            System.out.println("Rejection Notification Saved. ID = " + savedNotification.getId());

            return savedRequest;
        }

        return null;
    }
}