import { Pencil, UserCircle } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Ajit Kushwaha",
    username: "ajitkushwaha3101",
    email: "ajitkushwahacse@gmail.com",
    phone: "+91 8178739633",
    address: "123 Main Street, New York, USA",
    joined: "Mar 2025",
    deliveries: 10,
    accountType: "Premium",
    avatar: null, // Replace with image URL if available
  };

  return (
    <div className="min-h-[92vh] py-12 px-4">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
          <h2 className="text-2xl font-semibold tracking-wide flex items-center gap-2">
            👤 User Profile
          </h2>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium shadow">
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
              />
            ) : (
              <UserCircle className="w-28 h-28 text-gray-500" />
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-sm w-full">
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">
                Full Name
              </div>
              <div className="text-lg font-medium">{user.name}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">
                Username
              </div>
              <div>@{user.username}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">Email</div>
              <div>{user.email}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">Phone</div>
              <div>{user.phone}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">
                Address
              </div>
              <div>{user.address}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">Joined</div>
              <div>{user.joined}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">
                Total Deliveries
              </div>
              <div>{user.deliveries}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs mb-1">
                Account Type
              </div>
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-600 rounded">
                {user.accountType}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
