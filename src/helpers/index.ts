import { differenceInDays } from "date-fns";
import { END_DATE } from "../constants";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function getDaysLeft(endDate: Date = END_DATE): number {
  const now = new Date();
  const timeDiff = differenceInDays(endDate, now) + 1;
  return timeDiff;
}

export function classnames(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

export function getPercentageOfDay() {
  const hoursLeftInDay = 24 - new Date().getHours();
  const dayPercentage = 100 - Number(((hoursLeftInDay / 24) * 100).toFixed(2));
  return dayPercentage;
}
