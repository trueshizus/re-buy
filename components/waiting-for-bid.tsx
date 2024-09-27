"use client";

import { useState, useEffect } from "react";

const AuctionSvg = () => (
  <svg
    fill="#000000"
    height="320px"
    width="320px"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    enableBackground="new 0 0 512 512"
  >
    <g>
      <g>
        <path d="m307.7,212.5c-10.2,12.7-6.6,28.7 2.2,37.5l13.6,12.6c15.3,15.4 34.4,5.3 39.6,0l59.4-58.9c7-7.1 13.8-26 0-40l-13.6-12.6c-10-10.1-27.5-10.5-38.2-1.3l-80.9-80.1c6.4-8.1 11.2-25.3-1.6-38.2l-13.6-12.6c-10.4-10.5-29.2-10.5-39.6,0l-59.4,58.9c-12.9,13-9.4,30.5 0,40l13.6,12.6c13.3,13.5 29.6,7.4 37,2.2l14.9,14.6-230.1,228.5 50,50.5 230.9-229.2 15.8,15.5zm76.2-47.7c2.9-3 7.5-3 11.5,1.1l13.6,12.6c2.4,2.5 2.5,6.9 0,9.5l-59.4,58.9c-3.1,3.2-8.3,3.2-11.5,0l-13.6-12.6c-2-2-4-6.5 0-10.5l59.4-59zm-27.2-1.1l-35.2,35-80-79.7 35.4-35.8 79.8,80.5zm-141.4-49c-3.1,3.2-8.3,3.2-11.5,0l-13.6-12.6c-2-2-4-6.5 0-10.5l59.4-58.9c2.9-3 7.5-3 11.5,1.1l13.6,12.6c2.4,2.5 2.5,6.9 0,9.5l-59.4,58.8zm-153.2,282.1l-21.9-21.1 215.4-214.3 21.7,21.3-215.2,214.1z" />
        <path d="m457.2,424.2v-55.8h-188.7v55.8h-43.8v76.8h276.3v-76.8h-43.8zm-167.8-35.8h148v35.8h-148v-35.8zm191.8,91.5h-235.6v-34.7h235.6v34.7z" />
      </g>
    </g>
  </svg>
);

const phrases = [
  "The auction will start soon...",
  "Preparing the bidding floor...",
  "Gathering the latest items...",
  "Polishing the gavel...",
  "Warming up the auctioneer...",
];

export default function WaitingForBid({
  activeUsers,
}: {
  activeUsers: string[];
}) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const totalUsers = activeUsers.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-lg text-muted-foreground mt-4 text-center pb-10">
        {phrases[currentPhraseIndex]}
      </p>
      <p className="text-sm text-muted-foreground text-center">
        {totalUsers} user{totalUsers === 1 ? " is" : "s are"} waiting for the
        auction to start
      </p>
      <div className="grid items-center h-96">
        <div className="size-80 mx-auto animate-spin duration-8000 bg-slate-500 rounded-full opacity-25">
          <AuctionSvg />
        </div>
      </div>
    </div>
  );
}
