import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../../api/membersData';
import MemberForm from '../../../components/forms/MemberForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  // router is a hook that grabs an object
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;
  // i neamed this file [firebaseKey].js so that's why it's called that

  // TODO: make a call to the API to get the member data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<MemberForm obj={editItem} />);
}
