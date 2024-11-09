import { useEffect, useRef } from "react";
import styles from './Room.module.scss';

function BookRequestPopup ({setpopup, purpose, setPurpose, requestBook}) {
    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
          setpopup(false);
      }
    };

    const handlePurposeChange = e => {
        setPurpose(e.target.value);
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
          <label htmlFor="purposeInput">Purpose of room booking</label>
          <textarea id="purposeInput" type="text" name="purpose" className="form-control" value={purpose} onChange={handlePurposeChange}/>
          <button className="m-2" onClick={requestBook}>Request</button>
        </div>
      </div>
    )

}

export default BookRequestPopup;