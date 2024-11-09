import React, { useEffect, useRef } from 'react';
import styles from './DetailsPopup.module.scss';

const DetailsPopup = ({ title, content, setpopup }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
        setpopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.popupOverlay}`}>
      <div className={`${styles.popup}`} ref={popupRef}>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={()=>setpopup(false)}>Close</button>
      </div>
    </div>
  );
};

export default DetailsPopup;