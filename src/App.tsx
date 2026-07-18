import { useState, useEffect } from "react";
import "./App.css";
import { FloatToggle } from "./components/float-toggle";
import { getDaysLeft } from "./helpers";
import { CountdownView } from "./views/countdown";
import { GiftsView } from "./views/gifts";

function App() {
  const daysLeft = getDaysLeft();
  const [showToggle, setShowToggle] = useState(true);

  const [isTodayTheDay, setIsTodayTheDay] = useState(daysLeft === 0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "t") {
        setShowToggle((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {isTodayTheDay ? <GiftsView /> : <CountdownView />}
      {showToggle && (
        <FloatToggle onClick={() => setIsTodayTheDay((prev) => !prev)} />
      )}
    </>
  );
}

export default App;
