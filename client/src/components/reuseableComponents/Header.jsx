import {
  Bell,
  UserCircle,
  PlusCircle,
  LogOut,
  Settings,
  PackageCheck,
  ClipboardList,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const user = {
    name: "Ajit Kushwaha",
    avatar: null, // Use actual URL if available
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-gray-900 text-white shadow-md px-6 py-3 flex items-center justify-end">
      <div className="flex items-center space-x-6 relative">
        <button
          onClick={() => {
            navigate("/package-booking");
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          Create Pickup
        </button>

        <button className="hover:text-gray-300">
          <Bell className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            // navigate("/wallet");
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Wallet className="w-5 h-5" />
          ₹ 0
        </button>

        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 px-3 py-1.5 rounded-lg transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-blue-500"
              />
            ) : (
              <UserCircle className="w-8 h-8 text-gray-400" />
            )}
            <span className="text-sm font-medium">{user.name}</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50 overflow-hidden">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                <User className="w-4 h-4" />
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                My Orders
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                <PackageCheck className="w-4 h-4" />
                My Pickups
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <div className="border-t my-1" />
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
