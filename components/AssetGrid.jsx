"use client";
import { useState } from "react";
import AssetCard from "./AssetCard";
import Toggle from "./Toggle";
import Pagination from "./Pagination";
import { collectionRankingData } from "../data/CollectionRankingData";

export default function AssetGrid() {
   const [activeFilter, setActiveFilter] = useState("All");
   const [showFiat, setShowFiat] = useState(false);
   const [activeTimeFilter, setActiveTimeFilter] = useState("1D");
   const [currentPage, setCurrentPage] = useState(1);

   const filters = ["All", "Top", "Rare"];
   const timeFilters = ["6h", "12h", "1D", "7D", "30D"];
   const itemsPerPage = 6;

   // Use the first 6 collections from your data
   const featuredCollections = collectionRankingData
      .slice(0, 6)
      .map((item) => ({
         id: item.id,
         name: item.name,
         image: item.image,
         floorPrice: item.floor,
         change24h: item.volumeChange,
         verified: item.verified,
         category: item.category,
         volume: item.volume,
      }));

   const filteredCollections = featuredCollections.filter((collection) => {
      if (activeFilter === "All") return true;
      return collection.category === activeFilter.toLowerCase();
   });

   const totalPages = Math.ceil(filteredCollections.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const displayedCollections = filteredCollections.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   return (
      <section className="px-4 md:px-6 lg:px-12 py-16 bg-black">
         {/* Featured Header */}
         <div className="mb-8">
            <h2 className="text-white text-3xl pixel-text font-bold tracking-wider">
               FEATURED
            </h2>
         </div>

         {/* Asset Grid - 3x2 layout to match the image */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedCollections.map((collection) => (
               <AssetCard
                  key={collection.id}
                  collection={collection}
                  showFiat={showFiat}
               />
            ))}
         </div>

         {/* Pagination */}
         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
         />
      </section>
   );
}
