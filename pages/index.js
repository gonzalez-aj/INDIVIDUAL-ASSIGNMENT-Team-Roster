import React from 'react';
import Head from 'next/head';
import { Button, Image } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Marvel Avengers</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome to the Marvel Verse,</h1>
        <h1> {user.displayName}! </h1>
        <div className="align-content-around">
          <Image src={user.photoURL} referrerPolicy="no-referrer" alt="your face" width="150px" height="150px" />
        </div>
        <br />
        <h4>email: {user.email}</h4>
        <h6>The last time you entered the Marvel-Verse:</h6>
        <h6>{user.metadata.lastSignInTime}</h6>
        <br />
        <p>Click the button below to logout!</p>
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default Home;
