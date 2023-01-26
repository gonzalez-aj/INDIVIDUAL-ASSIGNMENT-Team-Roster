/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewMemberDetails } from '../../api/mergedData';

// we dont pass any props to ViewMember. this is the ViewMember details
export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  console.warn('router object', router);

  // TODO: grab firebaseKey from url query is a key within the router obj - {firebaseKey} is taco
  const { firebaseKey } = router.query;
  // we are deconstructing, we are saying get the firebaseKey w/in the query

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={memberDetails.image} alt={memberDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {memberDetails.name} is
        </h5>
        <h4>
          {memberDetails.role}
        </h4>
      </div>
    </div>
  );
}
