import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <p className="copyright">&copy; {new Date().getFullYear()} Nicholas Mertz. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;