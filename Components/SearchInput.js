import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { push } = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search === '') {
      return;
    } else {
      push(`/search/${search}`);
    }

    setSearch('');
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        className=""
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        type="text"
      />
      <button type="submit" hidden></button>
    </form>
  );
};

export default SearchInput;
