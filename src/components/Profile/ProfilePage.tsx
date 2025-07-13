import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building, Camera, Save, Edit3 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hook';
import { updateUser, getUserById } from '../../features/authSlice';
import { RootState } from '../../app/store';

interface ProfileData {
  fullName: string;
  email: string;
  orgName: string;
  profilePhoto: string;
}

const ProfilePage: React.FC = () => {
  // Get user from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  // Use user data for initial profile
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: user?.name || '',
    email: user?.email || '',
    orgName: user?.orgName || '',
    profilePhoto: user?.profilePhoto || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(profileData);

  // Update profileData when user changes (e.g. after login or update)
  useEffect(() => {
    if (user) {
      const newProfileData = {
        fullName: user.name || '',
        email: user.email || '',
        orgName: user.orgName || '',
        profilePhoto: user.profilePhoto || ''
      };
      setProfileData(newProfileData);
      setFormData(newProfileData);
    }
  }, [user]);

  // Image compression function
  const compressImage = (file: File, maxWidth: number = 400, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        const aspectRatio = img.width / img.height;
        let newWidth = maxWidth;
        let newHeight = maxWidth / aspectRatio;
        
        if (newHeight > maxWidth) {
          newHeight = maxWidth;
          newWidth = maxWidth * aspectRatio;
        }
        
        // Set canvas size
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        resolve(compressedDataUrl);
      };
      
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB before compression)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      try {
        // Compress the image
        const compressedImage = await compressImage(file, 400, 0.8);
        
        // Check compressed size (should be much smaller now)
        const compressedSize = compressedImage.length * 0.75; // Approximate size
        console.log('Compressed image size:', Math.round(compressedSize / 1024), 'KB');
        
        setFormData(prev => ({
          ...prev,
          profilePhoto: compressedImage
        }));
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        alert('Full name is required');
        return;
      }
      
      if (!formData.email.trim()) {
        alert('Email is required');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Update backend with all the form data
      if (user) {
        const updatePayload = {
          id: user.id,
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          orgName: formData.orgName.trim(),
          profilePhoto: formData.profilePhoto
        };
        
        console.log('Updating user with payload:', {
          ...updatePayload,
          profilePhoto: updatePayload.profilePhoto ? `[Image Data - ${Math.round(updatePayload.profilePhoto.length / 1024)}KB]` : 'No image'
        });
        
        // Update user data in backend
        const updateResult = await dispatch(updateUser(updatePayload));
        
        if (updateResult.meta.requestStatus === 'fulfilled') {
          // Update local profile data
          setProfileData(formData);
          setIsEditing(false);
          
          // Force navbar to update by dispatching a custom event
          window.dispatchEvent(new Event('profilePhotoChanged'));
          
          console.log('Profile updated successfully');
          alert('Profile updated successfully!');
        } else {
          console.error('Failed to update profile:', updateResult.payload);
          alert(`Failed to update profile: ${updateResult.payload || 'Unknown error'}`);
        }
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('An error occurred while updating profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'UN';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state
  if (loading && !user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  {getInitials(profileData.fullName)}
                </div>
              )}
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-400 transition-colors">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profileData.fullName || 'User'}</h1>
              <p className="text-blue-100">{profileData.email}</p>
              {profileData.orgName && (
                <p className="text-blue-200 text-sm">{profileData.orgName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <button
              onClick={() => {
                if (isEditing) {
                  handleCancel();
                } else {
                  setIsEditing(true);
                }
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <Edit3 size={16} />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{profileData.fullName || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{profileData.email || 'Not specified'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Building className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Organization</p>
                  <p className="font-medium">{profileData.orgName || 'Not specified'}</p>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization (optional)
                </label>
                <input
                  type="text"
                  value={formData.orgName}
                  onChange={(e) => handleInputChange('orgName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your organization"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  <Save size={16} />
                  <span>{loading ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;