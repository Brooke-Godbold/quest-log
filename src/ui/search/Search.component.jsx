import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { TbWorldSearch } from 'react-icons/tb';

import {
  SearchButton,
  SearchForm,
  SearchInput,
  StyledSearch,
} from './Search.styles';
import { NavigationOverlay } from '../navigation/Navigation.styles';

function Search({ navigationActive }) {
  const [searchActive, setSearchActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, setFocus } = useForm();

  function handleToggleSearch(e) {
    e.preventDefault();

    setSearchActive((searchActive) => !searchActive);
    setFocus('search');
  }

  function preventEnter(e) {
    if (e.keyCode === 13) e.preventDefault();
  }

  function onSearch(data) {
    reset();
    setSearchActive(false);

    searchParams.set('search', data.search);
    searchParams.delete('view');
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (navigationActive) setSearchActive(false);
  }, [navigationActive]);

  useEffect(() => {
    if (!searchActive) reset();
  }, [searchActive, reset]);

  useEffect(() => {
    if (searchParams.get('search') && location.pathname !== '/social/feed')
      navigate(`/social/feed?search=${searchParams.get('search')}`);
  }, [location, navigate, searchParams]);

  return (
    <StyledSearch>
      <NavigationOverlay style={{ zIndex: 996 }} $active={searchActive} />
      <SearchForm onSubmit={handleSubmit(onSearch)}>
        <SearchInput
          $active={searchActive}
          id="search"
          type="text"
          {...register('search', { required: true, minLength: 3 })}
        />
      </SearchForm>

      <SearchButton onKeyDown={preventEnter} onClick={handleToggleSearch}>
        <TbWorldSearch />
      </SearchButton>
    </StyledSearch>
  );
}

Search.propTypes = {
  navigationActive: PropTypes.bool,
};

export default Search;
