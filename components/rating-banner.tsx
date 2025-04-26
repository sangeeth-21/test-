import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

const EventInterestAndRating = () => {
  const [showInterest, setShowInterest] = useState(true);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const getEmoji = (rating: number) => {
    if (rating >= 4.5) return "😄";
    if (rating >= 4) return "😊";
    if (rating >= 3) return "🙂";
    if (rating >= 2) return "😐";
    return "😔";
  };

  const handleInterestResponse = (interested: boolean) => {
    setShowInterest(false);
    if (interested) {
      setShowRating(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {showInterest ? (
        <div className="relative py-2 px-4 bg-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
                <div className="w-8 h-8 rounded-full bg-gray-400" />
                <div className="w-8 h-8 rounded-full bg-gray-500" />
              </div>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">735+ people</span> are interested in this event, How about you?
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleInterestResponse(true)}
                className="text-sm text-blue-500 hover:bg-blue-50 px-3 py-1 rounded-full transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => handleInterestResponse(false)}
                className="text-sm text-gray-500 hover:bg-gray-50 px-3 py-1 rounded-full transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : showRating ? (
        <div className="relative w-full py-2 px-2 sm:py-3 sm:px-3 bg-gray-100 rounded-lg shadow-sm">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
              <div className="text-3xl sm:text-4xl">{getEmoji(rating)}</div>
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transition-colors ${
                        star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingClick(star)}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Event Rating: {rating.toFixed(1)} out of 5
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Share your thoughts and help others discover this event!
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventInterestAndRating;