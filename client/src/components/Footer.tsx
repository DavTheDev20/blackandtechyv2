import React from 'react';

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer>
      <p>© Davin Reid {currentYear}</p>
    </footer>
  );
};

export default Footer;
