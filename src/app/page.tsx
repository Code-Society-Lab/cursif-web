"use client"

import { useDarkMode } from './dark-mode-context';

export default function Page() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const containerStyle = {
    backgroundColor: isDarkMode ? '#404040' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <span className="h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl font-bold">Welcome to Cursif</p>
        <p className="text-1xl">Taking note should be <b>fast</b> and <b>simple</b></p>
      </div>
    </span>
  );

  // return (
  //   <div className="" style={containerStyle}>
  //     <p>Welcome to Cursif!</p>
  //     <div className={`${styles.cornerText} ${isDarkMode ? styles.whiteCornerText : styles.blackCornerText}`}>
  //       <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
  //     </div>
  //   </div>
  // );
}
