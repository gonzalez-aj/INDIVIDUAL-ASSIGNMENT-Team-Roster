import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Head from 'next/head';
import { deleteMember } from '../api/membersData';

function MemberCard({ memberObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE member AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE members
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Head>
        <title>Marvel Avengers</title>
      </Head>
      <Card style={{ width: '18rem', margin: '10px' }}>
        <Card.Img variant="top" src={memberObj.image} alt={memberObj.role} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{memberObj.role}</Card.Title>
          <p className="card-text bold">{memberObj.name}</p>
          {/* DYNAMIC LINK TO VIEW THE member DETAILS */}
          <Link href={`/member/${memberObj.firebaseKey}`} passHref>
            <Button variant="primary" className="m-2">view ☊ </Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS this route knows wut compnt to render */}
          <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
            <Button variant="info">edit ✐</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisMember} className="m-2">
            delete ✗
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
// .propTypes = about to define the proptypes, only append to components
// PropTypes. is when youre defining an actual proptype
MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberCard;
