import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../../styles/themechanger.css";



const ThemeSwitcher = ()=> {
    const [theme, setTheme] = useState('light'); 
  
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    
        // Cambia las clases CSS en el elemento body según el tema seleccionado
        if (newTheme === "dark") {
          document.body.classList.add("dark-theme");
          document.body.classList.remove("light-theme");
        } else {
          document.body.classList.add("light-theme");
          document.body.classList.remove("dark-theme");
        }
    };
  
    return (
      <div id={`app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
        <button onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
        </button>
      </div>
    );
  }
  
  export default ThemeSwitcher;
  