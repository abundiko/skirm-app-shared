import { Skirm } from './skirm';
import { User } from './user';

export const NOTIFICATION_TYPES = ['message', 'win', 'loss', 'security', 'info', 'invite'] as const;
export type UserNotificationCategory = (typeof NOTIFICATION_TYPES)[number] ;

export type UserNotification = {
  _id: string;
  createdAt: string;
  userId: string;
  type: UserNotificationCategory;
  skirmId?: string;
  title: string;
  message: string;

  isRead?: boolean;
};

export type UserNotificationDetailed = Omit<UserNotification, 'skirm' | 'user'> & {
  user: User;
  skirm: Skirm;
};

export const USER_NOTIFICATION_OPTIONS: {
  title: string;
  value: '' | UserNotificationCategory;
}[] = [
  { title: 'All Categories', value: '' },
  { title: 'Information and alerts', value: 'info' },
  { title: 'Messages', value: 'message' },
  { title: 'Winnings', value: 'win' },
  { title: 'Loses', value: 'loss' },
];

export const dummyUserNotifications: UserNotification[] = [
  {
    _id: '1',
    createdAt: new Date().toISOString(),
    userId: 'user1',
    type: 'message',
    skirmId: 'skirm1',
    title: 'You have a new message from your coach.',
    message: "Don't forget to check your messages for important updates.",
  },
  {
    _id: '2',
    createdAt: new Date().toISOString(),
    userId: 'user2',
    type: 'win',
    skirmId: 'skirm2',
    title: 'Congratulations!',
    message: 'Your team has won the latest skirmish. Great job!',
  },
  {
    _id: '3',
    createdAt: new Date().toISOString(),
    userId: 'user3',
    type: 'loss',
    skirmId: 'skirm3',
    title: 'Tough loss.',
    message: 'Your team lost the recent skirmish. Keep practicing!',
  },
  {
    _id: '4',
    createdAt: new Date().toISOString(),
    userId: 'user4',
    type: 'security',
    skirmId: 'skirm4',
    title: 'Security Alert!',
    message: 'There was a login attempt from an unrecognized device.',
  },
  {
    _id: '5',
    createdAt: new Date().toISOString(),
    userId: 'user5',
    type: 'message',
    skirmId: 'skirm5',
    title: 'New event scheduled.',
    message: 'A new skirmish event has been scheduled. Check the calendar for details.',
  },
];
