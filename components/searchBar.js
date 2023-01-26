/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { getMembers } from '../api/membersData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from './MemberCard';

const initialState = {
  name: '',
  image: '',
  role: '',
  favorite: false,
};

function SearchBar({ obj }) {
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const { user } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.warn('e.target.value', e.target.value);
    if (searchInput.length > 0) {
      obj.filter((member) => member.name.match(searchInput));
    }
    console.warn('handleChange', handleChange());

    const getAllTheMembers = () => {
      getMembers(user.uid).then(setMembers);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      getAllTheMembers();
    }, []);

    return (
      <>
        <div>
          <Head>
            <title>Marvel Avengers</title>
          </Head>
          <br />
          <input
            className="form-control"
            id="search"
            name="search"
            placeholder="Search Members"
            aria-label="Search"
            onChange={handleChange}
            type="text"
            value={searchInput}
          />
        </div>
        <div className="d-flex flex-wrap">
          {/* map over members here using MemberCard component */}
          {members.map((member) => (
            <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllTheMembers} />
          ))}
        </div>
      </>
    );
  };
}
SearchBar.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

SearchBar.defaultProps = {
  obj: initialState,
};

export default SearchBar;
