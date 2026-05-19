"use client";
import { useState, useEffect } from "react";
import AssetCard from "./AssetCard";
import Pagination from "./Pagination";
import { fetchCollections } from "../lib/api";

export default function AssetGrid() {
   const [allCollections, setAllCollections] = useState([]);
   const [loading, setLoading] = useState(true);
   const [activeFilter, setActiveFilter] = useState("All");
   const [showFiat, setShowFiat] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);

   const filters = ["All", "Top", "Rare"];
   const itemsPerPage = 6;

   useEffect(() => {
      fetchCollections()
         .then((data) =>
            setAllCollections(
               data.map((c) => ({
                  id: c.id,
                  name: c.name,
                  image: c.image,
                  floorPrice: c.floor,
                  change24h: c.volumeChange,
                  verified: c.verified,
                  category: c.category,
                  volume: c.volume,
               }))
            )
         )
         .catch(console.error)
         .finally(() => setLoading(false));
   }, []);

   const filteredCollections = allCollections.filter((c) => {
      if (activeFilter === "All") return true;
      return c.category === activeFilter.toLowerCase();
   });

   const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const displayedCollections = filteredCollections.slice(startIndex, startIndex + itemsPerPage);

   return (
      <section className="px-4 md:px-6 lg:px-12 py-16 bg-black">
         {/* Featured Header */}
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-3xl pixel-text font-bold tracking-wider">
               FEATURED
            </h2>
            <div className="flex gap-2">
               {filters.map((f) => (
                  <button
                     key={f}
                     onClick={() => { setActiveFilter(f); setCurrentPage(1); }}
                     className={`px-3 py-1 rounded text-sm focus:outline-none transition-colors ${
                        activeFilter === f
                           ? "bg-menoGreen text-black font-semibold"
                           : "text-gray-400 hover:text-white"
                     }`}>
                     {f}
                  </button>
               ))}
            </div>
         </div>

         {loading ? (
            <div className="text-center text-gray-400 py-16">Loading...</div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {displayedCollections.map((collection) => (
                     <AssetCard
                        key={collection.id}
                        collection={collection}
                        showFiat={showFiat}
                     />
                  ))}
               </div>
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
               />
            </>
         )}
      </section>
   );
}
