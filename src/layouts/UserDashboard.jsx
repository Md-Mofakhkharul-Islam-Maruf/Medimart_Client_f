import { Outlet, NavLink, Link } from 'react-router';

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-400 shadow-md p-6 space-y-4">
        <Link to='/' className='flex items-center gap-2 lg: mt-10'>
          <IoHomeSharp size={38} /><p className='text-gray-600 hover:text-gray-700 text-2xl font-semibold'>Go Home</p>
        </Link>
        <nav className="space-y-2">
          <NavLink
            to="/user/payment-history"
            end
            className={({ isActive }) =>
              isActive
                ? 'block p-2 rounded bg-gray-600 text-white font-semibold'
                : 'block p-2 rounded hover:bg-gray-300 text-gray-700'
            }
          >
            Payment History
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
