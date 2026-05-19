"use client";
import { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown, Star } from "lucide-react";
import CollectionTableRow from "./CollectionTableRow";
import Pagination from "./Pagination";
import Toggle from "./Toggle";
import { fetchCollections } from "../lib/api";
import { filterCategories, timeFilters } from "../data/CollectionRankingData";

export default function CollectionTable() {
   const [collections, setCollections] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [activeFilter, setActiveFilter] = useState("all");

   useEffect(() => {
      fetchCollections()
         .then((data) => {
            setCollections(data.map((c, i) => ({ ...c, rank: i + 1 })));
         })
         .catch((err) => setError(err.message))
         .finally(() => setLoading(false));
   }, []);
   const [activeTimeFilter, setActiveTimeFilter] = useState("1d");
   const [sortField, setSortField] = useState("rank");
   const [sortDirection, setSortDirection] = useState("asc");
   const [favorites, setFavorites] = useState(new Set());
   const [showFiat, setShowFiat] = useState(false);

   const itemsPerPage = 10;

   // Filter and sort data
   const filteredAndSortedData = useMemo(() => {
      let filtered = collections;

      // Apply category filter
      if (activeFilter === "favorites") {
         filtered = filtered.filter((item) => favorites.has(item.id));
      } else if (activeFilter !== "all") {
         filtered = filtered.filter((item) => item.category === activeFilter);
      }

      // Apply sorting
      const sorted = [...filtered].sort((a, b) => {
         let aValue = a[sortField];
         let bValue = b[sortField];

         if (typeof aValue === "string") {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
         }

         if (sortDirection === "asc") {
            return aValue > bValue ? 1 : -1;
         } else {
            return aValue < bValue ? 1 : -1;
         }
      });

      return sorted;
   }, [activeFilter, sortField, sortDirection, favorites]);

   // Pagination
   const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const paginatedData = filteredAndSortedData.slice(
      startIndex,
      startIndex + itemsPerPage
   );

   const handleSort = (field) => {
      if (sortField === field) {
         setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
         setSortField(field);
         setSortDirection("asc");
      }
   };

   const handleFavorite = (collectionId, isFavorited) => {
      const newFavorites = new Set(favorites);
      if (isFavorited) {
         newFavorites.add(collectionId);
      } else {
         newFavorites.delete(collectionId);
      }
      setFavorites(newFavorites);
   };

   const SortIcon = ({ field }) => {
      if (sortField !== field) return null;
      return sortDirection === "asc" ? (
         <ChevronUp size={16} className="text-menoGreen" />
      ) : (
         <ChevronDown size={16} className="text-menoGreen" />
      );
   };

   if (loading) {
      return (
         <div className="bg-black rounded-xl border border-gray-800 p-12 text-center text-gray-400">
            Loading collections...
         </div>
      );
   }

   if (error) {
      return (
         <div className="bg-black rounded-xl border border-gray-800 p-12 text-center text-red-400">
            Failed to load collections. Make sure the backend is running.
         </div>
      );
   }

   return (
      <div className="bg-black rounded-xl overflow-hidden border border-gray-800 text-sm md:text-base lg:text-lg">
         {/* Header with filters and toggle */}
         <div className="p-6 border-b border-gray-800 bg-gray-900/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
               {/* Left side - Category filters */}
               <div className="flex space-x-8">
                  {/* Favorites filter with star icon */}
                  <button
                     onClick={() => {
                        setActiveFilter("favorites");
                        setCurrentPage(1);
                     }}
                     className={`filter-button flex items-center space-x-2 focus:outline-none ${
                        activeFilter === "favorites"
                           ? "filter-button-active"
                           : "filter-button-inactive"
                     }`}>
                     {" "}
                     {/* Focus outline removed - edit focus styles here */}
                     <Star
                        size={16}
                        fill={activeFilter === "favorites" ? "#fbbf24" : "none"}
                        className={
                           activeFilter === "favorites" ? "text-yellow-400" : ""
                        }
                     />
                     <span>Favorites</span>
                  </button>

                  {/* Other filters */}
                  {filterCategories
                     .filter((filter) => filter.id !== "favorites")
                     .map((filter) => (
                        <button
                           key={filter.id}
                           onClick={() => {
                              setActiveFilter(filter.id);
                              setCurrentPage(1);
                           }}
                           className={`filter-button focus:outline-none ${
                              activeFilter === filter.id
                                 ? "filter-button-active"
                                 : "filter-button-inactive"
                           }`}>
                           {" "}
                           {/* Focus outline removed - edit focus styles here */}
                           {filter.label}
                        </button>
                     ))}
               </div>

               {/* Right side - Toggle and Time filters */}
               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Fiat/Crypto Toggle */}
                  <Toggle
                     label="USD"
                     checked={showFiat}
                     onChange={setShowFiat}
                  />

                  {/* Time filters */}
                  <div className="flex space-x-3">
                     {timeFilters.map((filter) => (
                        <button
                           key={filter.id}
                           onClick={() => setActiveTimeFilter(filter.id)}
                           className={`time-filter-button focus:outline-none ${
                              activeTimeFilter === filter.id
                                 ? "time-filter-active"
                                 : "time-filter-inactive"
                           }`}>
                           {" "}
                           {/* Focus outline removed - edit focus styles here */}
                           {filter.label}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full bg-black">
               <thead className="bg-gray-900/30">
                  <tr>
                     <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">
                        #
                     </th>
                     <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">
                        Collection
                     </th>
                     <th className="text-right px-4 py-3">
                        <button
                           onClick={() => handleSort("floor")}
                           className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors font-medium text-sm ml-auto focus:outline-none">
                           {" "}
                           {/* Focus outline removed - edit focus styles here */}
                           <span>Floor</span>
                           <SortIcon field="floor" />
                        </button>
                     </th>
                     <th className="text-right px-4 py-3">
                        <button
                           onClick={() => handleSort("topOffer")}
                           className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors font-medium text-sm ml-auto focus:outline-none">
                           {" "}
                           {/* Focus outline removed - edit focus styles here */}
                           <span>Top Offer</span>
                           <SortIcon field="topOffer" />
                        </button>
                     </th>
                      <th className="text-right px-4 py-3">
                         <button
                            onClick={() => handleSort("listedCount")}
                            className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors font-medium text-sm ml-auto focus:outline-none">
                            {" "}
                            {/* Focus outline removed - edit focus styles here */}
                            <span>Listed</span>
                            <SortIcon field="listedCount" />
                         </button>
                      </th>
                     <th className="text-right px-4 py-3">
                        <button
                           onClick={() => handleSort("volume")}
                           className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors font-medium text-sm ml-auto focus:outline-none">
                           {" "}
                           {/* Focus outline removed - edit focus styles here */}
                           <span>Volume</span>
                           <SortIcon field="volume" />
                        </button>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {paginatedData.map((collection) => (
                     <CollectionTableRow
                        key={collection.id}
                        collection={collection}
                        showFiat={showFiat}
                        onFavorite={handleFavorite}
                     />
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
            <div className="p-6 border-t border-gray-800">
               <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
               />
            </div>
         )}

         {/* Results info */}
         <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/25">
            <div className="flex items-center justify-between text-sm text-gray-400">
               <span>
                  Showing {startIndex + 1}-
                  {Math.min(
                     startIndex + itemsPerPage,
                     filteredAndSortedData.length
                  )}{" "}
                  of {filteredAndSortedData.length} collections
               </span>
               <span>
                  Page {currentPage} of {totalPages}
               </span>
            </div>
         </div>
      </div>
   );
}
