import { Countdown } from "@/components/countdown";
import { END_DATE } from "@/constants";
import { getDaysLeft, getPercentageOfDay } from "@/helpers";
import { Page } from "@/layout/page";
import { useEffect, useState, type CSSProperties } from "react";
import CountdownTimer from "react-countdown";

export const CountdownView = () => {
  const percentageOfDay = getPercentageOfDay();
  //   const percentageOfDay = getPercentageOfDay();

  const [displayNumberOfDays, setDisplayNumberOfDays] = useState(0);

  const createCurve = (percentage: number) => {
    return 15 + (-1 * Math.pow(percentage, 2) + 100 * percentage) / 40;
  };

  const dayPercentageCurve = createCurve(percentageOfDay);

  useEffect(() => {
    if (displayNumberOfDays < getDaysLeft()) {
      setTimeout(
        () => setDisplayNumberOfDays(displayNumberOfDays + 1),
        10 * displayNumberOfDays,
      );
    }
  }, [displayNumberOfDays, percentageOfDay]);

  return (
    <Page
      style={
        {
          "--from-color": `hsl(${Math.max(dayPercentageCurve - 80, 200)}, ${100 - dayPercentageCurve / (dayPercentageCurve / 10)}%, ${dayPercentageCurve - 10}%)`,
          "--to-color": `hsl(${Math.max(dayPercentageCurve + 120, 100)}, ${100 - dayPercentageCurve / (dayPercentageCurve / 10)}%, ${dayPercentageCurve - 20}%)`,
        } as CSSProperties
      }
      className="bg-linear-to-b from-(--from-color) to-(--to-color) "
    >
      <Page.Center>
        <Countdown>
          <h1 className="text-2xl">
            <CountdownTimer
              onComplete={() => window.location.reload()}
              date={END_DATE}
            />
          </h1>
        </Countdown>
        {/* 
        <input
          type="range"
          min="0"
          max="100"
          value={percentageOfDay}
          onChange={(e) => setPercentageOfDay(Number(e.target.value))}
        /> */}
      </Page.Center>
    </Page>
  );
};
