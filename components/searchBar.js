/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.warn('e.target.value', e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') console.warn('searchInput', searchInput);
    console.warn('setSearchInput()', setSearchInput());
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          className="form-control"
          id="search"
          name="search"
          placeholder="Search Members"
          onChange={handleChange}
          type="text"
          value={searchInput}
        />
        {/* search submit btn  */}
        <Button variant="success" type="submit" size="sm">Search Members </Button>
      </Form>
    </>
  );
}

export default SearchBar;
