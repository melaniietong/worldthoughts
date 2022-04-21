import React from 'react';

import '../styles/_import';

export default function Nav() {
    return (
        <nav className='flex row h-center v-center w-100 pos-fix pb-20 pt-20 bg-white nav'>
            <li><a href="/" className='logo text-blue-300'>Worldthoughts</a></li>
            <li className='pos-fix menu-item'><a href="/create" className='menu text-black'>Create</a></li>
        </nav>
    );
};