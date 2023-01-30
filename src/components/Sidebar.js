import React from 'react';

const Sidebar = () => (
    <aside className="w-64 bg-gray-900 text-white py-10 px-6">
        <nav>
            <ul>
                <li className="mb-6">
                    <a href="#" className="text-white font-medium hover:text-gray-400">Home</a>
                </li>
                <li className="mb-6">
                    <a href="#" className="text-white font-medium hover:text-gray-400">About</a>
                </li>
                <li className="mb-6">
                    <a href="#" className="text-white font-medium hover:text-gray-400">Contact</a>
                </li>
                <li className="mb-6">
                    <a href="https://github.com/setavenger/nostr-anzeigen"
                       className="text-white font-medium hover:text-gray-400">Github</a>
                </li>
            </ul>
        </nav>
    </aside>
);

export default Sidebar