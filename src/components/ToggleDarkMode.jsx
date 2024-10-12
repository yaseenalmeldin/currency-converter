import React, { useState, useEffect } from "react";

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", !isDarkMode);
  };

  return (
    <div className="button-container"> {/* Added this container */}
      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
      >
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
};

export default ToggleDarkMode;
