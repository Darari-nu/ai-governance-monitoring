import React, { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

/**
 * Helper to get short code for thumbnail
 * @param {string} jurisdiction
 * @returns {string}
 */
const getShortCode = (jurisdiction) => {
    if (!jurisdiction) return "GL";
    const upper = jurisdiction.toUpperCase();
    if (upper.includes("EU") || upper.includes("EUROPE")) return "EU";
    if (upper.includes("UK") || upper.includes("UNITED KINGDOM")) return "UK";
    if (upper.includes("US") || upper.includes("UNITED STATES")) return "US";
    if (upper.includes("CHINA") || upper.includes("CN")) return "CN";
    if (upper.includes("JAPAN") || upper.includes("JP")) return "JP";
    return upper.substring(0, 2);
};

export function ArchiveSection({ updates = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedJurisdiction, setSelectedJurisdiction] = useState("All");
    const [visibleCount, setVisibleCount] = useState(9);

    // Extract unique jurisdictions for filter
    const jurisdictions = useMemo(() => {
        const unique = new Set(updates.map((u) => u.jurisdiction).filter(Boolean));
        return ["All", ...Array.from(unique).sort()];
    }, [updates]);

    // Filter updates based on search and jurisdiction
    const filteredUpdates = useMemo(() => {
        return updates.filter((item) => {
            const matchesSearch =
                (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.titleJa && item.titleJa.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.descriptionJa && item.descriptionJa.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesJurisdiction =
                selectedJurisdiction === "All" || item.jurisdiction === selectedJurisdiction;

            return matchesSearch && matchesJurisdiction;
        });
    }, [updates, searchTerm, selectedJurisdiction]);

    const displayedUpdates = filteredUpdates.slice(0, visibleCount);
    const hasMore = visibleCount < filteredUpdates.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 9);
    };

    return (
        <section id="archive-section" className="w-full bg-slate-50 py-16 md:py-24 border-t border-slate-200">
            <div className="mx-auto max-w-6xl px-4 md:px-8 flex flex-col gap-12">
                {/* Section Header */}
                <div className="space-y-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-900">
                        Archive Search
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Explore past regulatory updates and governance news.
                    </p>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto w-full">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-full border border-slate-300 bg-white px-4 py-2.5 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Jurisdiction Filter */}
                    <select
                        value={selectedJurisdiction}
                        onChange={(e) => setSelectedJurisdiction(e.target.value)}
                        className="w-full md:w-48 rounded-full border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem"
                        }}
                    >
                        {jurisdictions.map((j) => (
                            <option key={j} value={j}>
                                {j}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {displayedUpdates.map((item) => (
                        <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <Card className="h-full overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                                {/* Compact Image Area */}
                                <div className="aspect-[3/1] w-full overflow-hidden bg-slate-100 relative">
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                                        <span className="text-2xl font-bold text-slate-200 group-hover:text-slate-300 transition-colors">
                                            {getShortCode(item.jurisdiction)}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader className="p-4 pb-2">
                                    <div className="mb-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                        {item.jurisdiction}
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base font-bold leading-tight text-slate-900 line-clamp-2">
                                            {item.title}
                                        </CardTitle>
                                        {item.titleJa && (
                                            <p className="text-xs font-medium text-slate-500 line-clamp-1">
                                                {item.titleJa}
                                            </p>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-2">
                                    <CardDescription className="line-clamp-2 text-xs text-slate-600">
                                        {item.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <p className="text-[10px] text-slate-400">
                                        {item.lastUpdated ? item.lastUpdated.split('T')[0] : ''}
                                    </p>
                                </CardFooter>
                            </Card>
                        </a>
                    ))}
                </div>

                {/* Empty State */}
                {filteredUpdates.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No updates found matching your criteria.
                    </div>
                )}

                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleLoadMore}
                            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
