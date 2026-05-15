"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({ enableParallax = true, enableEntrance = true }) {
   const containerRef = useRef(null);
   const { scrollY } = useScroll();

   const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
   const backgroundScale = useTransform(scrollY, [0, 500], [1, 0.8]);
   const foregroundY = useTransform(scrollY, [0, 500], [0, -100]);

   const entranceVariants = {
      hidden: { opacity: 0, y: 100, scale: 0.95 },
      visible: {
         opacity: 1,
         y: 0,
         scale: 1,
         transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
         },
      },
   };

   const imageVariants = {
      hidden: { y: -100, opacity: 0 },
      visible: {
         y: 0,
         opacity: 1,
         transition: {
            type: "spring",
            stiffness: 100,
            damping: 8,
            mass: 1.5,
            delay: 0.5,
            duration: 2,
         },
      },
   };

   const backgroundVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.8,
            ease: "easeOut",
         },
      },
   };

   return (
      <section
         ref={containerRef}
         className="relative min-h-[45vh] md:min-h-[70vh] overflow-hidden bg-[#0e0e0e] text-white px-4 md:px-8 lg:px-12">
         {/* Background "AKUMA" Text */}
         <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={
               enableParallax ? { y: backgroundY, scale: backgroundScale } : {}
            }
            variants={enableEntrance ? backgroundVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            {/* 🎯 AKUMA TEXT SIZE CONTROLS - Adjust these values to get perfect sizing */}
            <h1 className="text-[clamp(5rem,18vw,30rem)] md:text-[clamp(12rem,22vw,35rem)] lg:text-[clamp(16rem,21vw,38rem)] font-black text-white uppercase pixel-text leading-none select-none tracking-normal ">
               AKUMA
            </h1>
         </motion.div>

         {/* Character Image - Absolutely positioned */}
         <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={enableParallax ? { y: foregroundY } : {}}
            variants={enableEntrance ? entranceVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            {/* 🎯 IMAGE SIZE & MARGIN CONTROLS - Adjust these values to get perfect sizing */}
            <motion.img
               src="/akuma-characters.png"
               alt="Akuma Collection Characters"
               className="w-[calc(55%+12vw)] md:w-[calc(60%+8vw)] lg:w-[calc(65%+5vw)] max-w-[800px] min-w-[320px] object-contain mt-[2vh] md:mt-[4vh] lg:mt-[6vh]"
               variants={imageVariants}
               initial="hidden"
               animate="visible"
            />
         </motion.div>

         {/* Bottom Section - Absolutely positioned with better control */}
         <motion.div
            className="absolute left-0 right-0 flex justify-between items-end p-4 md:p-8 lg:p-12"
            style={{
               bottom: "clamp(1rem, 2vh, 2rem)", // 🎯 BOTTOM POSITION CONTROL - Adjust this to move button up/down
               ...(enableParallax ? { y: foregroundY } : {}),
            }}
            variants={enableEntrance ? entranceVariants : {}}
            initial={enableEntrance ? "hidden" : "visible"}
            animate="visible">
            {/* View Collection Button - Far Left */}
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="gradient-button text-black font-semibold px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-xl text-sm md:text-base lg:text-lg">
               View Collection
            </motion.button>

            {/* Floor Price - Far Right */}
            <div className="text-right">
               <p className="text-xs md:text-sm text-gray-400 mb-1">
                  Floor Price
               </p>
               <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">
                  10 XLM
               </p>
            </div>
         </motion.div>
      </section>
   );
}
