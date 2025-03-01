import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} DinoDuels. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Made with ❤️ by <a href="https://example.com" className="underline">Your Team</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;