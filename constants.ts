import { Member, Child, Trip, TripStatus, TripType } from './types';

export const MEMBERS: Member[] = [
  { id: '1', name: 'Dad', avatarColor: 'bg-blue-500' },
  { id: '2', name: 'Mom', avatarColor: 'bg-pink-500' },
  { id: '3', name: 'Grandpa', avatarColor: 'bg-green-500' },
  { id: '4', name: 'Aunt Mary', avatarColor: 'bg-purple-500' },
];

export const CHILDREN: Child[] = [
  { id: 'c1', name: 'Liam', schoolName: 'Northwood Elementary' },
  { id: 'c2', name: 'Sophia', schoolName: 'Oak Valley Middle' },
  { id: 'c3', name: 'Noah', schoolName: 'Northwood Elementary' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextDay = new Date(today);
nextDay.setDate(nextDay.getDate() + 2);

const formatDate = (date: Date, time?: string) => {
    if (time) {
        const [hours, minutes] = time.split(':');
        date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    }
    return date.toISOString();
};


export const INITIAL_TRIPS: Trip[] = [
  {
    id: 't1',
    childId: 'c1',
    type: TripType.DROP_OFF,
    dateTime: formatDate(new Date(today), '08:00'),
    assignedMemberId: '1',
    status: TripStatus.SCHEDULED,
  },
  {
    id: 't2',
    childId: 'c2',
    type: TripType.DROP_OFF,
    dateTime: formatDate(new Date(today), '08:30'),
    assignedMemberId: '2',
    status: TripStatus.SCHEDULED,
  },
  {
    id: 't3',
    childId: 'c1',
    type: TripType.PICK_UP,
    dateTime: formatDate(new Date(today), '15:00'),
    status: TripStatus.SCHEDULED,
  },
    {
    id: 't4',
    childId: 'c2',
    type: TripType.PICK_UP,
    dateTime: formatDate(new Date(today), '16:00'),
    assignedMemberId: '3',
    status: TripStatus.IN_PROGRESS,
  },
  {
    id: 't5',
    childId: 'c3',
    type: TripType.PICK_UP,
    dateTime: formatDate(new Date(today), '15:00'),
    assignedMemberId: '2',
    status: TripStatus.COMPLETED,
  },
  {
    id: 't10',
    childId: 'c3',
    type: TripType.PICK_UP,
    dateTime: formatDate(new Date(new Date().setHours(15, 30, 0, 0))),
    status: TripStatus.SCHEDULED,
  },
  {
    id: 't6',
    childId: 'c1',
    type: TripType.DROP_OFF,
    dateTime: formatDate(new Date(tomorrow), '08:00'),
    status: TripStatus.SCHEDULED,
  },
  {
    id: 't7',
    childId: 'c2',
    type: TripType.DROP_OFF,
    dateTime: formatDate(new Date(tomorrow), '08:30'),
    assignedMemberId: '4',
    status: TripStatus.SCHEDULED,
  },
   {
    id: 't8',
    childId: 'c1',
    type: TripType.PICK_UP,
    dateTime: formatDate(new Date(tomorrow), '15:00'),
     assignedMemberId: '1',
    status: TripStatus.SCHEDULED,
  },
  {
    id: 't9',
    childId: 'c3',
    type: TripType.DROP_OFF,
    dateTime: formatDate(new Date(nextDay), '08:00'),
    status: TripStatus.SCHEDULED,
  },
];