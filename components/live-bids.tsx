"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import BidForm from "./bid-form";
import WaitingForBid from "@/components/waiting-for-bid";
type LiveBidsProps = {
  maxBid: number;
  user_name: string;
};

type Listing = {
  name: string;
  description: string;
  cover: string;
};

export default function LiveBids({ maxBid, user_name }: LiveBidsProps) {
  const [isActive, setIsActive] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [listing, setListing] = useState<Listing>();
  const [totalBids, setTotalBids] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    const supabase = createClient();
    supabase
      .channel("bids")
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          supabase.channel("bids").send({
            type: "broadcast",
            event: "connected",
            payload: { user_name },
          });
        }
      })
      .on("broadcast", { event: "start" }, ({ payload }) => {
        setIsActive(true);
        setListing(payload.listing);
      })
      .on("broadcast", { event: "stop" }, (payload) => {
        setIsActive(false);
      })
      .on("broadcast", { event: "bid_placed" }, (payload) => {
        setTotalBids((prev) => prev + 1);
      })
      .on("broadcast", { event: "finish" }, (payload) => {
        setIsFinished(true);
      })
      .on("broadcast", { event: "connected" }, (payload) => {
        setActiveUsers((prev) => [...prev, payload.user_name]);
      });

    return () => {
      supabase.channel("bids").unsubscribe();
    };
  }, []);

  return (
    <div>
      {isActive && listing && !isFinished ? (
        <>
          <p>Total Bids: {totalBids}</p>
          <BidForm maxBid={maxBid} listing={listing} />
        </>
      ) : (
        <WaitingForBid activeUsers={activeUsers} />
      )}
      {isFinished && <p>Finished</p>}
    </div>
  );
}
