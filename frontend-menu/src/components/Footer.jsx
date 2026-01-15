import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Restaurant E-Menu. All rights reserved.</p>
      </div>
    </footer>
  );
}
