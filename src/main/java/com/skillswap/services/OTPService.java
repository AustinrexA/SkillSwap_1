package com.skillswap.service;

import com.skillswap.model.OTP;
import com.skillswap.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OTPService {

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private EmailService emailService;

    // Generate a 6-digit OTP
    public String generateOTP() {
        Random random = new Random();
        int number = 100000 + random.nextInt(900000);
        return String.valueOf(number);
    }

    // Send OTP to email
    public void sendOTP(String email) {

        String otp = generateOTP();

        OTP existingOTP = otpRepository.findByEmail(email);

        if (existingOTP == null) {
            existingOTP = new OTP();
            existingOTP.setEmail(email);
        }

        existingOTP.setOtp(otp);
        existingOTP.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(existingOTP);

        emailService.sendEmail(
                email,
                "SkillSwap Password Reset OTP",
                "Your OTP is: " + otp + "\n\nThis OTP is valid for 5 minutes."
        );
    }

    // Verify OTP
    public boolean verifyOTP(String email, String otp) {

        OTP savedOTP = otpRepository.findByEmail(email);

        if (savedOTP == null) {
            return false;
        }

        if (savedOTP.getExpiryTime().isBefore(LocalDateTime.now())) {
            return false;
        }

        return savedOTP.getOtp().equals(otp);
    }

    // Delete OTP after successful password reset
    public void deleteOTP(String email) {

        OTP savedOTP = otpRepository.findByEmail(email);

        if (savedOTP != null) {
            otpRepository.delete(savedOTP);
        }
    }
}