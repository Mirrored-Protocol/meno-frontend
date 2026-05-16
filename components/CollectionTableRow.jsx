"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { MdVerified } from "react-icons/md";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { DISPLAY_ASSET_SYMBOL, formatPrice } from "../lib/utils";

export default function CollectionTableRow({
   collection,
   showFiat,
   onFavorite,
}) {
   const [isFavorited, setIsFavorited] = useState(false);

   const handleFavoriteClick = () => {
      setIsFavorited(!isFavorited);
      onFavorite && onFavorite(collection.id, !isFavorited);
   };

   const VolumeChangeIndicator = ({ change }) => {
      if (change > 0) {
         return (
            <span className="text-green-400 flex items-center justify-end">
               <GoTriangleUp className="w-3 h-3 mr-1" />+{change}%
            </span>
         );
      } else if (change < 0) {
         return (
            <span className="text-red-400 flex items-center justify-end">
               <GoTriangleDown className="w-3 h-3 mr-1" />
               {change}%
            </span>
         );
      }
      return <span className="text-gray-400">{change}%</span>;
   };

   return (
      <tr className="border-b border-gray-800 hover:bg-black/30 transition-colors text-sm md:text-base lg:text-lg">
         {/* Favorite & Rank */}
         <td className="px-4 py-4">
            <div className="flex items-center space-x-3">
               <button
                  onClick={handleFavoriteClick}
                  className="text-gray-400 hover:text-yellow-400 transition-colors focus:outline-none" // Focus outline removed - edit focus styles here
                  aria-label="Add to favorites">
                  <Star
                     size={16}
                     fill={isFavorited ? "#fbbf24" : "none"}
                     className={isFavorited ? "text-yellow-400" : ""}
                  />
               </button>
               <span className="text-gray-400 font-medium">
                  {collection.rank}
               </span>
            </div>
         </td>

         {/* Collection Info */}
         <td className="px-4 py-4">
            <div className="flex items-center space-x-3">
               <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                  {collection.image ? (
                     <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                     />
                  ) : (
                     <div className="text-lg">🖼️</div>
                  )}
               </div>
               <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">
                     {collection.name}
                  </span>
                  {collection.verified && (
                     <MdVerified className="text-verifyGreen w-4 h-4" />
                  )}
               </div>
            </div>
         </td>

         {/* Floor Price */}
         <td className="px-4 py-4">
            <div className="text-right">
               <div className="text-white font-medium">
                  {formatPrice(collection.floor, showFiat)}
               </div>
            </div>
         </td>

         {/* Top Offer */}
         <td className="px-4 py-4">
            <div className="text-right">
               <div className="text-white font-medium">
                  {formatPrice(collection.topOffer, showFiat)}
               </div>
            </div>
         </td>

         {/* Listed Count */}
         <td className="px-4 py-4">
            <div className="text-right">
               <div className="text-white font-medium">
                  {collection.listedCount}
               </div>
            </div>
         </td>

         {/* Volume */}
         <td className="px-4 py-4">
            <div className="text-right">
               <VolumeChangeIndicator change={collection.volumeChange} />
            </div>
         </td>
      </tr>
   );
}
