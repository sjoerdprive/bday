import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const useUsed = (key: string) => {
  const usedItemsAtom = atomWithStorage(key, [] as string[]);
  const [usedItems, setUsedItems] = useAtom(usedItemsAtom);

  const addUsedItem = (item: string) => {
    const newUsedItems = [...usedItems, item];
    setUsedItems(newUsedItems);
  };

  const resetUsedItems = () => {
    setUsedItems([]);
  };

  const isItemUsed = (item: string) => {
    return usedItems.includes(item);
  };

  return { usedItems, addUsedItem, resetUsedItems, isItemUsed };
};

export const useUsedDates = () => useUsed("usedDates");
export const useUsedGifts = () => useUsed("usedGifts");
