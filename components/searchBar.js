import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    console.warn('e.target.value', e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="searchBox">
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
