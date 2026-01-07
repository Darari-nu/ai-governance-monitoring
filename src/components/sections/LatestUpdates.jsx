import React from "react";
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

export function LatestUpdatesSection({ updates = [], loading = false, error = null }) {
  // Display only the first 6 items
  const displayedUpdates = updates.slice(0, 6);

  return (
    <section className="w-full border-t bg-white/80 backdrop-blur-sm relative z-10 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8 flex flex-col gap-8">
        {/* Section Header */}
        <div className="space-y-2 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Latest updates
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-slate-900">
            Global AI governance signals at a glance
          </h2>
          <p className="text-sm text-slate-600 sm:text-base max-w-2xl">
            Track developments across all major jurisdictions, then drill down
            into detailed archives.
          </p>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-12 text-slate-500">
            Loading updates...
          </div>
        )}
        {error && (
          <div className="text-center py-12 text-red-500">
            {error}
          </div>
        )}

        {/* Gallery Grid Layout */}
        {!loading && !error && (
          <>
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
                    {/* Image Area (Placeholder) */}
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%),radial-gradient(circle_at_100%_0%,rgba(129,140,248,0.2),transparent_50%)]">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                          Region
                        </span>
                        <span className="text-4xl font-bold text-slate-300 group-hover:text-slate-400 transition-colors duration-300">
                          {getShortCode(item.jurisdiction)}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <CardHeader className="p-4 pb-2">
                      <div className="mb-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600 transition-colors group-hover:border-slate-300 group-hover:bg-slate-100">
                        {item.jurisdiction}
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-bold leading-tight text-slate-900 line-clamp-2">
                          {item.title}
                        </CardTitle>
                        {item.titleJa && (
                          <p className="text-sm font-medium text-slate-500 line-clamp-1">
                            {item.titleJa}
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <CardDescription className="line-clamp-3 text-sm text-slate-600">
                        {item.description}
                      </CardDescription>
                      {item.descriptionJa && (
                        <p className="line-clamp-3 text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2">
                          {item.descriptionJa}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <p className="text-xs text-slate-400">
                        Last updated: {item.lastUpdated ? item.lastUpdated.split('T')[0] : ''}
                      </p>
                    </CardFooter>
                  </Card>
                </a>
              ))}
            </div>

            {/* View Archive Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => document.getElementById('archive-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                View Archive
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
