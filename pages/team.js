/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getMembers } from '../api/membersData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

function TeamMembers() {
  // set a state for members
  const [members, setMembers] = useState([]);

  // useAuth Hook gets uid
  const { user } = useAuth();

  // this is where we get the book object prop
  // parent prop and the child lives in MemberCard.js
  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheMembers();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/member/new" passHref>
        <Button>Add A Member</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over members here using MemberCard component */}
        {members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
        ))}
      </div>

    </div>
  );
}

export default TeamMembers;
