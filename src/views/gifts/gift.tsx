import { motion, useAnimation } from "motion/react";
import { type DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";
import { Box } from "./box";
import confetti from "@hiseb/confetti";
import { createPortal } from "react-dom";
import { classnames } from "@/helpers";
import { GIFTS } from "@/constants";

interface Props {
  index: number;
  disabled?: boolean;
  onClick?: () => void;
}

export const Gift = ({ index, disabled, onClick }: Props) => {
  const gift = GIFTS[index];
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [isOpeningGift, setIsOpeningGift] = useState(false);
  const controls = useAnimation();
  const presentRef = useRef<HTMLDivElement | null>(null);

  const startPlaying = () => {
    dotLottie?.setLoop(true);
    dotLottie?.play();
  };

  const stopPlaying = () => {
    dotLottie?.setLoop(false);
  };

  const startRevealTimer = () => {
    if (!isOpeningGift) return;
    controls.start("out");
  };

  const close = () => {
    setIsOpeningGift(false);
    controls.start("tucked");
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpeningGift) {
        close();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpeningGift, controls]);

  const boxWidth = Math.min(800, window.innerWidth * 0.8);
  const boxHeight = boxWidth * 0.5;
  const boxDepth = boxWidth;
  const boxAngle = 20;

  return (
    <>
      <motion.li
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        initial={{ opacity: 0, transform: "translateY(20px)" }}
        transition={{ delay: index * 0.3, type: "spring", damping: 20 }}
      >
        <button
          tabIndex={disabled ? -1 : 0}
          onClick={() => {
            if (disabled) return;
            setIsOpeningGift(true);
            onClick?.();
          }}
          onMouseEnter={startPlaying}
          onMouseLeave={stopPlaying}
          className={classnames(
            "cursor-pointer p-6 border border-indigo-200 rounded-2xl shadow-lg bg-white aspect-square flex flex-col items-center gap-2 justify-center hover:scale-105 active:scale-95 transition-transform w-full h-full",
            { "opacity-50 pointer-events-none": disabled },
          )}
        >
          <DotLottieReact
            src="/Gift box.lottie"
            dotLottieRefCallback={setDotLottie}
          />
        </button>
      </motion.li>

      {createPortal(
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 items-center justify-center backdrop-blur-md "
          variants={{
            hidden: { opacity: 0, display: "none" },
            visible: {
              opacity: 1,
              display: "flex",
              background: "rgba(30,20,90,0.3)",
            },
          }}
          initial="hidden"
          animate={isOpeningGift ? "visible" : "hidden"}
        >
          <div className="fixed top-0 left-0 w-full flex justify-end p-4">
            <button
              className="text-4xl text-white h-12 w-12 flex items-center justify-center"
              onClick={close}
            >
              &times;
            </button>
          </div>
          <motion.div
            className="fixed bottom-0 flex justify-center transform-3d"
            onAnimationComplete={startRevealTimer}
            variants={{
              hidden: {
                transform: "translateY(100%) rotateX(-5deg) rotateY(-190deg)",
              },
              visible: {
                transform: "translateY(0) rotateX(0deg) rotateY(0deg)",
                transition: {
                  type: "spring",
                  damping: 20,
                  velocity: 2,
                },
              },
            }}
          >
            <Box
              height={boxHeight}
              width={boxWidth}
              depth={boxDepth}
              angle={boxAngle}
            >
              <motion.div
                style={{ width: boxWidth, height: boxWidth }}
                onAnimationComplete={(def) => {
                  if (def !== "out" || !presentRef.current) return;

                  const presentRect =
                    presentRef.current.getBoundingClientRect();
                  confetti({
                    position: {
                      x: presentRect.left + presentRect.width / 2,
                      y: presentRect.top + presentRect.height / 2,
                    }, // Origin position
                    count: 40, // Number of particles
                    size: 4, // Size of the particles
                    velocity: 200, // Initial particle velocity
                    fade: false, // Particles fall off the screen, or fade out
                  });
                  controls.start("bounce");
                }}
                initial="tucked"
                animate={controls}
                variants={{
                  tucked: {
                    transform: "translateY(0%)",
                  },
                  out: {
                    transform: "translateY(-100%)",
                    transition: {
                      duration: 3,
                      type: "spring",
                      damping: 20,
                      delay: 3,
                    },
                  },
                  bounce: {
                    transform: "translateY(-110%)",
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "mirror",
                    },
                  },
                }}
                className="p-8 items-center justify-center rounded-lg relative"
              >
                <DotLottieReact
                  autoplay
                  className="w-full h-full inset-0"
                  loop
                  width={boxWidth}
                  height={boxWidth}
                  src="/Reward light effect.lottie"
                />
                <div
                  ref={presentRef}
                  className="absolute inset-0 w-full h-full flex flex-col gap-2 items-center justify-center p-[10dvw]"
                >
                  <div
                    className="m-auto w-full h-full flex flex-col justify-end items-center text-center text-shadow-white text-shadow-md"
                    style={{
                      backgroundImage: `url(${gift.imgSrc})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <p className="font-heading text-4xl mt-20">{gift.name}</p>
                    <span className="">{gift.description}</span>
                  </div>
                </div>
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>,
        document.body,
      )}
    </>
  );
};
