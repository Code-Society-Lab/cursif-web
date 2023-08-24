
import { useState } from 'react';
import styles from './home.module.css';

export default function HomeScreen() {
  const [isBlackBackground, setIsBlackBackground] = useState(true);

  const toggleBackground = () => {
    setIsBlackBackground(!isBlackBackground);
  };

  const containerStyle = {
    backgroundColor: isBlackBackground ? 'black' : 'white',
    color: isBlackBackground ? 'white' : 'black',
  };

  return (
    <div className={styles.container} style={containerStyle}>
        <p>Welcome to Cursif!</p>
        <div className={`${styles.cornerText} ${isBlackBackground ? styles.whiteCornerText : styles.blackCornerText}`}>
            <button onClick={toggleBackground}>{isBlackBackground ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
    </div>
  );
}
