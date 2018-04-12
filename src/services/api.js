import { initialize, setListener } from './firebase';

export const initApi = () => initialize();

export const getReminders = (updaterFn) => setListener('reminders', updaterFn);
