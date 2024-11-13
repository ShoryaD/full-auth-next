import React from "react";

export default function Profile() {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-950">
            <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
                <div>
                    <img
                        src="/next.svg" 
                        alt="Logo"
                        className="w-24 h-24 rounded-full"
                    />
                </div>

                <div className="flex space-x-4 mt-4">
                    <button className="px-4 py-2 bg-blue-950 text-white rounded-md shadow hover:bg-blue-800 transition-colors duration-200">
                        Edit Profile
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-500 transition-colors duration-200">
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}
