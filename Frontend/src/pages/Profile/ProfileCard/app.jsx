import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, UserCircle, Edit2, Save, X, Camera, Star, Clock, CreditCard } from "lucide-react";
import "../ProfileCard/app.css";

const ProfileCard = () => {
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulate API call with mock data for food delivery profile
    const simulateAPICall = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProfile = {
          fullName: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "+1 (555) 987-6543",
          address: "456 Oak Avenue, Apt 3B, Los Angeles, CA 90210",
          profileImage: null,
          memberSince: "January 2023",
          totalOrders: 127,
          favoriteRestaurant: "Italiano Bistro",
          dietaryPreferences: "Vegetarian",
          deliveryInstructions: "Leave at door, ring bell twice"
        };
        
        setProfile(mockProfile);
        setEditProfile(mockProfile);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    simulateAPICall();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API save
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProfile({ ...editProfile });
      setIsEditing(false);
      setSaving(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <span className="loading-text">Loading your profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <UserCircle className="error-icon" />
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="container-main-card-profile">
    <div className="profile-card-container">
      {/* Header with gradient */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="Profile" />
            ) : (
              <User className="user-icon" />
            )}
            {isEditing && (
              <button className="camera-button">
                <Camera className="camera-icon" />
              </button>
            )}
          </div>
          <h2 className="profile-name">
            {profile.fullName || 'Food Lover'}
          </h2>
          <p className="profile-member-since">Member since {profile.memberSince}</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <Star className="icon" />
              <span className="text">{profile.totalOrders} Orders</span>
            </div>
            <div className="profile-stat">
              <Clock className="icon" />
              <span className="text">Active User</span>
            </div>
          </div>
        </div>
        
        {/* Edit/Save buttons */}
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={handleEdit} className="profile-btn">
              <Edit2 className="icon" />
              <span className="text">Edit</span>
            </button>
          ) : (
            <div className="btn-group">
              <button onClick={handleCancel} className="profile-btn">
                <X className="icon" />
                <span className="text">Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="profile-btn"
              >
                {saving ? (
                  <div className="spinner"></div>
                ) : (
                  <Save className="icon" />
                )}
                <span className="text">{saving ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="section-header">
            <User className="icon" />
            Personal Information
          </h3>

      {/* Profile Details */}
      <div className="profile-content">
        {/* Personal Information Section */}
        <div className="profile-section">
          <div className="profile-car">
          {/* Name */}
          <div className="profile-field">
            <div className="field-icon-container">
              <User className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Full Name</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="field-input"
                />
              ) : (
                <p className="field-value">
                  {profile.fullName || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="profile-field">
            <div className="field-icon-container">
              <Mail className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Email Address</p>
              {isEditing ? (
                <input
                  type="email"
                  value={editProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="field-input"
                />
              ) : (
                <p className="field-value">
                  {profile.email || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="profile-field">
            <div className="field-icon-container">
              <Phone className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Phone Number</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={editProfile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="field-input"
                />
              ) : (
                <p className="field-value">
                  {profile.phone || 'Not provided'}
                </p>
              )}
            </div>
          </div>
        </div>
               </div>


                         <h3 className="section-header">
            <MapPin className="icon" />
            Delivery Information
          </h3>
        {/* Delivery Information Section */}
        <div className="profile-section">
            <div className="profile-car">
          {/* Address */}
          <div className="profile-field">
            <div className="field-icon-container">
              <MapPin className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Delivery Address</p>
              {isEditing ? (
                <textarea
                  value={editProfile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                  className="field-textarea"
                />
              ) : (
                <p className="field-value">
                  {profile.address || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {/* Delivery Instructions */}
          <div className="profile-field">
            <div className="field-icon-container">
              <Clock className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Delivery Instructions</p>
              {isEditing ? (
                <textarea
                  value={editProfile.deliveryInstructions}
                  onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                  rows={2}
                  placeholder="Special delivery instructions..."
                  className="field-textarea"
                />
              ) : (
                <p className="field-value">
                  {profile.deliveryInstructions || 'No special instructions'}
                </p>
              )}
            </div>
          </div>
          </div>
        </div>

                  <h3 className="section-header">
            <Star className="icon" />
            Food Preferences
          </h3>
          
        {/* Food Preferences Section */}
        <div className="profile-section">
                <div className="profile-car">
          {/* Dietary Preferences */}
          <div className="profile-field">
            <div className="field-icon-container">
              <Star className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Dietary Preferences</p>
              {isEditing ? (
                <select
                  value={editProfile.dietaryPreferences}
                  onChange={(e) => handleInputChange('dietaryPreferences', e.target.value)}
                  className="field-select"
                >
                  <option value="">No preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-free">Gluten-free</option>
                  <option value="Keto">Keto</option>
                  <option value="Halal">Halal</option>
                </select>
              ) : (
                <p className="field-value">
                  {profile.dietaryPreferences || 'No preference'}
                </p>
              )}
            </div>
          </div>

          {/* Favorite Restaurant */}
          <div className="profile-field">
            <div className="field-icon-container">
              <CreditCard className="field-icon" />
            </div>
            <div className="field-content">
              <p className="field-label">Favorite Restaurant</p>
              {isEditing ? (
                <input
                  type="text"
                  value={editProfile.favoriteRestaurant}
                  onChange={(e) => handleInputChange('favoriteRestaurant', e.target.value)}
                  className="field-input"
                />
              ) : (
                <p className="field-value">
                  {profile.favoriteRestaurant || 'Not specified'}
                </p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="profile-footer">
        <div className="footer-left">
          <span className="footer-status">Profile Status</span>
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">Active Member</span>
          </div>
        </div>
        <div className="footer-updated">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
     </div>
  );
};



export default ProfileCard;