"use client";

import Link from "next/link";
import "@/i18n/config";
import { useTranslation } from "react-i18next";

export default function AboutUsPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const storyBody = t("aboutPage.storyBody", { returnObjects: true }) as string[];
  const offerBody = t("aboutPage.offerBody", { returnObjects: true }) as string[];
  const values = t("aboutPage.values", { returnObjects: true }) as string[];
  const different = t("aboutPage.different", { returnObjects: true }) as string[];
  const choose = t("aboutPage.choose", { returnObjects: true }) as string[];

  return (
    <div className="amb-about-bg min-h-[calc(100vh-4rem)]" dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-white">
        <p className="text-sm text-white/80">
          <Link className="hover:underline" href="/">
            {t("aboutPage.breadcrumbHome")}
          </Link>{" "}
          / {t("aboutPage.breadcrumbTitle")}
        </p>

        <div className="mt-10 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
            {t("aboutPage.heroKicker")}
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
            {t("aboutPage.heroTitle")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
            {t("aboutPage.heroLead")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-black md:text-2xl">{t("aboutPage.storyTitle")}</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/85 md:text-base">
              {storyBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h2 className="text-xl font-black md:text-2xl">{t("aboutPage.offerTitle")}</h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/85 md:text-base">
              {offerBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-black">{t("aboutPage.missionTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
              {t("aboutPage.missionBody")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-black">{t("aboutPage.visionTitle")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
              {t("aboutPage.visionBody")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-black">{t("aboutPage.valuesTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/85 md:text-base">
              {values.map((v, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-sky font-black">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-black">{t("aboutPage.differentTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/85 md:text-base">
              {different.map((v, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-sky font-black">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-white/85 md:text-base">
              {t("aboutPage.closing")}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
            <h3 className="text-lg font-black">{t("aboutPage.chooseTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/85 md:text-base">
              {choose.map((v, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-sky font-black">•</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

