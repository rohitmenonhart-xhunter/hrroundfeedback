import React, { useState } from 'react';
import { db } from './firebase';
import { ref, get } from 'firebase/database';
import { FeedbackEntry } from './types';
import { FeedbackCard } from './components/FeedbackCard';
import { AuthScreen } from './components/AuthScreen';
import { Loader2 } from 'lucide-react';

function App() {
  const [userFeedback, setUserFeedback] = useState<FeedbackEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string>();

  const handleAuth = async (registerNumber: string) => {
    setLoading(true);
    try {
      const feedbackRef = ref(db, `interview_feedback/${registerNumber}`);
      const snapshot = await get(feedbackRef);
      if (snapshot.exists()) {
        setUserFeedback(snapshot.val() as FeedbackEntry);
        setIsAuthenticated(true);
        setAuthError(undefined);
      } else {
        setAuthError('Register number not found. Please check and try again.');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setAuthError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuth={handleAuth} error={authError} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Mockello Feedback</h1>
          <p className="text-blue-100">Your Interview Performance Report</p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : userFeedback ? (
          <FeedbackCard feedback={userFeedback} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No feedback found</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;