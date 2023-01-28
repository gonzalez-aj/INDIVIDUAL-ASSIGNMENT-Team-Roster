/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getMembers } from '../api/membersData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

export default function TeamMembers() {
  // set a state for members
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
    <>
      <Head>
        <title>Marvel Avengers⚡︎</title>
      </Head>
      <div className="text-center my-4">
        <h1>Team Marvel ⚡︎</h1>
        <br />
        <Link href="/member/new" passHref>
          <Button>add a member</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {/* map over members here using MemberCard component */}
          {members.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
          ))}
        </div>

      </div>
    </>
  );
}
