"use client";

import { useState, useEffect, use } from "react";
import {
  User,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Shield,
  Plus,
  Trash2,
  Home,
  Building,
  AlertTriangle,
} from "lucide-react";
import { showToast } from "@/utils/showToast";
import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/context/UserContext";
import apiService from "../utils/apiService";
import AddressForm from "@/components/deliveryAdresses/AddressForm";

export default function MyAccountPage() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingAddress, setDeletingAddress] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { userDetails } = useUser();

  useEffect(() => {
    if (userDetails) {
      setUserData(userDetails);
      setEditForm(userDetails);
      fetchAddresses();
    }
  }, [userDetails]);

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

  const handleEditAddress = async (formData) => {
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
  };

  const handleEditSubmit = () => {
    if (!editForm.fullName || !editForm.email) {
      showToast.error("Please fill in required fields");
      return;
    }

    try {
      const res = apiService.put("/user-details", editForm, true);
      setUserData({ ...userData, ...editForm });
      setIsEditing(false);
      showToast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast.error("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast.error("New passwords don't match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showToast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await apiService.put(
        "/change-password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        true
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
      showToast.success("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      const errorMsg =
        error?.response?.data?.error || "Failed to update password";
      showToast.error(errorMsg);
    }
  };

  const handleForgotPassword = async () => {
    setPassLoading(true);
    try {
      await apiService.post("/forgot-password", {}, true);
      showToast.success("Password reset link sent to your email");
    } catch (error) {
      const errorMsg = error?.response?.data?.error || "Something went wrong";
      showToast.error(errorMsg);
    } finally {
      setPassLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your profile and account settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-white">
                      <h2 className="text-2xl font-bold">
                        {userData.fullName || "N/A"}
                      </h2>
                      <p className="text-blue-100">{userData.email || "N/A"}</p>
                      <p className="text-sm text-gray-200">
                        Member since{" "}
                        {userData.createdAt
                          ? new Date(userData.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Profile Information
                    </h3>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Edit3 size={18} />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={editForm.fullName}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                fullName: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-600 transition-all duration-200"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={editForm.email}
                            disabled
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed transition-all duration-200"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={editForm.phone}
                            disabled
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed transition-all duration-200"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div className="flex justify-center space-x-4 pt-6">
                        <button
                          onClick={handleEditSubmit}
                          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Save size={18} />
                          <span>Save Changes</span>
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center space-x-2 px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <X size={18} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <label className="block text-sm font-semibold text-gray-500 mb-1">
                            Full Name
                          </label>
                          <p className="text-gray-900 font-medium text-lg">
                            {userData.fullName || "Not provided"}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <label className="block text-sm font-semibold text-gray-500 mb-1">
                            Email
                          </label>
                          <p className="text-gray-900 font-medium text-lg">
                            {userData.email || "Not provided"}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <label className="block text-sm font-semibold text-gray-500 mb-1">
                            Phone
                          </label>
                          <p className="text-gray-900 font-medium text-lg">
                            {userData.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-gray-500">
                              Addresses
                            </label>
                            <button
                              onClick={() => setShowAddModal(true)}
                              className="bg-amber-600 text-white text-xs px-3 py-2 rounded-md hover:bg-amber-700 flex items-center gap-1 text-sm transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                              Add New
                            </button>
                          </div>
                          <div className="space-y-4">
                            {addresses.length > 0 ? (
                              addresses.map((address, index) => (
                                <div
                                  key={address._id || index}
                                  className="text-gray-900 font-medium space-y-1 border border-gray-400 p-4 rounded-lg bg-amber-50 relative"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        {address.addressLine1
                                          ?.toLowerCase()
                                          .includes("office") ||
                                        address.addressLine1
                                          ?.toLowerCase()
                                          .includes("work") ? (
                                          <Building className="h-4 w-4 text-amber-600" />
                                        ) : (
                                          <Home className="h-4 w-4 text-amber-600" />
                                        )}
                                        <h4 className="font-semibold text-gray-800">
                                          {address.fullName}
                                        </h4>
                                      </div>
                                      <p>{address.addressLine1}</p>
                                      {address.addressLine2 && (
                                        <p>{address.addressLine2}</p>
                                      )}
                                      <p>
                                        {address.city}, {address.state}{" "}
                                        {address.postalCode}
                                      </p>
                                      <p>{address.country}</p>
                                      <p className="text-sm text-gray-600">
                                        {address.phone}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                      <button
                                        onClick={() => openEditModal(address)}
                                        className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-100 rounded-full transition-colors"
                                      >
                                        <Edit3 className="h-4 w-4" />
                                      </button>
                                      <button
                                        onClick={() => openDeleteModal(address)}
                                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">
                                No addresses found
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Security Settings
                  </h3>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Password
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Keep your account secure with a strong password
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="w-full px-4 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Change Password
                  </button>

                  {showPasswordForm && (
                    <div className="space-y-4 mt-6 pt-6 border-t border-blue-200">
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordForm.currentPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-600 transition-all duration-200"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                        <div className="mt-2 text-right">
                          <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-blue-500 hover:underline"
                          >
                            {passLoading
                              ? "Sending reset link..."
                              : "Forgot Password?"}
                          </button>
                        </div>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-600 transition-all duration-200"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm({
                              ...passwordForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-600 transition-all duration-200"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <div className="flex flex-col space-y-3 pt-4">
                        <button
                          onClick={handlePasswordSubmit}
                          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordForm({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            });
                          }}
                          className="w-full px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

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
            initialData={editingAddress}
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
    </MainLayout>
  );
}
