import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface AuthScreenProps {
  onAuth: (registerNumber: string) => void;
  error?: string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuth, error }) => {
  const [registerNumber, setRegisterNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(registerNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Mockello Feedback</h1>
        <p className="text-gray-600 text-center mb-8">Enter your register number to access feedback</p>
        
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Enter your register number..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Access Feedback
          </button>
        </form>
      </div>
    </div>
  );
};