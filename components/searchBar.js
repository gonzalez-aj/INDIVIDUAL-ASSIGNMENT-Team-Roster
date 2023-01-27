/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const initialState = {
  name: '',
  image: '',
  role: '',
  favorite: false,
};

function SearchBar({ data }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  console.warn('filteredData', filteredData);

  const handleChange = (e) => {
    const searchWord = setSearchInput(e.target.value);
    console.warn('e.target.value', e.target.value.toLowerCase());
    const arrayWrap = Object.keys(data);
    const newSearch = arrayWrap.filter((value) => (
      value.name?.toLowerCase().includes(searchWord.toLowerCase())));
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newSearch);
    }
    setFilteredData(newSearch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') {
      console.warn('handleSubmit searchInput', searchInput);
      console.warn('handleSubmit setSearchInput()', setSearchInput());
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="searchInputs">
          <input
            className="form-control"
            id="search"
            name="search"
            placeholder="☌ Search Members..."
            onChange={handleChange}
            type="text"
            value={searchInput}
          />
          {/* search submit btn  */}
          <Button variant="success" type="submit" size="sm">search</Button>
        </div>
      </Form>
    </>
  );
}

SearchBar.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

SearchBar.defaultProps = {
  data: initialState,
};

export default SearchBar;
