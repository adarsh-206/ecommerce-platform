"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, UserPlus, Check, ChevronDown } from "lucide-react";
import categories from "@/constants/categories";
import apiService from "@/app/utils/apiService";
import { useRouter } from "next/navigation";

export default function SellerRegister() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    storeName: "",
    selectedCategories: [],
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    router.replace("/seller");
  }, [router]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const toggleCategory = (category) => {
    setFormData((prev) => {
      const selected = prev.selectedCategories.includes(category.id)
        ? prev.selectedCategories.filter((c) => c !== category.id)
        : [...prev.selectedCategories, category.id];
      return { ...prev, selectedCategories: selected };
    });
    setErrors((e) => ({ ...e, selectedCategories: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = "First name is required";
    if (!formData.lastName) errs.lastName = "Last name is required";
    if (!formData.email) errs.email = "Email is required";
    if (!formData.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Enter a valid 10-digit Indian mobile";
    if (!formData.storeName) errs.storeName = "Store name is required";
    if (formData.selectedCategories.length === 0)
      errs.selectedCategories = "Select at least one category";
    if (formData.password.length < 8) errs.password = "Min. 8 characters";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const sellerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      storeName: formData.storeName,
      productCategories: formData.selectedCategories.map((cat) =>
        typeof cat === "object" ? cat.id : cat
      ),
      password: formData.password,
      role: "seller",
    };

    apiService
      .post("/register", sellerData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        router.push("/seller/dashboard");
      })
      .catch((error) => {
        setApiError(error.response.data.error || "Something went wrong!");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-amber-600">Chaka-Chak</span>
          </div>
        </Link>

        <div className="mt-6 flex flex-col overflow-hidden rounded-xl bg-white shadow-xl lg:flex-row">
          <div className="hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 px-6 py-8 text-white lg:flex lg:w-2/5 lg:flex-col lg:justify-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold">Start Selling</h2>
              <p className="mt-2 text-amber-100">
                Launch your store in minutes and reach customers across India.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Guided store setup",
                  "Order & inventory tools",
                  "Fast, transparent payouts",
                ].map((line) => (
                  <div key={line} className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="ml-3 text-white text-sm">{line}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <img
                  src="/seller/seller_register.svg"
                  alt="Happy Sellers"
                  className="mx-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center px-6 py-8 lg:w-3/5">
            <div className="w-full max-w-2xl">
              <div className="text-center">
                <h1 className="text-xl font-bold text-amber-700">
                  Create Seller Account
                </h1>
                <p className="mt-1 text-sm text-orange-600">
                  Fill in the details below to register as a seller
                </p>
              </div>

              <form
                className="mt-6 space-y-6 p-3"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {[
                    {
                      id: "firstName",
                      label: "First Name",
                      type: "text",
                      placeholder: "Rajesh",
                    },
                    {
                      id: "lastName",
                      label: "Last Name",
                      type: "text",
                      placeholder: "Sharma",
                    },
                    {
                      id: "email",
                      label: "Email Address",
                      type: "email",
                      placeholder: "you@example.com",
                    },
                    {
                      id: "phone",
                      label: "Phone Number",
                      type: "tel",
                      placeholder: "9876543210",
                    },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="block text-sm font-semibold text-gray-700"
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        id={id}
                        name={id}
                        value={formData[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`mt-1 w-full rounded-xl border bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 transition-shadow duration-150 focus:border-amber-500 focus:bg-white focus:shadow-lg focus:outline-none ${
                          errors[id]
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors[id] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[id]}
                        </p>
                      )}
                      {id === "phone" && (
                        <p className="mt-0.5 text-xs text-gray-500">
                          10-digit Indian mobile number
                        </p>
                      )}
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="storeName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="Your Amazing Store"
                      className={`mt-1 w-full rounded-xl border bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 transition-shadow duration-150 focus:border-amber-500 focus:bg-white focus:shadow-lg focus:outline-none ${
                        errors.storeName
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.storeName && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.storeName}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 relative" ref={dropdownRef}>
                    <label className="block text-sm font-semibold text-gray-700">
                      Product Categories
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryDropdown((v) => !v)}
                      className={`mt-1 flex w-full items-center justify-between rounded-xl border bg-gray-50 px-4 py-2 text-gray-800 transition-shadow duration-150 focus:outline-none focus:border-amber-500 focus:shadow-lg ${
                        errors.selectedCategories
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <span>
                        {formData.selectedCategories.length
                          ? `${formData.selectedCategories.length} selected`
                          : "Select categories"}
                      </span>
                      <ChevronDown size={18} />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5">
                        {categories.map((cat, i) => (
                          <div
                            key={i}
                            onClick={() => toggleCategory(cat)}
                            className={`flex cursor-pointer items-center px-4 py-2 text-sm transition-colors duration-100 hover:bg-amber-50 ${
                              formData.selectedCategories.includes(cat)
                                ? "bg-amber-100 text-amber-700"
                                : "text-gray-800"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.selectedCategories.includes(
                                cat
                              )}
                              readOnly
                              className="h-5 w-5 rounded border-gray-300 text-amber-600"
                            />
                            <span className="ml-3">{cat.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.selectedCategories && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.selectedCategories}
                      </p>
                    )}
                  </div>

                  {["password", "confirmPassword"].map((id) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="block text-sm font-semibold text-gray-700"
                      >
                        {id === "password" ? "Password" : "Confirm Password"}
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          id={id}
                          name={id}
                          value={formData[id]}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className={`w-full rounded-xl border bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 transition-shadow duration-150 focus:border-amber-500 focus:bg-white focus:shadow-lg focus:outline-none ${
                            errors[id]
                              ? "border-red-500 focus:border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {id === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        )}
                      </div>
                      {id === "password" && (
                        <p className="mt-1 text-xs text-gray-500">
                          Min. 8 chars with letters & numbers
                        </p>
                      )}
                      {errors[id] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[id]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                  <UserPlus size={20} className="mr-2" />
                  Create Seller Account
                </button>
              </form>

              <div className="mt-2 text-center">
                <p className="text-xs text-gray-600">
                  Already have a seller account?{" "}
                  <Link href="/seller/login">
                    <span className="font-medium text-amber-600 hover:text-orange-600 cursor-pointer">
                      Login instead
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
