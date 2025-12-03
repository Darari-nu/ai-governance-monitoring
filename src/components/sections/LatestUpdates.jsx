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
 * @typedef {Object} RegionUpdate
 * @property {string} id
 * @property {string} jurisdiction
 * @property {string} title
 * @property {string} titleJa
 * @property {string} description
 * @property {string} descriptionJa
 * @property {string} lastUpdated
 */

/** @type {RegionUpdate[]} */
const REGION_UPDATES = [
    {
        id: "eu",
        jurisdiction: "European Union",
        title: "EU AI Act implementation roadmap",
        titleJa: "EU AI法 実施ロードマップ",
        description:
            "Key milestones for high-risk AI systems, foundation models, and governance requirements through 2026.",
        descriptionJa: "2026年までの高リスクAIシステム、基盤モデル、およびガバナンス要件に関する主要なマイルストーン。",
        lastUpdated: "2025-01-20",
    },
    {
        id: "uk",
        jurisdiction: "United Kingdom",
        title: "Multi-regulator guidance on AI principles",
        titleJa: "AI原則に関する複数規制当局ガイダンス",
        description:
            "How UK regulators coordinate around pro-innovation principles instead of a single AI Act.",
        descriptionJa: "単一のAI法ではなく、イノベーション促進の原則に基づいて英国の規制当局がどのように連携しているか。",
        lastUpdated: "2025-01-18",
    },
    {
        id: "us",
        jurisdiction: "United States",
        title: "Executive Order follow-up actions",
        titleJa: "大統領令のフォローアップ措置",
        description:
            "Agency rulemaking, NIST AI RMF adoption, and enforcement trends across key sectors.",
        descriptionJa: "主要セクターにおける省庁の規則制定、NIST AI RMFの採用、および執行の傾向。",
        lastUpdated: "2025-01-15",
    },
    {
        id: "china",
        jurisdiction: "China",
        title: "Status of generative AI service filings",
        titleJa: "生成AIサービス届出の状況",
        description:
            "Latest CAC registrations and obligations for providers of generative AI services.",
        descriptionJa: "生成AIサービスプロバイダーに対する最新のCAC登録状況と義務。",
        lastUpdated: "2025-01-12",
    },
    {
        id: "japan",
        jurisdiction: "Japan",
        title: "Soft-law and voluntary guidelines",
        titleJa: "ソフトローと自主ガイドライン",
        description:
            "Updates from Cabinet Office councils, industry groups, and sectoral regulators.",
        descriptionJa: "内閣府の会議、業界団体、およびセクター別規制当局からの最新情報。",
        lastUpdated: "2025-01-10",
    },
    {
        id: "international",
        jurisdiction: "International bodies",
        title: "International AI governance frameworks",
        titleJa: "国際的なAIガバナンスの枠組み",
        description:
            "Cross-border principles and emerging standards companies should align with early (OECD / UNESCO / G7).",
        descriptionJa: "企業が早期に連携すべき国境を越えた原則と新たな基準（OECD / UNESCO / G7）。",
        lastUpdated: "2025-01-08",
    },
    {
        id: "other",
        jurisdiction: "Other jurisdictions",
        title: "Draft AI Bill discussions",
        titleJa: "AI法案に関する議論",
        description:
            "Ongoing legislative debates and what they may mean for high-risk AI deployments (e.g., Brazil).",
        descriptionJa: "進行中の立法に関する議論と、それが高リスクAIの展開に何を意味するか（例：ブラジル）。",
        lastUpdated: "2025-01-05",
    },
];

/**
 * Helper to get short code for thumbnail
 * @param {RegionUpdate} item
 * @returns {string}
 */
const getShortCode = (item) => {
    switch (item.id) {
        case "eu":
            return "EU";
        case "uk":
            return "UK";
        case "us":
            return "US";
        case "china":
            return "CN";
        case "japan":
            return "JP";
        case "international":
            return "INT";
        case "other":
            return "OTHER";
        default:
            return item.id.substring(0, 2).toUpperCase();
    }
};

export function LatestUpdatesSection() {
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

                {/* Gallery Grid Layout */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {REGION_UPDATES.map((item) => (
                        <Card
                            key={item.id}
                            className="group overflow-hidden rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Image Area (Placeholder) */}
                            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_70%),radial-gradient(circle_at_100%_0%,rgba(129,140,248,0.2),transparent_50%)]">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        Region
                                    </span>
                                    <span className="text-4xl font-bold text-slate-300 group-hover:text-slate-400 transition-colors duration-300">
                                        {getShortCode(item)}
                                    </span>
                                </div>
                            </div>

                            {/* Content Area */}
                            <CardHeader className="p-4 pb-2">
                                <div className="mb-2 inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-600 transition-colors group-hover:border-slate-300 group-hover:bg-slate-100">
                                    {item.jurisdiction}
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-lg font-bold leading-tight text-slate-900">
                                        {item.title}
                                    </CardTitle>
                                    <p className="text-sm font-medium text-slate-500">
                                        {item.titleJa}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-2">
                                <CardDescription className="line-clamp-3 text-sm text-slate-600">
                                    {item.description}
                                </CardDescription>
                                <p className="line-clamp-3 text-xs text-slate-500 border-t border-slate-100 pt-2 mt-2">
                                    {item.descriptionJa}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <p className="text-xs text-slate-400">
                                    Last updated: {item.lastUpdated}
                                </p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
