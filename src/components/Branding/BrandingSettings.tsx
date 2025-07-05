import React, { useState } from 'react';
import { Palette, Upload, Eye, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BrandingSettings: React.FC = () => {
  const { organization } = useAuth();
  const [primaryColor, setPrimaryColor] = useState(organization?.primaryColor || '#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState(organization?.secondaryColor || '#3B82F6');
  const [logoUrl, setLogoUrl] = useState('');
  const [customDomain, setCustomDomain] = useState('');

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving branding settings:', {
      primaryColor,
      secondaryColor,
      logoUrl,
      customDomain
    });
  };

  const colorPresets = [
    { name: 'Default Purple', primary: '#8B5CF6', secondary: '#3B82F6' },
    { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#06B6D4' },
    { name: 'Forest Green', primary: '#059669', secondary: '#10B981' },
    { name: 'Sunset Orange', primary: '#EA580C', secondary: '#F97316' },
    { name: 'Rose Pink', primary: '#E11D48', secondary: '#F43F5E' },
    { name: 'Royal Purple', primary: '#7C3AED', secondary: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Branding Settings</h1>
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Color Customization */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Color Scheme
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 rounded-md border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 rounded-md border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Presets
              </label>
              <div className="grid grid-cols-2 gap-3">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPrimaryColor(preset.primary);
                      setSecondaryColor(preset.secondary);
                    }}
                    className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-sm text-gray-700">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Logo & Assets
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Drop your logo here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, SVG up to 2MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setLogoUrl(url);
                    }
                  }}
                />
              </div>
            </div>

            {logoUrl && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview
                </label>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <img 
                    src={logoUrl} 
                    alt="Logo Preview" 
                    className="h-16 w-auto mx-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Domain */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Custom Domain
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Name
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your-domain.com"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Verify
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Available for Premium and Enterprise plans
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Preview
        </h3>
        
        <div className="border border-gray-200 rounded-lg p-6" style={{ 
          background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)` 
        }}>
          <div className="flex items-center space-x-4 mb-6">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <span className="text-white font-bold">
                {organization?.name?.charAt(0) || 'O'}
              </span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">
                {organization?.name || 'Your Organization'}
              </h4>
              <p className="text-gray-600">Event Management Platform</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <button 
              className="w-full py-2 px-4 rounded-md text-white font-medium"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Button
            </button>
            <button 
              className="w-full py-2 px-4 rounded-md text-white font-medium"
              style={{ backgroundColor: secondaryColor }}
            >
              Secondary Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;