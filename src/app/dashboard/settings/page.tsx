'use client';

import { useState } from 'react';
import { 
  User, Mail, Lock, Bell, CreditCard, Users, Shield, 
  Globe, Palette, Database, Download, Upload, Trash2,
  Settings, Eye, EyeOff, Save, Edit2, Camera, Plus,
  Check, X, Crown, Zap
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: false,
    mobile: true,
    marketing: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'data', label: 'Data Management', icon: Database }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      current: true,
      features: ['5 Dashboards', '10 Data Sources', '1GB Storage', 'Basic Support']
    },
    {
      name: 'Pro',
      price: '$29',
      current: false,
      popular: true,
      features: ['Unlimited Dashboards', '100 Data Sources', '50GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Themes']
    },
    {
      name: 'Enterprise',
      price: '$99',
      current: false,
      features: ['Everything in Pro', 'Unlimited Storage', 'SSO Integration', 'API Access', 'White-label', '24/7 Support']
    }
  ];

  const ProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              U
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              Upload Photo
            </button>
            <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="User Name"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="user@example.com"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="+84 123 456 789"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input
              type="text"
              placeholder="Your company"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const AccountTab = () => (
    <div className="space-y-8">
      {/* Password */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2.5 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Add an extra layer of security to your account</p>
            <p className="text-sm text-gray-500 mt-1">Requires verification codes from your phone</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-6">Notification Preferences</h3>
      <div className="space-y-6">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800 capitalize">{key} Notifications</h4>
              <p className="text-sm text-gray-500">
                Receive notifications via {key === 'marketing' ? 'marketing emails' : key}
              </p>
            </div>
            <button
              onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const BillingTab = () => (
    <div className="space-y-8">
      {/* Current Plan */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Current Plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-bold text-gray-800">Free Plan</h4>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Current</span>
            </div>
            <p className="text-gray-600">5 dashboards • 10 data sources • 1GB storage</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Available Plans</h3>
        <div className="grid grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl border-2 ${
                plan.current ? 'border-blue-200 bg-blue-50' : 
                plan.popular ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h4 className="text-lg font-bold text-gray-800">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-6 px-4 py-2 rounded-xl transition-colors ${
                  plan.current ? 'bg-gray-100 text-gray-500 cursor-not-allowed' :
                  plan.popular ? 'bg-purple-600 text-white hover:bg-purple-700' :
                  'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TeamTab = () => (
    <div className="space-y-8">
      {/* Team Members */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-800">Team Members</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Invite Member
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                U
              </div>
              <div>
                <h4 className="font-medium text-gray-800">User (You)</h4>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">Owner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-8">
      {/* Theme */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>English</option>
              <option>Tiếng Việt</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const DataTab = () => (
    <div className="space-y-8">
      {/* Data Export */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Data Export</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export All Dashboards
          </button>
          <button className="w-full flex items-center justify-center gap-2 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export Data Sources
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white p-6 rounded-2xl border border-red-200">
        <h3 className="text-lg font-medium text-red-600 mb-6">Danger Zone</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 p-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'account': return <AccountTab />;
      case 'notifications': return <NotificationsTab />;
      case 'billing': return <BillingTab />;
      case 'team': return <TeamTab />;
      case 'preferences': return <PreferencesTab />;
      case 'data': return <DataTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Settings Navigation */}
        <div className="bg-white rounded-2xl border border-gray-200 mb-6">
          <div className="p-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}