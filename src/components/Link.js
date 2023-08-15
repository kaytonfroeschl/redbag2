import { useContext } from 'react';
import * as React from "react";
import NavigationContext from '../context/navigation';



function Link({ to, children }) {
  const { navigate } = useContext(NavigationContext);

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();

    navigate(to);
  };

  return (
    <a style={{ textDecoration: 'none', color:'black' }} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
