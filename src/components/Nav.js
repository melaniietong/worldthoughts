import React from 'react';

import '../styles/_import';

export default function Nav() {
    return (
        <nav className='
            flex row h-center v-center w-100 pos-rel bg-white
            header
        '>
            <li><a href="/" className='logo'>Worldthoughts</a></li>
            <li className='pos-fix menu-item'><a href="/create" className='menu'>Create</a></li>
        </nav>
    );
};