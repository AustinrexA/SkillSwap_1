package com.skillswap.controller;

import com.skillswap.model.User;
import com.skillswap.repository.UserRepository;
import com.skillswap.service.OTPService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/password")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordController {

    @Autowired
    private OTPService otpService;

    @Autowired
    private UserRepository userRepository;

    // ================= Send OTP =================

    @PostMapping("/send-otp")
    public String sendOTP(@RequestBody User user) {

        User existingUser = userRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(user.getEmail()))
                .findFirst()
                .orElse(null);

        if (existingUser == null) {
            return "Email not found";
        }

        otpService.sendOTP(user.getEmail());

        return "OTP sent successfully";
    }

    // ================= Verify OTP =================

    @PostMapping("/verify-otp")
    public String verifyOTP(@RequestBody OTPRequest request) {

        boolean valid = otpService.verifyOTP(
                request.getEmail(),
                request.getOtp()
        );

        if (valid) {
            return "OTP verified";
        }

        return "Invalid OTP";
    }

    // ================= Reset Password =================

    @PostMapping("/reset")
    public String resetPassword(@RequestBody ResetPasswordRequest request) {

        User user = userRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(request.getEmail()))
                .findFirst()
                .orElse(null);

        if (user == null) {
            return "User not found";
        }

        user.setPassword(request.getPassword());

        userRepository.save(user);

        otpService.deleteOTP(request.getEmail());

        return "Password updated successfully";
    }

    // ================= DTO =================

    static class OTPRequest {

        private String email;
        private String otp;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }
    }

    static class ResetPasswordRequest {

        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}