import { useState } from "react";
import "./App.css";
import { getDaysLeft } from "./helpers";
import { Page } from "./layout/page";
import { CountdownView } from "./views/countdown";
import { FloatToggle } from "./components/float-toggle";

function App() {
  const daysLeft = getDaysLeft();

  const [isTodayTheDay, setIsTodayTheDay] = useState(daysLeft === 0);

  return (
    <>
      {isTodayTheDay ? <Page>Herro</Page> : <CountdownView />}
      <FloatToggle onClick={() => setIsTodayTheDay((prev) => !prev)} />
    </>
  );
}

export default App;
