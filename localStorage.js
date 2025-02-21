import { useEffect } from "react";

const ClearLocalStorage = () => {
  useEffect(() => {
     const userEmail = localStorage.getItem('userEmail');
     const userPassword = localStorage.getItem('userPassword');

    localStorage.clear();
    if (userEmail) localStorage.setItem('userEmail', userEmail);
    if (userPassword) localStorage.setItem('userPassword', userPassword);

    console.log("Local storage cleared on page load.");
  }, []);

  return null; 
};

export default ClearLocalStorage;