import { classnames } from "@/helpers";
import { useUsedDates, useUsedGifts } from "@/hooks/use-used";
import { Page } from "@/layout/page";
import { Gift } from "./gift";
import { GIFTS } from "@/constants";

export const GiftsView = () => {
  const today = new Date().toISOString().split("T")[0];
  const usedDates = useUsedDates();
  const usedGifts = useUsedGifts();

  const isTodayUsed = usedDates.isItemUsed(today);

  const openGift = (gift: string) => {
    if (usedGifts.isItemUsed(gift) || isTodayUsed) {
      return;
    }
    usedDates.addUsedItem(today);
    usedGifts.addUsedItem(gift);
  };

  return (
    <Page className="bg-linear-to-br from-indigo-50 to-indigo-100">
      <Page.Center className="p-[5dvw]">
        <div className="flex flex-col items-center gap-8">
          <hgroup className="flex flex-col items-center gap-4">
            <h1 className="font-heading text-7xl leading-14 text-center">
              Saars verjaardags-vierdaagse
            </h1>
            <span className="text-center text-xl text-slate-600">
              Gefeliciteerd sat ❤️
            </span>
          </hgroup>
          {isTodayUsed && (
            <p className="text-center text-xl text-slate-600">
              Je hebt vandaag al een cadeautje uitgepakt! Morgen weer :)
            </p>
          )}
          {/* <button onClick={usedDates.resetUsedItems}>reset date</button> */}
          {/* <button onClick={usedGifts.resetUsedItems}>reset gifts</button> */}
          <ul
            className={classnames(
              "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl",
            )}
          >
            {GIFTS.map((item, index) => (
              <Gift
                onClick={() => openGift(item.name)}
                key={item.name}
                index={index}
                disabled={isTodayUsed || usedGifts.isItemUsed(item.name)}
              />
            ))}
          </ul>
        </div>
      </Page.Center>
    </Page>
  );
};
