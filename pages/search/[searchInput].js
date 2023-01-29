/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMembers } from '../../api/membersData';
import MemberCard from '../../components/MemberCard';
import { useAuth } from '../../utils/context/authContext';

function Search() {
  const [members, setMembers] = useState([]);
  // useAuth Hook gets members by uid
  const { user } = useAuth();
  const router = useRouter();
  // next.js routing
  const { searchInput } = router.query;

  const getSomeMembers = () => {
    getMembers(user.uid).then((memberArr) => {
      const filterTheMembers = memberArr.filter((member) => member.name.toLowerCase().includes(searchInput) || member.role.toLowerCase().includes(searchInput));
      setMembers(filterTheMembers);
    });
  };

  // make the call to the API to get the members on component render
  useEffect(() => {
    getSomeMembers();
    return () => {
      setMembers([]);
    };
  }, [searchInput]);

  return (
    <>
      <div>
        <h1>Searched for: {searchInput}</h1>
      </div>
      <div className="d-flex flex-wrap">
        {/* map over members here using MemberCard component */}
        {members.map((obj) => (
          <MemberCard key={obj.firebaseKey} memberObj={obj} onUpdate={getSomeMembers} />
        ))}
      </div>
    </>
  );
}

export default Search;
