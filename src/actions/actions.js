export const actionTypes = {
  // GET_CONTACT_LIST: 'GET_CONTACT_LIST',
  OPEN_CREATE_FORM_MODAL: 'OPEN_CREATE_FORM_MODAL',
  // CLOSE_CREATE_FORM_MODAL: 'CLOSE_CREATE_FORM_MODAL',
};

// export function getContacts(contactList) {
//   return {
//     type: 'GET_CONTACT_LIST',
//     contactList,
//   };
// };

export function openFormModal(showModal) {
  return {
    type: 'OPEN_CREATE_FORM_MODAL',
    showModal,
  };
};

// export function closeFormModal(showModal) {
//   return {
//     type: 'CLOSE_CREATE_FORM_MODAL',
//     payload: showModal,
//   };
// };
