"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import BidForm from "./bid-form";

type LiveBidsProps = {
  maxBid: number;
};

export default function LiveBids({ maxBid }: LiveBidsProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .channel("bids")
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          supabase.channel("bids").send({
            type: "broadcast",
            event: "connected",
            payload: { user_id: "123" },
          });
        }
      })
      .on("broadcast", { event: "start" }, (payload) => {
        setIsActive(true);
      })
      .on("broadcast", { event: "stop" }, (payload) => {
        setIsActive(false);
      });

    return () => {
      supabase.channel("bids").unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Live Bids</h1>
      {isActive ? <BidForm maxBid={maxBid} /> : <p>No bids</p>}
    </div>
  );
}
