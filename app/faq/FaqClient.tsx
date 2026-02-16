"use client";

import Link from "next/link";
import "@/i18n/config";
import { useTranslation } from "react-i18next";

type FaqItem = {
  id: string;
  q: string;
  a?: string;
  bullets?: string[];
  cta?: { label: string; href: string };
};

export default function FaqClient() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const items = t("faqPage.items", { returnObjects: true }) as FaqItem[];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky/20 via-white to-white" />
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-sm text-black/60">
            <Link className="hover:underline" href="/">
              {t("faqPage.breadcrumbHome")}
            </Link>{" "}
            / {t("faqPage.breadcrumbTitle")}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            {t("faqPage.title")}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
            {t("faqPage.lead")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-4">
          {Array.isArray(items) &&
            items.map((it) => (
              <details
                key={it.id}
                className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm open:shadow-xl"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <h2 className="text-base font-black text-slate-900 md:text-lg">{it.q}</h2>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-slate-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  {it.a ? <p>{it.a}</p> : null}

                  {Array.isArray(it.bullets) && it.bullets.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {it.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="font-black text-sky">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {it.cta?.href ? (
                    <div className="pt-2">
                      <Link
                        href={it.cta.href}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-black text-white shadow-lg transition hover:bg-main/90"
                      >
                        {it.cta.label}
                      </Link>
                    </div>
                  ) : null}
                </div>
              </details>
            ))}
        </div>
      </section>
    </div>
  );
}

