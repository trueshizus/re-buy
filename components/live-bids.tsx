"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import BidForm from "./bid-form";
import WaitingForBid from "@/components/waiting-for-bid";
type LiveBidsProps = {
  maxBid: number;
  user_name: string;
};

export default function LiveBids({ maxBid, user_name }: LiveBidsProps) {
  const [isActive, setIsActive] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

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
      .on("broadcast", { event: "start" }, (payload) => {
        setIsActive(true);
      })
      .on("broadcast", { event: "stop" }, (payload) => {
        setIsActive(false);
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
      {isActive ? (
        <BidForm maxBid={maxBid} />
      ) : (
        <WaitingForBid activeUsers={activeUsers} />
      )}
    </div>
  );
}
