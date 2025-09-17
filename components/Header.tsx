
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-blue-600">
          <path d="M12.75 12.75a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12.75Z" />
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 2.255l-1.297.973c-.73.55-1.63.856-2.553.856h-.094c-.652-.011-1.282-.22-1.823-.585l-1.135-.682a.75.75 0 0 0-.63-.017l-1.736.963a.75.75 0 0 1-.965-.488l-1.205-4.52A3 3 0 0 1 1.5 4.5Zm12.589-1.872a1.875 1.875 0 0 0-1.819-1.42h-1.372a3 3 0 0 0-3 3v4.52l1.205 4.52a.75.75 0 0 0 .965.488l1.736-.962a.75.75 0 0 1 .63.017l1.135.682c.54.365 1.17.574 1.823.585h.094c.923 0 1.823-.306 2.553-.856l1.297-.973a1.875 1.875 0 0 0 .694-2.255l-1.105-4.423A1.875 1.875 0 0 0 14.09 2.628Z" clipRule="evenodd" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
          Family School Ride Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;
   