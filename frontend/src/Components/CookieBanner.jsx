// CookieBanner.js
import React, { useState } from 'react';


const CookieBanner = () => {
  const [visible, setVisible] = useState(true);

  const handleAccept = () => {
    setVisible(false);
    // You can set a cookie here if needed, using a library like js-cookie
  };

  if (!visible) return null;

  return (
    <>
    <div className="cookie-banner">
      <p>This website uses cookies to ensure you get the best experience. 
         <button onClick={handleAccept}>Okay</button>
      </p>
    </div>
    </>
  );
};

export default CookieBanner;
