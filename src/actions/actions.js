import createReminders from '../services/api';

export const actionTypes = {
  ADD_REMINDER: 'ADD_REMINDER',
  CLEAR_CURRENT_CONTACT: 'CLEAR_CURRENT_CONTACT',
};

export function addReminder(reminder) {
  return {
    type: 'ADD_REMINDER',
    reminder,
  };
};

export const addReminderToDB = (reminder) => async dispatch => {
  console.log(reminder);
  dispatch(createReminders(reminder));
};

//
// export function clearCurrentContact(contact) {
//   return {
//     type: 'CLEAR_CURRENT_CONTACT',
//     contact,
//   };
// };

// export function getContacts(contactList) {
//   return {
//     type: 'GET_CONTACT_LIST',
//     contactList,
//   };
// };

// export function openFormModal(showModal) {
//   return {
//     type: 'OPEN_CREATE_FORM_MODAL',
//     showModal,
//   };
// };

// export function closeFormModal(showModal) {
//   return {
//     type: 'CLOSE_CREATE_FORM_MODAL',
//     payload: showModal,
//   };
// };
