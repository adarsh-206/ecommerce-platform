"use client";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  ArrowLeft,
  Shield,
} from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";
import apiService from "@/app/utils/apiService";
import Link from "next/link";

export const buyerRegisterMetadata = {
  title:
    "Create Account | Chaka-Chak - Join India's Quirkiest Fashion Community",
  description:
    "Join the Chaka-Chak family by creating your personal account and unlock access to India's most exciting collection of quirky fashion, unique accessories, and stylish lifestyle products. Registration is quick, easy, and completely free, giving you immediate access to exclusive member benefits, personalized shopping experiences, and special offers that aren't available to casual browsers. When you create an account with Chaka-Chak, you're not just signing up for a shopping platform - you're joining a vibrant community of fashion enthusiasts who appreciate unique style, quality products, and exceptional value. Your account provides numerous advantages including faster checkout processes, saved payment methods and addresses, order tracking capabilities, wishlist functionality, and access to your complete purchase history. As a registered member, you'll be the first to know about new arrivals, exclusive sales, limited-time offers, and special events. You'll also receive personalized product recommendations based on your browsing and purchase history, helping you discover new items that perfectly match your style preferences. Our registration process prioritizes your privacy and security, using advanced encryption and security measures to protect your personal information. We require only essential information to create your account, and you have complete control over your communication preferences and privacy settings. Once registered, you can easily manage your profile, update your information, and customize your shopping experience to match your preferences. Joining Chaka-Chak means becoming part of a community that celebrates individuality, embraces creativity, and believes that fashion should be fun, accessible, and expressive of your unique personality.",
  keywords:
    "chaka chak register, create account, join community, sign up, new member, registration",
  icons: {
    icon: "/chaka-chak-logo.ico",
    apple: "/chaka-chak-logo.png",
  },
};

export default function BuyerRegistration() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
    apiError: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "text-gray-400",
  });

  useEffect(() => {
    if (formStep === 0) {
      validateForm();
    }
  }, [form, acceptedTerms, formStep]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateIndianPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const hasCapital = /[A-Z]/.test(password);
    const hasSmall = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    let score = 0;
    let message = "";
    let color = "text-gray-400";

    if (hasMinLength) score++;
    if (hasCapital) score++;
    if (hasSmall) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    if (score === 0) {
      message = "Enter password";
      color = "text-gray-400";
    } else if (score < 3) {
      message = "Weak password";
      color = "text-red-500";
    } else if (score < 5) {
      message = "Moderate password";
      color = "text-amber-500";
    } else {
      message = "Strong password";
      color = "text-green-500";
    }

    setPasswordStrength({ score, message, color });

    const missingRequirements = [];
    if (!hasCapital) missingRequirements.push("one capital letter");
    if (!hasSmall) missingRequirements.push("one small letter");
    if (!hasNumber) missingRequirements.push("one number");
    if (!hasSpecial) missingRequirements.push("one special character");
    if (!hasMinLength) missingRequirements.push("minimum 8 characters");

    if (missingRequirements.length > 0) {
      return `Password must include ${missingRequirements.join(", ")}`;
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {
      fullName:
        !form.fullName && touchedFields.fullName ? "Full name is required" : "",
      email:
        !form.email && touchedFields.email
          ? "Email is required"
          : touchedFields.email && !validateEmail(form.email)
          ? "Please enter a valid email address"
          : "",
      phone:
        !form.phone && touchedFields.phone
          ? "Phone number is required"
          : touchedFields.phone && !validateIndianPhone(form.phone)
          ? "Please enter a valid 10-digit Indian mobile number"
          : "",
      password:
        !form.password && touchedFields.password
          ? "Password is required"
          : touchedFields.password
          ? validatePassword(form.password)
          : "",
      confirmPassword:
        !form.confirmPassword && touchedFields.confirmPassword
          ? "Please confirm your password"
          : touchedFields.confirmPassword &&
            form.password !== form.confirmPassword
          ? "Passwords do not match"
          : "",
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }));

    const allFieldsFilled =
      form.fullName &&
      form.email &&
      form.phone &&
      form.password &&
      form.confirmPassword;
    const noErrors =
      validateEmail(form.email) &&
      validateIndianPhone(form.phone) &&
      validatePassword(form.password) === "" &&
      form.password === form.confirmPassword;

    setFormValid(allFieldsFilled && noErrors && acceptedTerms);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (!touchedFields[name]) {
      setTouchedFields({ ...touchedFields, [name]: true });
    }
  };

  const handleBlur = (field) => {
    if (!touchedFields[field]) {
      setTouchedFields({ ...touchedFields, [field]: true });
    }
  };

  const handleSubmit = async () => {
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    validateForm();

    if (!formValid) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, apiError: "" }));

    try {
      const userData = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "buyer",
        approved: true,
      };

      await apiService.post("/register", userData);
      setFormStep(1);
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      setErrors((prev) => ({ ...prev, apiError: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendOtp = async () => {
    setOtpLoading(true);
    setErrors((prev) => ({ ...prev, apiError: "", otp: "" }));

    try {
      const data = {
        phone: form.phone,
        email: form.email,
      };
      await apiService.post("/otp/send", data);
      setOtpSent(true);
    } catch (error) {
      let errorMessage = "Failed to send OTP. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors((prev) => ({ ...prev, apiError: errorMessage }));
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setErrors((prev) => ({ ...prev, otp: "Please enter a valid OTP" }));
      return;
    }

    setVerifyingOtp(true);
    setErrors((prev) => ({ ...prev, apiError: "", otp: "" }));

    try {
      const data = {
        phone: form.phone,
        email: form.email,
        otp: otp,
      };
      await apiService.post("/otp/verify", data);
      setFormStep(2);
    } catch (error) {
      let errorMessage = "Invalid OTP. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrors((prev) => ({ ...prev, otp: errorMessage }));
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setOtp(value);
      if (errors.otp) {
        setErrors((prev) => ({ ...prev, otp: "" }));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const dismissError = (field) => {
    setErrors({ ...errors, [field]: "" });
  };

  const goBack = () => {
    setFormStep(0);
    setOtpSent(false);
    setOtp("");
    setErrors((prev) => ({ ...prev, otp: "", apiError: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-6 py-12">
      <div className="absolute top-6 left-6 z-10">
        <BrandLogo href="/" />
      </div>
      <div className="max-w-6xl w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
        <div className="hidden md:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white space-y-8 h-full">
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold tracking-tight">
              {formStep === 0 && "Join Our Exclusive Club"}
              {formStep === 1 && "Verify Your Account"}
              {formStep === 2 && "Welcome Aboard!"}
            </h2>
            <p className="text-lg leading-relaxed opacity-90">
              {formStep === 0 &&
                "Unlock premium deals, personalized recommendations, and a seamless shopping experience designed just for you."}
              {formStep === 1 &&
                "We've sent a verification code to your phone and email. Please enter it to secure your account."}
              {formStep === 2 &&
                "Your account has been successfully created and verified. You're ready to start shopping!"}
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-amber-200" size={24} />
                <span className="text-lg">Access to exclusive deals</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-amber-200" size={24} />
                <span className="text-lg">Priority customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-amber-200" size={24} />
                <span className="text-lg">Free shipping on premium items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-r-3xl">
          {formStep === 0 && (
            <>
              <h1 className="text-4xl font-extrabold text-amber-800 mb-2 tracking-wide">
                Create Your Account
              </h1>
              <p className="text-gray-500 mb-8">
                Join our community of smart shoppers today
              </p>

              {errors.apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    <span>{errors.apiError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissError("apiError")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="text-amber-400" size={20} />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("fullName")}
                      placeholder="Full Name"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                        errors.fullName ? "border-red-300" : "border-gray-200"
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition text-gray-800`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-500 text-sm ml-1 mt-1 flex items-center">
                      <AlertCircle className="inline mr-1" size={14} />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="text-amber-400" size={20} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      placeholder="Email Address"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                        errors.email ? "border-red-300" : "border-gray-200"
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition text-gray-800`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm ml-1 mt-1 flex items-center">
                      <AlertCircle className="inline mr-1" size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="text-amber-400" size={20} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phone")}
                      placeholder="Phone Number (10 digits)"
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border ${
                        errors.phone ? "border-red-300" : "border-gray-200"
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition text-gray-800`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm ml-1 mt-1 flex items-center">
                      <AlertCircle className="inline mr-1" size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-amber-400" size={20} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur("password")}
                      placeholder="Password"
                      className={`w-full pl-12 pr-12 py-4 rounded-xl border ${
                        errors.password ? "border-red-300" : "border-gray-200"
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition text-gray-800`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff
                          className="text-gray-400 hover:text-amber-600"
                          size={20}
                        />
                      ) : (
                        <Eye
                          className="text-gray-400 hover:text-amber-600"
                          size={20}
                        />
                      )}
                    </button>
                  </div>
                  {form.password && touchedFields.password && (
                    <p
                      className={`text-sm ml-1 mt-1 ${passwordStrength.color}`}
                    >
                      {passwordStrength.message}
                    </p>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-sm ml-1 mt-1 flex items-center">
                      <AlertCircle className="inline mr-1" size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-amber-400" size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur("confirmPassword")}
                      placeholder="Confirm Password"
                      className={`w-full pl-12 pr-12 py-4 rounded-xl border ${
                        errors.confirmPassword
                          ? "border-red-300"
                          : "border-gray-200"
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition text-gray-800`}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          className="text-gray-400 hover:text-amber-600"
                          size={20}
                        />
                      ) : (
                        <Eye
                          className="text-gray-400 hover:text-amber-600"
                          size={20}
                        />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm ml-1 mt-1 flex items-center">
                      <AlertCircle className="inline mr-1" size={14} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={() => setAcceptedTerms(!acceptedTerms)}
                      className="rounded text-amber-600 focus:ring-amber-500 border-gray-300 h-5 w-5"
                    />
                    <span className="ml-3 text-gray-600 text-sm">
                      I agree to the{" "}
                      <Link
                        href="/terms-and-conditions"
                        className="text-amber-600 hover:text-amber-800"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-amber-600 hover:text-amber-800"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!formValid || isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition shadow-lg flex items-center justify-center space-x-2 text-lg
                      ${
                        formValid && !isSubmitting
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <span>
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </span>
                  </button>
                </div>

                <div className="text-center text-gray-500 text-sm mt-6">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-amber-600 font-medium hover:text-amber-800"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </>
          )}

          {formStep === 1 && (
            <>
              <div className="flex items-center mb-6">
                <button
                  onClick={goBack}
                  className="text-amber-600 hover:text-amber-800 mr-4"
                >
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h1 className="text-4xl font-extrabold text-amber-800 tracking-wide">
                    Verify Your Account
                  </h1>
                  <p className="text-gray-500 mt-2">
                    Enter the verification code sent to your phone and email
                  </p>
                </div>
              </div>

              {errors.apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    <span>{errors.apiError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissError("apiError")}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="text-amber-600 mr-2" size={20} />
                    <span className="font-medium text-amber-800">
                      Verification Details
                    </span>
                  </div>
                  <p className="text-sm text-amber-700">Phone: {form.phone}</p>
                  <p className="text-sm text-amber-700">Email: {form.email}</p>
                </div>

                {!otpSent ? (
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={otpLoading}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition shadow-lg flex items-center justify-center space-x-2 text-lg
                        ${
                          !otpLoading
                            ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      <span>{otpLoading ? "Sending OTP..." : "Send OTP"}</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={otp}
                          onChange={handleOtpChange}
                          placeholder="Enter 6-digit OTP"
                          className={`w-full px-4 py-4 rounded-xl border ${
                            errors.otp ? "border-red-300" : "border-gray-200"
                          } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 transition text-gray-800 text-center text-2xl tracking-widest`}
                          maxLength={6}
                        />
                      </div>
                      {errors.otp && (
                        <p className="text-red-500 text-sm ml-1 mt-1 flex items-center">
                          <AlertCircle className="inline mr-1" size={14} />
                          {errors.otp}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={verifyOtp}
                        disabled={verifyingOtp || !otp}
                        className={`flex-1 py-4 px-6 rounded-xl font-semibold transition shadow-lg flex items-center justify-center space-x-2 text-lg
                          ${
                            !verifyingOtp && otp
                              ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        <span>
                          {verifyingOtp ? "Verifying..." : "Verify OTP"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={otpLoading}
                        className="px-6 py-4 rounded-xl border border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold transition"
                      >
                        {otpLoading ? "Sending..." : "Resend"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {formStep === 2 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h1 className="text-4xl font-extrabold text-amber-800 tracking-wide">
                Account Created Successfully!
              </h1>
              <p className="text-gray-500 text-lg">
                Your account has been verified and is ready to use.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/buyer/login")}
                  className="w-full py-4 px-6 rounded-xl font-semibold transition shadow-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 text-lg"
                >
                  Continue to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
