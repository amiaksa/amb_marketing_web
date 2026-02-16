"use client";

import Image from "next/image";
import Link from "next/link";
import "@/i18n/config";
import { useTranslation } from "react-i18next";

export default function BlogPageTwo() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const baseKey = "blogPage2";

  const contactlessIntro = t(`${baseKey}.contactless.intro`, { returnObjects: true }) as string[];
  const contactlessBenefits = t(`${baseKey}.contactless.benefits`, { returnObjects: true }) as Array<{
    title: string;
    body: string;
  }>;
  const contactlessClosing = t(`${baseKey}.contactless.closing`) as string;

  const comparisonLead = t(`${baseKey}.comparison.lead`) as string;
  const comparisonWhy = t(`${baseKey}.comparison.why.paragraphs`, { returnObjects: true }) as string[];
  const comparisonRows = t(`${baseKey}.comparison.table.rows`, { returnObjects: true }) as Array<{
    feature: string;
    smart: string;
    traditional: string;
  }>;
  const comparisonClosing = t(`${baseKey}.comparison.closing`) as string;
  const comparisonCta = t(`${baseKey}.comparison.cta`) as string;
  const comparisonBetterTitle = t(`${baseKey}.comparison.betterTitle`) as string;
  const comparisonBetterPoints = t(`${baseKey}.comparison.betterPoints`, { returnObjects: true }) as string[];
  const comparisonWhoTitle = t(`${baseKey}.comparison.whoTitle`) as string;
  const comparisonWhoItems = t(`${baseKey}.comparison.whoItems`, { returnObjects: true }) as string[];

  const hospitalsLead = t(`${baseKey}.hospitals.lead`) as string;
  const hospitalsBenefits = t(`${baseKey}.hospitals.benefits`, { returnObjects: true }) as string[];
  const hospitalsCta = t(`${baseKey}.hospitals.cta`) as string;

  const burdenContext = t(`${baseKey}.burden.context`, { returnObjects: true }) as string[];
  const burdenRole = t(`${baseKey}.burden.role`, { returnObjects: true }) as Array<{
    title: string;
    body: string;
  }>;
  const burdenConclusion = t(`${baseKey}.burden.conclusion`) as string;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Survival-System-presentation-12.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-sky/20 via-transparent to-black/30" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 text-white">
          <p className="text-sm text-white/80">
            <Link className="hover:underline" href="/">
              {t(`${baseKey}.breadcrumbHome`)}
            </Link>{" "}
            / {t(`${baseKey}.breadcrumbTitle`)}
          </p>

          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
              {t(`${baseKey}.heroKicker`)}
            </p>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-5xl">
              {t(`${baseKey}.heroTitle`)}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
              {t(`${baseKey}.heroLead`)}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <article className="space-y-10">
            {/* Contactless tech */}
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                {t(`${baseKey}.contactless.title`)}
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                {t(`${baseKey}.contactless.subtitle`)}
              </p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {contactlessIntro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <h3 className="mt-10 text-lg font-black text-slate-900">
                {t(`${baseKey}.contactless.benefitsTitle`)}
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {contactlessBenefits.map((b, idx) => (
                  <div key={idx} className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                    <p className="font-black text-slate-900">{b.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-bold text-slate-900">{contactlessClosing}</p>
            </div>

            {/* Image break */}
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/close-up-people-wearing-lab-coats-2-scaled.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
              </div>
            </div>

            {/* Comparison */}
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                {t(`${baseKey}.comparison.title`)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {comparisonLead}
              </p>

              <h3 className="mt-8 text-lg font-black text-slate-900">
                {t(`${baseKey}.comparison.whyTitle`)}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                {comparisonWhy.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-black/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-3 font-black">
                          {t(`${baseKey}.comparison.table.feature`)}
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 font-black">
                          {t(`${baseKey}.comparison.table.smart`)}
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 font-black">
                          {t(`${baseKey}.comparison.table.traditional`)}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((r, idx) => (
                        <tr key={idx} className="border-t border-black/5">
                          <td className="px-4 py-3 font-semibold text-slate-900">{r.feature}</td>
                          <td className="px-4 py-3 text-slate-700">{r.smart}</td>
                          <td className="px-4 py-3 text-slate-700">{r.traditional}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="mt-8 text-sm font-bold text-slate-900">{comparisonClosing}</p>

              <h3 className="mt-10 text-lg font-black text-slate-900">{comparisonBetterTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
                {comparisonBetterPoints.map((v, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-black text-sky">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-lg font-black text-slate-900">{comparisonWhoTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
                {comparisonWhoItems.map((v, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-black text-sky">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-main/90"
                >
                  {comparisonCta}
                </Link>
              </div>
            </div>

            {/* Hospitals */}
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                {t(`${baseKey}.hospitals.title`)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {hospitalsLead}
              </p>
              <h3 className="mt-8 text-lg font-black text-slate-900">
                {t(`${baseKey}.hospitals.benefitsTitle`)}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
                {hospitalsBenefits.map((v, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-black text-sky">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-main/90"
                >
                  {hospitalsCta}
                </Link>
              </div>
            </div>

            {/* Burden */}
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                {t(`${baseKey}.burden.title`)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                {t(`${baseKey}.burden.lead`)}
              </p>

              <h3 className="mt-8 text-lg font-black text-slate-900">
                {t(`${baseKey}.burden.contextTitle`)}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
                {burdenContext.map((v, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-black text-sky">•</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-lg font-black text-slate-900">
                {t(`${baseKey}.burden.roleTitle`)}
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {burdenRole.map((s, idx) => (
                  <div key={idx} className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                    <p className="font-black text-slate-900">{s.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-bold text-slate-900">{burdenConclusion}</p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
              <div className="relative aspect-[4/3] w-full bg-slate-50">
                <Image
                  src="/WhatsApp-Image-2025-04-17-at-12.16.30-PM.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-black text-slate-900">
                  {t(`${baseKey}.sidebar.card1.title`)}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {t(`${baseKey}.sidebar.card1.body`)}
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
              <div className="relative aspect-[4/3] w-full bg-slate-50">
                <Image
                  src="/professional-medic-woman-patient-medical-consultation-scaled.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-black text-slate-900">
                  {t(`${baseKey}.sidebar.card2.title`)}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {t(`${baseKey}.sidebar.card2.body`)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

