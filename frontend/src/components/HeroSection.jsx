import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return; // optional: prevent empty search
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="relative bg-gradient-to-r from-[#6A38C2] to-[#F83002] text-white py-20 px-4 md:px-0">
            <div className="max-w-7xl mx-auto text-center">
                <span className="inline-block mb-4 px-6 py-2 rounded-full bg-white/20 font-semibold uppercase tracking-wide text-sm">
                    No. 1 Job Hunt Website
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mb-6">
                    Search, Apply & <br /> Get Your <span className="text-yellow-300">Dream Job</span>
                </h1>

                <p className="max-w-2xl mx-auto text-gray-100 mb-10 text-lg md:text-xl">
                    Explore thousands of jobs from top companies. Find your perfect role and take the next step in your career today.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full md:w-[60%] mx-auto shadow-lg rounded-full bg-white overflow-hidden">
                    <input
                        type="text"
                        placeholder="Find your dream job..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-6 py-4 text-gray-800 text-lg md:text-base outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 px-6 py-4 rounded-full md:rounded-r-full transition-colors duration-300 flex items-center justify-center"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
