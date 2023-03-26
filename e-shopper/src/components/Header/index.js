import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../Context/StateProvider'
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Autosuggest from 'react-autosuggest';



import { menus } from './Data'


import './header.css'
import SlideMenu from './SlideMenu';

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [slideOpen, setSlideOpen] = useState(false)
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const maxSuggestions = 5;

    // Define an array of hardcoded suggestions
    const suggestions = [
      'apple',
      'abin',
      'banana',
      'cherry',
      'date',
      'elderberry',
      'fig',
      'grape',
      'honeydew',
      'kiwi',
      'lemon',
      'mango',
      'nectarine',
      'orange',
      'peach',
      'raspberry',
      'strawberry',
      'tangerine',
      'watermelon'
    ];

    // Filter the suggestions based on the user input
    const filteredSuggestions = inputLength === 0 ? [] : suggestions.filter(suggestion =>
      suggestion.toLowerCase().slice(0, inputLength) === inputValue
    );

    // Return up to maxSuggestions suggestions
    return filteredSuggestions.slice(0, maxSuggestions);
  };

  const renderSuggestion = (suggestion) => {
    return <div>{suggestion}</div>;
  };
  const handleChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionSelected = (event, { suggestionValue }) => {
    console.log(suggestionValue);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const onSuggestionsFetchRequested = async ({ value }) => {
    const data = await getSuggestions(value);
    setSuggestions(data);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };



  const handleAuthentication = () => {
    if (user) {
      // auth.signOut();
      logOut()
    }
  }

  const slideToggle = () => {
    setSlideOpen(!slideOpen)
  }
  const logOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("email");
    window.location.reload()
  }

  return (
    <>
      <div className="header">
        <div className="slide-menu-icon">
          <MenuIcon onClick={slideToggle} fontSize="large" className="menu-icon" />
          <SlideMenu handleAuthentication={handleAuthentication} slideToggle={slideToggle} slideOpen={slideOpen} />
        </div>

        <Link to="/">
          <img className="header_logo" src={require('../../images/eshopper.png')} alt="img" />
        </Link>

        <div className="header_search">
          <select className="header_select">
            <option>All Deparments</option>
            {menus.map((item, i) => (
              <option key={i} value={item.menu}>{item.menu}</option>
            ))}
          </select>
          {/* <input className="header_searchInput" type="text" /> */}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'Search',
              value,
              onChange: handleChange,
            }}
            onSuggestionSelected={handleSuggestionSelected}
          />
          <SearchIcon className="header_searchIcon" style={{ position:'relative'}} />
        </div>

        <div className="header_nav">
          <Link to={!user ? '/login' : logOut}>
            <div onClick={handleAuthentication} className="header_option">
              <span className="header_optionLineOne">
                {user ? user.split('@')[0] : 'Guest'}
              </span>
              <span className="header_optionLineTwo">
                {user ? 'Sign Out' : 'Sign In'}
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div className="header_option">
              <span className="header_optionLineOne">
                Return
              </span>
              <span className="header_optionLineTwo">
                & Orders
              </span>
            </div>
          </Link>

          <div className="header_option">
            <span className="header_optionLineOne">
              Your
            </span>
            <span className="header_optionLineTwo">
              Prime
            </span>
          </div>

          <Link to="/checkout">
            <div className="header_optionBasket">
              <ShoppingBasketIcon />
              <span className="header_optionLineTwo header_BasketCount">{basket?.length}</span>
            </div>
          </Link>
        </div>
      </div>
      <div className="header_bottom">
        <select className="header_select">
          <option>All Deparments</option>
          {menus.map((item, i) => (
            <option key={i} value={item.menu}>{item.menu}</option>
          ))}
        </select>
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
    </>
  )
}

export default Header
