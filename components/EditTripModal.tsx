import React, { useState } from 'react';
import { Trip, Child, TripType } from '../types';

interface EditTripModalProps {
  trip: Trip;
  child: Child;
  onSave: (updatedData: Partial<Omit<Trip, 'id' | 'childId'>>) => void;
  onDelete: (tripId: string) => void;
  onClose: () => void;
}

// Helper to format date from ISO to 'yyyy-MM-ddTHH:mm' for datetime-local input
const formatDateTimeForInput = (isoDate: string) => {
  const date = new Date(isoDate);
  // Adjust for timezone offset
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate.toISOString().slice(0, 16);
};

const EditTripModal: React.FC<EditTripModalProps> = ({ trip, child, onSave, onDelete, onClose }) => {
  const [tripType, setTripType] = useState<TripType>(trip.type);
  const [dateTime, setDateTime] = useState(formatDateTimeForInput(trip.dateTime));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      type: tripType,
      dateTime: new Date(dateTime).toISOString(),
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this trip for ${child.name}?`)) {
      onDelete(trip.id);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Edit Trip for {child.name}</h2>
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value={TripType.DROP_OFF}
                    checked={tripType === TripType.DROP_OFF}
                    onChange={() => setTripType(TripType.DROP_OFF)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Drop-off</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value={TripType.PICK_UP}
                    checked={tripType === TripType.PICK_UP}
                    onChange={() => setTripType(TripType.PICK_UP)}
                    className="h-4 w-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-700">Pick-up</span>
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">Date & Time</label>
              <input
                id="dateTime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                required
              />
            </div>
          </div>
          <div className="p-5 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mr-auto"
            >
              Delete Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTripModal;
