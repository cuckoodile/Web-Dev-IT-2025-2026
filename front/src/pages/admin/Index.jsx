import React from 'react';
import { Outlet, Link } from 'react-router';

const AdminIndex = () => {
  return (
    <div className="admin-layout">
      
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminIndex;