import { useDarkMode } from '../app/DarkModeContext';
import styles from './home.module.css';

export default function HomeScreen() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const containerStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <div className={styles.container} style={containerStyle}>
      <p>Welcome to Cursif!</p>
      <div className={`${styles.cornerText} ${isDarkMode ? styles.whiteCornerText : styles.blackCornerText}`}>
        <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
    </div>
  );
}
