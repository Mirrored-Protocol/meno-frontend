"use client";
import { motion } from "framer-motion";

export default function ActionSection() {
   const actions = [
      {
         title: "Buy",
         description: "Acquire assets from curated collections",
         icon: "/images/Buy.png",
         color: "from-blue-500 to-cyan-500",
      },
      {
         title: "Sell",
         description: "List holdings and settle into marketplace liquidity",
         icon: "/images/Sell.png",
         color: "from-green-500 to-emerald-500",
      },
      {
         title: "Payout",
         description: "Request bank settlement for supported asset positions",
         icon: "/images/OffRamp.png",
         color: "from-purple-500 to-pink-500",
      },
   ];

   return (
      <section className="px-4 md:px-6 lg:px-12 py-16">
         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-menoGreen pixel-text mb-4">
               TRADE DIGITAL ASSETS, THEN REQUEST PAYOUT
            </h2>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action, index) => (
               <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center">
                  <motion.div
                     className="w-96 h-96 mx-auto mb-6 flex items-center justify-center"
                     whileHover={{
                        rotate: [-2, 2, -2, 2, 0],
                        y: [-2, -4, -2, 0],
                        transition: {
                           duration: 0.6,
                           ease: "easeInOut",
                        },
                     }}>
                     <img
                        src={action.icon}
                        alt={action.title}
                        className="w-96 h-96 object-contain"
                     />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-white mb-3">
                     {action.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                     {action.description}
                  </p>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
