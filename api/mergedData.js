import { getSingleMember } from './membersData';

const viewMemberDetails = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObject) => {
      resolve({ ...memberObject });
    }).catch((error) => reject(error));
});

// eslint-disable-next-line import/prefer-default-export
export { viewMemberDetails };
