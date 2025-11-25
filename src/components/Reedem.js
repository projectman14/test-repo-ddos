import React, { useState } from 'react';
// import './App.css';

function Redeem() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="main-content">
      {isSearchOpen && (
        <div id="search-popup">
          <form action="#">
            <h3>Seal the deal, highest bid! Claim your asset!</h3>
            <input type="text" placeholder="Enter UID" />
            <button id="clk" type="submit">Claim</button>
          </form>
          <button id="close-popup" onClick={closeSearch}>X</button>
        </div>
      )}
    </div>
  );
}

// Define openSearch function before using it in export statement
function openSearch() {
  // Implementation of openSearch function (if needed)
}

// Export both Redeem component and openSearch function
export { Redeem, openSearch };
