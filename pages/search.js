import React, { useEffect, useState } from 'react';
import { getMembers } from '../api/membersData';
import MemberCard from '../components/MemberCard';
import { useAuth } from '../utils/context/authContext';

function Search() {
  const [members, setMembers] = useState([]);
  // useAuth Hook gets members by uid
  const { user } = useAuth();

  // this is where we get the book object prop
  // parent prop and the child lives in MemberCard.js
  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  // TODO: make the call to the API to get all the members on component render
  useEffect(() => {
    getAllTheMembers();
  }, []);
  return (
    <div className="d-flex flex-wrap">
      {/* map over members here using MemberCard component */}
      {members.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
      ))}
    </div>
  );
}

export default Search;
