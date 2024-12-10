"use client"

// author: Tristin Bates
// December 2024

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherPage = () => {
  const [location, setLocation] = useState('Calgary');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const backgroundImage = "/images/background.jpeg"

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    const apiKey = 'WXTNRTQE5SVRKHBA5U24VLAJW';
    const baseUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;
    const unitGroup = 'metric';
    const contentType = 'json';

    // api call
    try {
      const response = await axios.get(
        `${baseUrl}/${location}`,
        {
          params: {
            unitGroup,
            key: apiKey,
            contentType,
          },
        }
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // easter egg
  const duckNoise = () => {
    const quack = new Audio("/sounds/quack.mp3");
    quack.play();
  }

  // dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
 
  // call on api to find weather
  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <div
      className={`relative min-h-screen p-6 font-sans transition-all duration-1000 ${
        isDarkMode
          ? 'bg-[url("/images/backgroundDark.jpeg")]'
          : 'bg-[url("/images/background.jpeg")]'
      } bg-cover bg-center`}
    >
       <div
        className={`absolute inset-0 backdrop-blur-md transition-colors duration-1000 ${
          isDarkMode ? 'bg-black/30' : 'bg-white/30'
        }`}
      ></div>
      
      
      <div className="relative z-10">
        <div className="font-medium">
          <button><img src={'images/moon.png'} className="relative w-10" onClick={toggleDarkMode}></img></button>
        </div>
        <img src={'/images/logo.png'} width={250} height={250} className="relative mx-auto" alt="logo" />

        <div 
	        className={`border-b-4 border-r-4 max-w-md mx-auto bg-white/50 p-6 shadow-md rounded-lg bg-opacity-90 transition-colors duration-1000 ${
 	        isDarkMode ? 'border-gray-700' : 'border-gray-200'
	      }`}>
          <div className="mb-4">

            <label className="block font-medium mb-2 text-gray-900">Enter location:</label>
            <div className="flex">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
              />
            </div>
          </div>

          {loading && <p className="text-center text-gray-500">Getting Weather Data...</p>}

          {error && <p className="text-center text-red-700 font-semibold">{error}</p>}

          {weatherData && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900">Weather Forecast for {weatherData.resolvedAddress}</h2>
              <p className="text-gray-900 mt-2">{weatherData.description}</p>
              <div className="mt-4 bg-blue-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-900">Current Conditions</h3>
                <p className="text-gray-900">Temperature: {weatherData.currentConditions.temp}°C</p>
                <p className="text-gray-900">Feels Like: {weatherData.currentConditions.feelslike}°C</p>
                <p className="text-gray-900">Time: {weatherData.currentConditions.datetime}</p>
              </div>

              <div className="mt-6">

                <h3 className="text-lg font-semibold text-gray-900">Daily Forecast</h3>
                <ul className="space-y-2">
                  {weatherData.days.map((day, index) => (
                  
                    <li key={index} className="flex justify-between bg-gray-100 p-2 rounded-md">
                      <span className="font-medium text-gray-900">{day.datetime}</span>
                      <span className="text-gray-900">
                        {day.temp}°C (Feels like {day.feelslike}°C)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-center text-gray-900">
                Powered by:{" "}
                <a className="underline hover:text-blue-500 active:text-purple-500 visited:text-purple-700" href="https://www.visualcrossing.com/" target="_blank" rel="noopener noreferrer">
                  https://www.visualcrossing.com/</a>
              </p>
            </div>
          )}
          <p className="text-center">
            <button className="text-gray-900" onClick={duckNoise}>By: Tristin Bates</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
