import React from 'react';
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { SiOsu } from "react-icons/si";

export default function Kewl() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-primary text-white gap-5">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto my-10 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 m-3">Hey! 👋</h2>
        </div>
        <div className="text-gray-600 mb-6">
          <p className="mb-2 text-xl m-3">Nice to meet you!</p>
          <p className="mb-2 text-xl m-3">My name is <strong>Philip Wu</strong>, I am a: </p>
          <ul className="list-disc list-inside space-y-1 m-3">
            <li>CS Junior threading in SysArch + Info</li>
            <li>Former clarinet in the Marching Band, now playing in concert ensembles</li>
            <li>ECE 2031 TA</li>
            <li>Networking researcher</li> 
          </ul>
          <p className="mb-2 text-xl m-3">Off campus, I like to</p>
          <ul className="list-disc list-inside space-y-1 m-3">
            <li>🥘Cook dishes from all sorts of cuisines! </li>
            <li>🏋Lift weights in The Mark's resident gym (hmu if you want to help me achieve a 2 plate bench this semester!)</li>
            <li>🎧Listen to all sorts of music, but particularly rock 🎸! Looking to get into hip-hop tho, welcoming any recs!</li>
          </ul>
          <p className="mb-2 text-xl m-3 mt-6">Find me below to learn me about me, or for a quick chat! </p>
          <div className="flex justify-center items-center space-x-12 p-6 pb-1">
            <a href="https://www.linkedin.com/in/philip-wu-918250200/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin 
                className="transform hover:scale-105 transition-transform duration-300 ease-in-out" 
                size={64} 
                color="#0072b1"
              />
            </a>
            <a href="https://www.instagram.com/philipxunwu/" target="_blank" rel="noopener noreferrer">
              <FaSquareInstagram 
                className="transform hover:scale-105 transition-transform duration-300 ease-in-out" 
                size={64} 
                color="#C13584"
              />
            </a>
            <a href="https://osu.ppy.sh/users/12146554" target="_blank" rel="noopener noreferrer">
              <SiOsu
                className="transform hover:scale-105 transition-transform duration-300 ease-in-out" 
                size={64} 
                color="#ffb6c1"
              />
            </a>
          </div>
        </div>
      </div> 
    </div>
  );
}
