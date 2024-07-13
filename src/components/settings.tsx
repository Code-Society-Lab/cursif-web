import { useState } from 'react';

export default function SettingsDropdown({ user }: { user: { username: string; email: string; profilePicture: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleDropdown} className="relative z-10 flex items-center p-2 text-sm bg-component rounded-md">
        <span className="mx-1">Settings</span>
        <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
        </svg>
      </button>

      {isOpen && (<div onClick={closeDropdown} className="fixed inset-0 h-full w-full z-10"></div>)}

      <div className={`absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-modal rounded-md shadow-xl ${isOpen ? 'block' : 'hidden'}`}>
        <p className="flex items-center p-3 -mt-2 text-sm">
          {user.profilePicture ? (
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
              src={user.profilePicture}
              alt={`${user.username} avatar`}
            />
          ) : (
            <div className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 bg-red-500 text-white flex items-center justify-center">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="mx-1">
            <h1 className="text-sm font-semibold">{user.username}</h1>
            <p className="text-sm">{user.email}</p>
          </div>
        </p>

        <hr className="border-gray-200" />

        <a href="#" className="block px-4 py-3 text-sm transition-colors duration-300 transform hover:bg-gray-400">
          Settings
        </a>
        <a href="/logout" className="block px-4 py-3 text-sm transition-colors duration-300 transform hover:bg-gray-400">
          Log Out
        </a>
      </div>
    </div>
  );
}