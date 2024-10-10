import React from 'react';

function NavBar () {
    return (
        <nav className="w-full bg-gray-800 fixed top-0 left-0">
            <div className="container mx-auto flex justify-center h-16">
                <ul className="flex space-x-8">
                    <li><a href="#" className="text-white">Home</a></li>
                    <li><a href="#" className="text-white">About</a></li>
                    <li><a href="#" className="text-white">Services</a></li>
                    <li><a href="#" className="text-white">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;