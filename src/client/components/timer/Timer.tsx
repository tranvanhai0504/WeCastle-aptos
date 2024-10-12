import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp }: { expiryTimestamp: Date }) {
  const [isShowing, setIsShowing] = useState(true);
  const { isRunning, minutes, hours, restart, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsShowing(false);
    },
    autoStart: true,
  });

  useEffect(() => {
    setIsShowing(true);
    restart(expiryTimestamp, true);
  }, [expiryTimestamp, restart]);

  return (
    <div style={{ textAlign: "center" }}>
      {isShowing && (
        <>
          <span>{hours}</span>h<span>{minutes}</span>m<span>{seconds}</span>s
        </>
      )}
    </div>
  );
}
