"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import "../i18n/config";
import { useTranslation } from "react-i18next";

export default function AMBIntroSection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  // جلب البيانات من ملفات الترجمة
  const bullets = t("ambIntro.bullets", { returnObjects: true }) as string[] || [];
  const body = t("ambIntro.body", { returnObjects: true }) as string[] || [];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* الخلفيات المزخرفة */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        
        {/* قسم الصورة: md:order-2 تجعل الصورة تأتي على اليمين في العربي */}
        <div className={`relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl ${isRtl ? 'md:order-2' : 'md:order-1'}`}>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/Gemini_Generated_Image_gu2fodgu2fodgu2f.webp"
              alt={t("ambIntro.imageAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 520px, 100vw"
              priority={false}
            />
          </div>
        </div>

        {/* قسم المحتوى: يتحكم في الاتجاه بناءً على isRtl */}
        <div 
          className={`space-y-6 ${isRtl ? 'text-right' : 'text-left'}`} 
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-main">
              {t("ambIntro.kicker")}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
              {t("ambIntro.title")}
            </h2>
          </div>

          <article className="rounded-3xl border border-black/5 bg-slate-50/50 p-6 shadow-sm">
            {body.map((paragraph, index) => (
              <p key={index} className={`${index > 0 ? 'mt-3' : ''} text-sm leading-relaxed text-black/75`}>
                {paragraph}
              </p>
            ))}

            <ul className="mt-4 grid gap-2 text-sm font-medium text-heading">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-center gap-3">
                  {/* نقطة القائمة تتكيف مع الاتجاه بسبب flex */}
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/about-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-main active:scale-95"
              >
                {t("ambIntro.readMore")}
                {/* تبديل السهم بناءً على الاتجاه */}
                {isRtl ? <ChevronLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}