import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/membersData';

// these have to match the name "" in the form input
const initialState = {
  name: '',
  image: '',
  role: '',
};

function MemberForm({ obj }) {
  // handle form first, formInput is for everything on the form
  const [formInput, setFormInput] = useState(initialState); // initial stat is an object so you dont need curly brackets around it
  // const [members, setMembers] = useState([]);
  // router w/ next.js
  const router = useRouter();
  const { user } = useAuth();
  // useAuth custom hook for stretch goals of getting teams by uid

  // useffect happens after thec ompono renders; ie form
  // it is going to mount and unmount components
  // react is a single page application; before we had multiple separate pages
  // its just one page, regardless of the fact that we have pages
  // it mounts and unmounts component - thats wat useeffect does
  // after the seceond render it mounts

  // use state is storing the stae of the data; storing the state of data
  // use state is only for state management of data
  // traking and mging the state of data
  useEffect(() => {
    // getMembers(user.uid).then(setMembers);
    // because we are not editing the object in the form
    // this is a form for updateing and creating a new member
    // we prepoulate our form with value={formInput.title} which is the state were tracking
    // but when we update were passing obj there, if
    // we will setFormInput to obj
    // if i get an obj that has a firebasekey, fill in that form with the obj's info
    // this is for UPDATE
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  // dependcy array, whatever u put in in the depencdy were telling it that it needs to run useEffect again
  // we need to run the useEffect again when the user changes
  // if its empty [] were telling it to run always, just run once on load

  // onChange={handleChange} grabs the previous stage and update it; we need onChange to type
  // all inport forms need it; it needs to know what to do to track changes in the input
  // name has to come after prevState!
  const handleChange = (e) => {
    // console.warn('handleChange');
    const { name, value } = e.target;
    // console.warn('name, value', name, value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // we want to prevent the default behaviour - it will re-render form empty on DOM which we dont want
  // we want to push the data up to our database
  // router has a method called push that takes it to a new page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(() => {
        router.push('/team');
      });
    }
  };
  // we push router.push - the root is '/' index.js

  // we call bootstrap with Form and FloatingLabel and Form.Control
  // dynamically created h2
  // https://react-bootstrap.github.io/forms/overview/
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      {/* TITLE INPUT Form.Control is an input tag */}
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="title"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* role INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Member Role" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Member Role"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* team SELECT stretch goal

      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          placeholder="Pick a Team"
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            team.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel> */}

      {/* SUBMIT BUTTON  */}
      <Button variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
