"use client";

import Image from "next/image";
import Link from "next/link";
import "@/i18n/config";
import { useTranslation } from "react-i18next";


export default function BlogClient() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

 

  const baseKey = "blogPage";

  // Page 1 data
  const problemParas = t(`${baseKey}.problem.paragraphs`, { returnObjects: true }) as string[];
  const challengeIntro = t(`${baseKey}.challenge.intro`, { returnObjects: true }) as string[];
  const solutionPoints = t(`${baseKey}.solution.points`, { returnObjects: true }) as string[];
  const benefits = t(`${baseKey}.benefits.items`, { returnObjects: true }) as string[];
  const howWorks = t(`${baseKey}.howItWorks.steps`, { returnObjects: true }) as Array<{
    title: string;
    body: string;
  }>;
  const delayImpact = t(`${baseKey}.delayImpact.items`, { returnObjects: true }) as string[];

  const quickIntro = t(`${baseKey}.quickResponse.intro`, { returnObjects: true }) as string[];
  const quickSections = t(`${baseKey}.quickResponse.sections`, { returnObjects: true }) as Array<{
    title: string;
    items: string[];
  }>;

  const heroImage = "/Why-Do-People-Pass-Out_.webp";



  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
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
            <>
              {/* Problem */}
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                    {t(`${baseKey}.problem.title`)}
                  </h2>
                  <span className="rounded-full bg-sky/15 px-4 py-2 text-xs font-black text-slate-800">
                    {t(`${baseKey}.tag`)}
                  </span>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  {problemParas.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Challenge + Solution */}
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
                <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                  {t(`${baseKey}.challenge.title`)}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  {challengeIntro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                    <h3 className="text-sm font-black text-slate-900">
                      {t(`${baseKey}.solution.title`)}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {solutionPoints.map((v, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="font-black text-sky">•</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                    <h3 className="text-sm font-black text-slate-900">
                      {t(`${baseKey}.benefits.title`)}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {benefits.map((v, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="font-black text-sky">•</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="mt-10 text-lg font-black text-slate-900">
                  {t(`${baseKey}.howItWorks.title`)}
                </h3>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {howWorks.map((s, idx) => (
                    <div key={idx} className="rounded-2xl border border-black/5 bg-white p-5">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                        {t(`${baseKey}.step`)} {idx + 1}
                      </p>
                      <p className="mt-2 font-black text-slate-900">{s.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                    </div>
                  ))}
                </div>

                <h3 className="mt-10 text-lg font-black text-slate-900">
                  {t(`${baseKey}.delayImpact.title`)}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
                  {delayImpact.map((v, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-black text-sky">•</span>
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-sky/25 bg-sky/10 p-6">
                  <p className="text-sm font-bold text-slate-900">{t(`${baseKey}.closing`)}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-main/90"
                    >
                      {t(`${baseKey}.cta`)}
                    </Link>
                    <span className="text-xs text-slate-500">
                      {t(`${baseKey}.contact.phone`)}:{" "}
                      <a className="font-bold text-slate-900 hover:underline" href="tel:+966593737239">
                        +966593737239
                      </a>
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick response article */}
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
                <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                  {t(`${baseKey}.quickResponse.title`)}
                </h2>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
                  {quickIntro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {quickSections.map((s, idx) => (
                    <div key={idx} className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                      <p className="font-black text-slate-900">{s.title}</p>
                      <ul className="mt-4 space-y-2 text-sm text-slate-700">
                        {s.items.map((v, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="font-black text-sky">•</span>
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm font-bold text-slate-900">
                  {t(`${baseKey}.quickResponse.conclusion`)}
                </p>
              </div>
            </>


          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl">
              <div className="relative aspect-[4/3] w-full bg-slate-50">
                <Image
                  src="/WhatsApp-Image-2025-04-15-at-11.02.23-AM.webp"
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
                  src="/download.webp"
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
