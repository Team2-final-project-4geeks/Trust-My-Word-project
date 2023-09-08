import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import "../../styles/themechanger.css";



const ThemeSwitcher = ()=> {
    const [theme, setTheme] = useState('light'); 
  
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

          if (newTheme === "dark") {
          localStorage.setItem('theme', newTheme);
          document.body.classList.add("dark-theme");
          document.body.classList.remove("light-theme");
          } else {
          localStorage.setItem('theme', newTheme);
          document.body.classList.add("light-theme");
          document.body.classList.remove("dark-theme");
          }
    };

    useEffect(()=>{
      if(localStorage.getItem("theme")== "dark"){
        document.body.classList.add("dark-theme");
      }
      else {
        document.body.classList.add("light-theme");
      }
    },[])
  
    return (
      <div id={`app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
          <FontAwesomeIcon onClick={toggleTheme} icon={theme === 'light' ? faSun : faMoon} />
      </div>
    );
  }
  
  export default ThemeSwitcher;
  