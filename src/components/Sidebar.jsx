import React from 'react'

const Sidebar = () => {
    return (
        <div className="relative">
            {/* Menu Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-3 text-xl fixed top-5 left-5 z-50 bg-white rounded-full shadow-md"
            >
                <FaBars />
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-2xl"
                    onClick={() => setIsOpen(false)}
                >
                    <FaTimes />
                </button>

                {/* Menu List */}
                <nav className="mt-16 p-6">
                    <ul className="space-y-4 text-lg">
                        <li className="cursor-pointer">New Arrivals</li>
                        <li className="cursor-pointer flex justify-between">
                            Trending <span>+</span>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            Superkicks <span>+</span>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            Men <span>+</span>
                        </li>
                        <li className="cursor-pointer flex justify-between">
                            Women <span>+</span>
                        </li>
                        <li className="cursor-pointer">Brands</li>
                        <li className="cursor-pointer">Blogs</li>
                        <li className="cursor-pointer text-red-500">Sale</li>
                    </ul>

                    {/* Bottom Section */}
                    <div className="mt-10 border-t pt-4">
                        <p className="font-bold">⚡ My Account</p>
                        <p className="mt-2">♡ Wishlist</p>

                        {/* Social Icons */}
                        <div className="flex gap-4 mt-4">
                            <FaFacebook className="text-xl cursor-pointer" />
                            <FaInstagram className="text-xl cursor-pointer" />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
