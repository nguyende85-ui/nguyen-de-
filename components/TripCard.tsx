import React, { useState } from 'react';
import { Trip, Member, Child, TripStatus, TripType } from '../types';
import MemberAvatar from './MemberAvatar';
import EditTripModal from './EditTripModal';

interface TripCardProps {
  trip: Trip;
  child: Child;
  members: Member[];
  onAssignDriver: (tripId: string, memberId: string) => void;
  onUpdateStatus: (tripId: string, newStatus: TripStatus) => void;
  onEdit: (tripId: string, updatedData: Partial<Omit<Trip, 'id' | 'childId'>>) => void;
  onDelete: (tripId: string) => void;
}

const statusStyles: Record<TripStatus, string> = {
  [TripStatus.SCHEDULED]: 'bg-blue-100 text-blue-800',
  [TripStatus.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800 animate-pulse',
  [TripStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [TripStatus.CANCELLED]: 'bg-red-100 text-red-800',
};

const TripCard: React.FC<TripCardProps> = ({
  trip,
  child,
  members,
  onAssignDriver,
  onUpdateStatus,
  onEdit,
  onDelete,
}) => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const assignedMember = members.find(m => m.id === trip.assignedMemberId);

  const handleAssignClick = () => {
    if (selectedDriver) {
      onAssignDriver(trip.id, selectedDriver);
      setSelectedDriver('');
    }
  };

  const getNextStatus = (): TripStatus | null => {
    switch (trip.status) {
      case TripStatus.SCHEDULED:
        return TripStatus.IN_PROGRESS;
      case TripStatus.IN_PROGRESS:
        return TripStatus.COMPLETED;
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className={`p-4 ${trip.type === TripType.DROP_OFF ? 'bg-sky-500' : 'bg-amber-500'} text-white flex justify-between items-center`}>
          <h3 className="font-bold text-lg">{child.name}</h3>
          <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={`Edit trip for ${child.name}`}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="m13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793-2.828-2.828.793-.793ZM11.379 5.793 7.5 9.672V12h2.328l3.879-3.879-2.328-2.328Z" />
                    <path d="M5.5 7.5a.5.5 0 0 0-1 0v8.5a.5.5 0 0 0 .5.5h8.5a.5.5 0 0 0 0-1H6V7.5Z" />
                 </svg>
              </button>
              {trip.type === TripType.DROP_OFF ? 
                  <i className="is-[heroicons--arrow-up-circle-20-solid] w-6 h-6"></i> :
                  <i className="is-[heroicons--arrow-down-circle-20-solid] w-6 h-6"></i>
              }
              <span className="font-semibold">{trip.type}</span>
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <div className="text-gray-600 mb-1">
              <span className="font-semibold">School:</span> {child.schoolName}
            </div>
            <div className="text-gray-800 font-bold text-xl mb-3">
              {new Date(trip.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-600">Status:</span>
              <span className={`px-3 py-1 text-sm font-bold rounded-full ${statusStyles[trip.status]}`}>
                {trip.status}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
               <span className="font-semibold text-gray-600">Driver:</span>
               {assignedMember ? (
                  <div className="flex items-center gap-2">
                      <MemberAvatar member={assignedMember} />
                      <span className="font-semibold text-gray-800">{assignedMember.name}</span>
                  </div>
              ) : (
                  <span className="text-gray-500 italic">Unassigned</span>
              )}
            </div>

            {!assignedMember && trip.status === TripStatus.SCHEDULED && (
              <div className="space-y-2 mt-4">
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>Assign a driver...</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                <button
                  onClick={handleAssignClick}
                  disabled={!selectedDriver}
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
                >
                  Assign
                </button>
              </div>
            )}
          </div>

          {nextStatus && assignedMember && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => onUpdateStatus(trip.id, nextStatus)}
                className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              >
                {nextStatus === TripStatus.IN_PROGRESS ? 'Start Trip' : 'Mark as Completed'}
              </button>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <EditTripModal
          trip={trip}
          child={child}
          onSave={(updatedData) => {
            onEdit(trip.id, updatedData);
            setIsEditing(false);
          }}
          onDelete={(tripId) => {
            onDelete(tripId);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default TripCard;
