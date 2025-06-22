"use client";

import { useState, useEffect } from "react";
import { fetchStateCityData } from "@/utils/fetchStateCityData";

const AddressForm = ({
  onSubmit,
  isEditing = false,
  initialData = null,
  closeModals,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    phone: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadStates = async () => {
      const data = await fetchStateCityData(
        "/common/get-city-pincodes?type=states"
      );
      if (Array.isArray(data?.data)) setStates(data.data);
    };
    loadStates();
  }, []);

  useEffect(() => {
    if (isEditing && initialData) {
      // Step 1: Initialize form data (without worrying if city/pincode exists in dropdown yet)
      setFormData({
        fullName: initialData.fullName || "",
        addressLine1: initialData.addressLine1 || "",
        addressLine2: initialData.addressLine2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "India",
        postalCode: initialData.postalCode || "",
        phone: initialData.phone || "",
      });

      // Step 2: Fetch cities based on state
      if (initialData.state) {
        fetchStateCityData(
          `/common/get-city-pincodes?type=cities&state=${initialData.state}`
        ).then((res) => {
          if (Array.isArray(res?.data)) {
            setCities(res.data);

            // Step 3: Ensure selected city exists
            if (!res.data.includes(initialData.city)) {
              setFormData((prev) => ({ ...prev, city: "" }));
            }
          }
        });
      }

      // Step 4: Fetch pincodes based on city
      if (initialData.city) {
        fetchStateCityData(
          `/common/get-city-pincodes?type=pincodes&city=${initialData.city}`
        ).then((res) => {
          if (Array.isArray(res?.data)) {
            setPincodes(res.data);

            // Step 5: Ensure selected pin exists
            if (!res.data.includes(initialData.postalCode)) {
              setFormData((prev) => ({ ...prev, postalCode: "" }));
            }
          }
        });
      }
    }
  }, [isEditing, initialData]);

  useEffect(() => {
    if (
      isEditing &&
      initialData?.city &&
      cities.length > 0 &&
      cities.includes(initialData.city)
    ) {
      setFormData((prev) => ({ ...prev, city: initialData.city }));
    }
  }, [cities]);

  useEffect(() => {
    if (
      isEditing &&
      initialData?.postalCode &&
      pincodes.length > 0 &&
      pincodes.map(String).includes(String(initialData.postalCode))
    ) {
      setFormData((prev) => ({ ...prev, postalCode: initialData.postalCode }));
    }
  }, [pincodes]);

  useEffect(() => {
    if (!formData.state) return;

    const loadCities = async () => {
      const data = await fetchStateCityData(
        `/common/get-city-pincodes?type=cities&state=${formData.state}`
      );
      if (Array.isArray(data?.data)) setCities(data.data);
    };

    setCities([]);
    setPincodes([]);
    setFormData((prev) => ({ ...prev, city: "", postalCode: "" }));
    loadCities();
  }, [formData.state]);

  useEffect(() => {
    if (!formData.city) return;

    const loadPincodes = async () => {
      const data = await fetchStateCityData(
        `/common/get-city-pincodes?type=pincodes&city=${formData.city}`
      );
      if (Array.isArray(data?.data)) setPincodes(data.data);
    };

    setPincodes([]);
    setFormData((prev) => ({ ...prev, postalCode: "" }));
    loadPincodes();
  }, [formData.city]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
      if (closeModals) closeModals();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1 *
        </label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleInputChange}
          required
          className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 2
        </label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleInputChange}
          className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country *
        </label>
        <input
          type="text"
          name="country"
          value="India"
          readOnly
          disabled
          className="w-full bg-gray-100 text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:outline-none cursor-not-allowed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            disabled={cities.length === 0}
            className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code *
          </label>
          <select
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
            disabled={pincodes.length === 0}
            className="w-full text-gray-600 px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:outline-none"
          >
            <option value="">Select PIN</option>
            {pincodes.map((pin) => (
              <option key={pin} value={pin}>
                {pin}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : isEditing
            ? "Update Address"
            : "Add Address"}
        </button>
        <button
          type="button"
          onClick={closeModals}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
