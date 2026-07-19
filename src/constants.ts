import type { Gift } from "./types";

export const END_DATE = new Date("2026-07-21");

export const GIFTS: Gift[] = [
  {
    name: "Fnoep",
    description: "Lekker smikkelen",
    imgSrc: "/snoep.png",
  },
  {
    name: "Skank care",
    description: "Ook al ben je zonder ook knap",
    imgSrc: "/skincare.png",
  },
  {
    name: "Boeken",
    description: "Een van Dua en een van mij",
    imgSrc: "/boeken.png"
  },
  {
    name: "Couples massage",
    description: "Als je wil, anders kan ik ook wat anders uitzoeken",
    imgSrc: "/spa.png"
  }
];
