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
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Forgot Password
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-5">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <button
              onClick={sendOTP}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
            >
              Send OTP
            </button>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5">

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <button
              onClick={verifyOTP}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Verify OTP
            </button>

          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-5">

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-cyan-400"
            />

            <button
              onClick={resetPassword}
              className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-semibold"
            >
              Reset Password
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default ForgotPassword;