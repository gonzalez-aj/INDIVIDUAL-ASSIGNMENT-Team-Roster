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
  const [formInput, setFormInput] = useState(initialState); // initial state is an object so you dont need curly brackets around it
  // const [members, setMembers] = useState([]);
  // router w/ next.js
  const router = useRouter();
  const { user } = useAuth();

  // useAuth custom hook for stretch goals of getting teams by uid
  // useffect happens after 2nd render the component mounts; ie form

  // use state is storing the state of the data; use state is only for state management of data
  // tracking and managing the state of data
  useEffect(() => {
    // if i get an obj that has a firebasekey, fill in that form with the obj's info
    // this is for UPDATE
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);
  // dependcy array, whatever u put in in the depencdy were telling it that it needs to run useEffect again
  // we need to run the useEffect again when the user changes
  // if its empty [] were telling it to run always, just run once on load

  // onChange={handleChange} grabs the previous state of form and update it;
  // name has to come after prevState!
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.warn('name, value', name, value);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // we want to push the data up to our database
  // router has a method called push that takes it to a new page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/team'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebase: name };
        updateMember(patchPayload).then(() => {
          router.push('/team');
        });
      });
    }
  };
  // we call bootstrap with Form and FloatingLabel and Form.Control; dynamically created h2
  // https://react-bootstrap.github.io/forms/overview/
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      {/* TITLE INPUT Form.Control is an input tag */}
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="name"
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
