// Updated DeliveryAddresses.js
"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Edit3,
  Plus,
  X,
  Trash2,
  Home,
  Building,
  AlertTriangle,
} from "lucide-react";
import apiService from "@/app/utils/apiService";
import AddressForm from "./AddressForm";
import { showToast } from "@/utils/showToast";

export default function DeliveryAddresses({
  selectedAddress,
  onAddressSelect,
}) {
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Set first address as selected when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      onAddressSelect(addresses[0]);
    }
  }, [addresses, selectedAddress, onAddressSelect]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/delivery-address/", {}, true);

      if (response.status) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      showToast.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      phone: "",
    });
  };

  const handleAddAddress = async (formData) => {
    if (
      !formData.fullName ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.phone ||
      !formData.country
    ) {
      showToast.error("Please fill all required fields");
      return;
    }
    try {
      setSubmitting(true);
      const response = await apiService.post(
        "/delivery-address/",
        formData,
        true
      );
      if (
        response.success ||
        response.status === 200 ||
        response.status === 201
      ) {
        showToast.success("Address added successfully!");
        await fetchAddresses();
        setShowAddModal(false);
        resetForm();
      } else {
        showToast.error("Failed to add address. Please try again.");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      showToast.error("Failed to add address. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditAddress = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.addressLine1 ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode ||
      !formData.phone ||
      !formData.country
    ) {
      showToast.error("Please fill all required fields");
      return;
    }
    try {
      setSubmitting(true);
      const response = await apiService.put(
        `/delivery-address/${editingAddress._id}`,
        formData,
        true
      );
      if (response.success || response.status === 200) {
        showToast.success("Address updated successfully!");
        await fetchAddresses();
        setShowEditModal(false);
        setEditingAddress(null);
        resetForm();
      } else {
        showToast.error("Failed to update address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      showToast.error("Failed to update address. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (!deletingAddress) return;

    try {
      setSubmitting(true);
      const response = await apiService.delete(
        `/delivery-address/${deletingAddress._id}`,
        {},
        true
      );
      if (response.success || response.status === 200) {
        showToast.success("Address deleted successfully!");
        await fetchAddresses();

        // If deleted address was selected, select first remaining address
        if (selectedAddress === deletingAddress._id) {
          const remainingAddresses = addresses.filter(
            (addr) => addr._id !== deletingAddress._id
          );
          if (remainingAddresses.length > 0) {
            onAddressSelect(remainingAddresses[0]);
          } else {
            onAddressSelect(null);
          }
        }

        setShowDeleteModal(false);
        setDeletingAddress(null);
      } else {
        showToast.error("Failed to delete address. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      showToast.error("Failed to delete address. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (address) => {
    setEditingAddress(address);
    setFormData({
      fullName: address.fullName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postalCode,
      phone: address.phone,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (address) => {
    setDeletingAddress(address);
    setShowDeleteModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setEditingAddress(null);
    setDeletingAddress(null);
    resetForm();
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-800/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, address }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Address
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            {address && (
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{address.fullName}</p>
                <p className="text-sm text-gray-600">{address.addressLine1}</p>
                <p className="text-sm text-gray-600">
                  {address.city}, {address.state} - {address.postalCode}
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-amber-800 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Delivery Addresses
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 flex items-center gap-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No delivery addresses found</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div
              key={address._id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedAddress?._id === address?._id
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-amber-300"
              }`}
              onClick={() => onAddressSelect(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="radio"
                    checked={selectedAddress?._id === address?._id}
                    onChange={() => onAddressSelect(address)}
                    className="mt-1 text-amber-600 focus:ring-amber-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {address.addressLine1
                          ?.toLowerCase()
                          .includes("office") ||
                        address.addressLine1?.toLowerCase().includes("work") ? (
                          <Building className="h-4 w-4 text-amber-600" />
                        ) : (
                          <Home className="h-4 w-4 text-amber-600" />
                        )}
                        <h3 className="font-semibold text-gray-800">
                          {address.fullName}
                        </h3>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>
                        {address.city}, {address.state} - {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="font-medium text-gray-700">
                        {address.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(address);
                    }}
                    className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-full transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(address);
                    }}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={closeModals}
        title="Add New Delivery Address"
      >
        <AddressForm onSubmit={handleAddAddress} closeModals={closeModals} />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={closeModals}
        title="Edit Delivery Address"
      >
        <AddressForm
          onSubmit={handleEditAddress}
          isEditing={true}
          closeModals={closeModals}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeModals}
        onConfirm={handleDeleteAddress}
        address={deletingAddress}
      />
    </div>
  );
}
