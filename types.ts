
export enum TripStatus {
  SCHEDULED = 'Scheduled',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum TripType {
  DROP_OFF = 'Drop-off',
  PICK_UP = 'Pick-up',
}

export interface Member {
  id: string;
  name: string;
  avatarColor: string;
}

export interface Child {
  id: string;
  name: string;
  schoolName: string;
}

export interface Trip {
  id: string;
  childId: string;
  type: TripType;
  dateTime: string;
  assignedMemberId?: string;
  status: TripStatus;
}
   