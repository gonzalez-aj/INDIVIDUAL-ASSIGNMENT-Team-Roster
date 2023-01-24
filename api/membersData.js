import { clientCredentials } from '../utils/client';
// API CALLS FOR members

const endpoint = clientCredentials.databaseURL;

// api call to get all members
const getMembers = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const deleteMember = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleMember = (firebaseKey) => new Promise((resolve, reject) => { // firebaseKey got undefined
  fetch(`${endpoint}/members/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const createMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateMember = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// FILTER memebers by team indexOn team_id
// const getMembersByTeam = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/members.json?orderBy="team_id"&equalTo="${firebaseKey}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     }, // you technically do not need the options object for GET requests, but using it here for consistency
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(Object.values(data)))
//     .catch(reject);
// });

// FILTER members by favorite
// const faveMembers = (uid) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/members.json?orderBy="uid"&equalTo="${uid}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const favoriteMember = Object.values(data).filter((item) => item.favorite);
//       resolve(favoriteMember);
//     })
//     .catch(reject);
// });

// STRETCH...SEARCH members

export {
  getMembers,
  createMember,
  deleteMember,
  getSingleMember,
  updateMember,
};
