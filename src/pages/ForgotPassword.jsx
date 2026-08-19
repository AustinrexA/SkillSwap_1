import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function ForgotPassword() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOTP = async () => {

    try {

      const res = await api.post("/password/send-otp", {
        email,
      });

      alert(res.data);

      if (res.data === "OTP sent successfully") {
        setStep(2);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

  };

  const verifyOTP = async () => {

    try {

      const res = await api.post("/password/verify-otp", {
        email,
        otp,
      });

      alert(res.data);

      if (res.data === "OTP verified") {
        setStep(3);
      }

    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }

  };

  const resetPassword = async () => {

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await api.post("/password/reset", {
        email,
        password,
      });

      alert(res.data);

      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Password reset failed");
    }

  };