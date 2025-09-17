import React, { useEffect, useState } from 'react';
import { Trip, Member, Child, TripStatus, TripType } from '../types';
import MemberAvatar from './MemberAvatar';

interface ActivePickupNotificationProps {
  trips: Trip[];
  members: Member[];
  children: Child[];
  currentUser: Member;
  onTakePickup: (tripId: string) => void;
}

const ActivePickupNotification: React.FC<ActivePickupNotificationProps> = ({
  trips,
  members,
  children,
  currentUser,
  onTakePickup,
}) => {
  const [activePickups, setActivePickups] = useState<Trip[]>([]);

  useEffect(() => {
    const now = new Date();
    const relevantTrips = trips.filter(trip => {
      const tripTime = new Date(trip.dateTime);
      // Time difference in minutes
      const timeDiff = (tripTime.getTime() - now.getTime()) / (1000 * 60);
      
      return (
        trip.type === TripType.PICK_UP &&
        trip.status !== TripStatus.COMPLETED &&
        trip.status !== TripStatus.CANCELLED &&
        tripTime.toDateString() === now.toDateString() &&
        timeDiff > -60 && 
        timeDiff < 120
      );
    });
    setActivePickups(relevantTrips.sort((a,b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()));
  }, [trips]);

  if (activePickups.length === 0) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4 shadow-lg mb-8" role="alert">
      <div className="flex items-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-amber-600 mr-3">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
        </svg>
        <h2 className="text-xl font-bold text-amber-800">Time to Pick Up!</h2>
      </div>
      <div className="space-y-4">
        {activePickups.map(trip => {
          const child = children.find(c => c.id === trip.childId);
          const assignedMember = members.find(m => m.id === trip.assignedMemberId);
          if (!child) return null;

          const tripTime = new Date(trip.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const isHandled = trip.status === TripStatus.IN_PROGRESS;

          return (
            <div key={trip.id} className={`p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isHandled ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} border`}>
              <div>
                <p className="font-bold text-lg text-gray-800">{child.name}</p>
                <p className="text-gray-600">{child.schoolName} at <span className="font-semibold">{tripTime}</span></p>
              </div>
              <div className="flex-shrink-0">
                {isHandled ? (
                   <div className="flex items-center gap-3 bg-red-500 text-white font-bold py-2 px-4 rounded-lg text-center shadow">
                     <MemberAvatar member={assignedMember!} />
                     <div>
                       <span className="block text-sm">Handled by</span>
                       <span>{assignedMember?.name}</span>
                     </div>
                   </div>
                ) : (
                  <button
                    onClick={() => onTakePickup(trip.id)}
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    aria-label={`Handle pickup for ${child.name}`}
                  >
                    Handle Pickup
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivePickupNotification;
