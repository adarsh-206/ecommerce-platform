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
} from "lucide-react";
import Link from "next/link";
import apiService from "@/app/utils/apiService";

export default function BuyerRegistration() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

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
    apiError: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "text-gray-400",
  });

  useEffect(() => {
    validateForm();
  }, [form, acceptedTerms]);

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

    // For form button state, check if all fields are filled and valid, regardless of touched state
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

    // Mark field as touched when user changes it
    if (!touchedFields[name]) {
      setTouchedFields({ ...touchedFields, [name]: true });
    }
  };

  const handleBlur = (field) => {
    if (!touchedFields[field]) {
      setTouchedFields({ ...touchedFields, [field]: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched when submitting
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    // Run validation one more time
    validateForm();

    if (!formValid) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, apiError: "" }));

    try {
      // Only send required fields to backend
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

      if (error.response) {
        if (error.response.status === 409) {
          errorMessage = "Email or phone number already registered";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      setErrors((prev) => ({ ...prev, apiError: errorMessage }));
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
        <div className="hidden md:flex flex-col items-start justify-center p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white space-y-8 h-full">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight px-4 py-2 rounded-lg"
            >
              Chaka-Chak
            </Link>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold tracking-tight">
              Join Our Exclusive Buyers Club
            </h2>
            <p className="text-lg leading-relaxed opacity-90">
              Unlock premium deals, personalized recommendations, and a seamless
              shopping experience designed just for you.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-indigo-200" size={24} />
                <span className="text-lg">Access to exclusive deals</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-indigo-200" size={24} />
                <span className="text-lg">Priority customer support</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-indigo-200" size={24} />
                <span className="text-lg">Free shipping on premium items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-r-3xl">
          {formStep === 0 ? (
            <>
              <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-wide">
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="text-indigo-400" size={20} />
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
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition text-gray-800`}
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
                      <Mail className="text-indigo-400" size={20} />
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
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition text-gray-800`}
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
                      <Phone className="text-indigo-400" size={20} />
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
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition text-gray-800`}
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
                      <Lock className="text-indigo-400" size={20} />
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
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition text-gray-800`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff
                          className="text-gray-400 hover:text-indigo-600"
                          size={20}
                        />
                      ) : (
                        <Eye
                          className="text-gray-400 hover:text-indigo-600"
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
                      <Lock className="text-indigo-400" size={20} />
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
                      } placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition text-gray-800`}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          className="text-gray-400 hover:text-indigo-600"
                          size={20}
                        />
                      ) : (
                        <Eye
                          className="text-gray-400 hover:text-indigo-600"
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
                      className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 h-5 w-5"
                    />
                    <span className="ml-3 text-gray-600 text-sm">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!formValid || isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition shadow-lg flex items-center justify-center space-x-2 text-lg
                      ${
                        formValid && !isSubmitting
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
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
                  <Link
                    href="/buyer/login"
                    className="text-indigo-600 font-medium hover:text-indigo-800"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
              <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600" size={60} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                Registration Successful!
              </h2>
              <p className="text-lg text-gray-600 max-w-md">
                Welcome to our buyers community! Your account has been created
                successfully.
              </p>
              <Link href="/buyer/dashboard">
                <button className="mt-6 bg-indigo-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
