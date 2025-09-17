import React, { useState, useCallback } from 'react';
import { Trip, Member, Child, TripStatus } from './types';
import { INITIAL_TRIPS, MEMBERS, CHILDREN } from './constants';
import Header from './components/Header';
import ScheduleDashboard from './components/ScheduleDashboard';

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(INITIAL_TRIPS);
  const [members] = useState<Member[]>(MEMBERS);
  const [children] = useState<Child[]>(CHILDREN);
  // Simulate a logged-in user. In a real app, this would come from an auth context.
  const [currentUser] = useState<Member>(members[0]);

  const handleAssignDriver = useCallback((tripId: string, memberId: string) => {
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId ? { ...trip, assignedMemberId: memberId } : trip
      )
    );
  }, []);

  const handleUpdateStatus = useCallback((tripId: string, newStatus: TripStatus) => {
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId ? { ...trip, status: newStatus } : trip
      )
    );
  }, []);

  const handleTakePickup = useCallback((tripId: string) => {
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId
          ? {
              ...trip,
              assignedMemberId: currentUser.id,
              status: TripStatus.IN_PROGRESS,
            }
          : trip
      )
    );
  }, [currentUser]);
  
  const handleEditTrip = useCallback((tripId: string, updatedData: Partial<Omit<Trip, 'id' | 'childId'>>) => {
    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId ? { ...trip, ...updatedData } : trip
      )
    );
  }, []);

  const handleDeleteTrip = useCallback((tripId: string) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <ScheduleDashboard
          trips={trips}
          members={members}
          children={children}
          currentUser={currentUser}
          onAssignDriver={handleAssignDriver}
          onUpdateStatus={handleUpdateStatus}
          onTakePickup={handleTakePickup}
          onEditTrip={handleEditTrip}
          onDeleteTrip={handleDeleteTrip}
        />
      </main>
    </div>
  );
};

export default App;