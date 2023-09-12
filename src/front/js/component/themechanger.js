import React, { useState,useEffect } from 'react';
import "../../styles/themechanger.css";
import { BsFillMoonFill} from 'react-icons/bs';
import { MdLightMode} from 'react-icons/md';


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
        {theme === 'light' ? <BsFillMoonFill  onClick={toggleTheme} /> : <MdLightMode  onClick={toggleTheme}/>} 
      </div>
    );
  }
  
  export default ThemeSwitcher;
  