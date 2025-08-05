import React, { useEffect, useState } from 'react';
import bannerpic from '../../../../assets/Images/main banner.jpg';

const UPcomeing = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + 1); // 24 hours from now

        const timer = setInterval(() => {
            const now = new Date();
            const diff = endTime - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <img
                className="w-full h-full object-cover brightness-75"
                src={bannerpic}
                alt="Upcoming Banner"
            />
            <div className="absolute inset-0 md:-ml-[600px] flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-2xl md:text-3xl text-yellow-300 animate-pulse">Great Deal</h1>
                <h1 className="text-4xl md:text-5xl font-bold mt-3 drop-shadow-lg">All New Collection</h1>

                {/* Countdown Timer */}
                <div className="flex gap-4 mt-8">
                    {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => {
                        const value = [
                            timeLeft.days,
                            timeLeft.hours,
                            timeLeft.minutes,
                            timeLeft.seconds,
                        ][index];

                        return (
                            <div
                                key={label}
                                className="shadow bg-opacity-10 backdrop-blur-md px-2   rounded-lg  border border-yellow-400 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-lg font-bold text-fuchsia-500">
                                    {String(value).padStart(2, '6')}
                                </div>
                                <div className="text-xs tracking-wider">{label}</div>
                            </div>
                            
                        );
                    })}
                </div>

                {/* Button */}
                <button className="mt-8 btn btn-warning px-6 py-2 hover:scale-105 transition-all duration-300 shadow-md hover:btn-secondary">
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default UPcomeing;
