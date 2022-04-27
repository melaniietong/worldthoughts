import React from 'react';

import '../styles/_import';

export default function Nav() {
  return (
    <nav className="nav flex row w-100 h-center v-center pos-fix pt-20 pb-20 bg-white">
      <li><a href="/" className="logo text-blue-300">Worldthoughts</a></li>
      <li className="menu pos-fix"><a href="/create" className="text-black">Create</a></li>
    </nav>
  );
}
