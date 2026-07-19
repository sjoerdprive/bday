import type { ClassValue } from "clsx";
import clsx from "clsx";
import { differenceInCalendarDays } from "date-fns";
import { twMerge } from "tailwind-merge";
import { END_DATE } from "../constants";

export function getDaysLeft(endDate: Date = END_DATE): number {
  const now = new Date();
  const timeDiff = differenceInCalendarDays(endDate, now);
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
