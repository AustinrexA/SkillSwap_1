package com.skillswap.repository;

import com.skillswap.model.OTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OTPRepository extends JpaRepository<OTP, Long> {

    OTP findByEmail(String email);

}