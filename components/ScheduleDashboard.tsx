import React from 'react';
import { Trip, Member, Child, TripStatus } from '../types';
import TripCard from './TripCard';
import ActivePickupNotification from './ActivePickupNotification';

interface ScheduleDashboardProps {
  trips: Trip[];
  members: Member[];
  children: Child[];
  currentUser: Member;
  onAssignDriver: (tripId: string, memberId: string) => void;
  onUpdateStatus: (tripId: string, newStatus: TripStatus) => void;
  onTakePickup: (tripId: string) => void;
  onEditTrip: (tripId: string, updatedData: Partial<Omit<Trip, 'id' | 'childId'>>) => void;
  onDeleteTrip: (tripId: string) => void;
}

const ScheduleDashboard: React.FC<ScheduleDashboardProps> = ({
  trips,
  members,
  children,
  currentUser,
  onAssignDriver,
  onUpdateStatus,
  onTakePickup,
  onEditTrip,
  onDeleteTrip,
}) => {
  const groupedTrips = trips.reduce((acc, trip) => {
    const date = new Date(trip.dateTime).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(trip);
    return acc;
  }, {} as Record<string, Trip[]>);

  const sortedDates = Object.keys(groupedTrips).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="space-y-8">
      <ActivePickupNotification
        trips={trips}
        members={members}
        children={children}
        currentUser={currentUser}
        onTakePickup={onTakePickup}
      />
      {sortedDates.map(date => (
        <section key={date}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 pb-2 mb-4 border-b-2 border-gray-200">
            {date}
          </h2>
          {groupedTrips[date].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedTrips[date]
                .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
                .map(trip => {
                  const child = children.find(c => c.id === trip.childId);
                  if (!child) return null;
                  return (
                    <TripCard
                      key={trip.id}
                      trip={trip}
                      child={child}
                      members={members}
                      onAssignDriver={onAssignDriver}
                      onUpdateStatus={onUpdateStatus}
                      onEdit={onEditTrip}
                      onDelete={onDeleteTrip}
                    />
                  );
                })}
            </div>
          ) : (
             <p className="text-gray-500">No trips scheduled for this day.</p>
          )}
        </section>
      ))}
    </div>
  );
};

export default ScheduleDashboard;