"use client";

import Link from "next/link";
import "@/i18n/config";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type TabKey = "privacy" | "accountDeletion" | "terms" | "returns";

export default function PrivacyTabs() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const [active, setActive] = useState<TabKey>("privacy");

  // Use require() to avoid TS module resolution quirks in some setups
  const PrivacyTabPrivacyPolicy = require("./tabs/PrivacyTabPrivacyPolicy").default;
  const PrivacyTabAccountDeletion = require("./tabs/PrivacyTabAccountDeletion").default;
  const PrivacyTabTerms = require("./tabs/PrivacyTabTerms").default;
  const PrivacyTabReturns = require("./tabs/PrivacyTabReturns").default;

  const tabs = useMemo(
    () =>
      [
        { key: "privacy" as const, label: t("privacyPage.tabs.privacy") },
        { key: "accountDeletion" as const, label: t("privacyPage.tabs.accountDeletion") },
        { key: "terms" as const, label: t("privacyPage.tabs.terms") },
        { key: "returns" as const, label: t("privacyPage.tabs.returns") },
      ] as const,
    [t]
  );

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky/20 via-white to-white" />

        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-sm text-black/60">
            <Link className="hover:underline" href="/">
              {t("privacyPage.breadcrumbHome")}
            </Link>{" "}
            / {t("privacyPage.breadcrumbTitle")}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            {t("privacyPage.title")}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
            {t("privacyPage.lead")}
          </p>
        </div>
      </section>

      {/* Tabs + content */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-xl md:p-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const selected = tab.key === active;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className={[
                    "rounded-full border px-4 py-2 text-sm font-black transition",
                    selected
                      ? "border-sky bg-sky/10 text-slate-900"
                      : "border-black/10 bg-white text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {active === "privacy" && <PrivacyTabPrivacyPolicy />}
            {active === "accountDeletion" && <PrivacyTabAccountDeletion />}
            {active === "terms" && <PrivacyTabTerms />}
            {active === "returns" && <PrivacyTabReturns />}
          </div>
        </div>
      </section>
    </div>
  );
}

