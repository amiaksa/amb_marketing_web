"use client";

import "@/i18n/config";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-slate-700 md:text-base">
      {items.map((v, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="font-black text-sky">•</span>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  );
}

function TermsContent({
  t,
  dir,
}: {
  t: TFunction;
  dir: "rtl" | "ltr";
}) {
  const points = t("termsPage.points", { returnObjects: true }) as string[];

  return (
    <div dir={dir} className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
      <h2 className="text-xl font-black text-slate-900 md:text-2xl">{t("termsPage.title")}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{t("termsPage.lead")}</p>
      <BulletList items={points} />
      <p className="mt-6 text-sm font-bold text-slate-900 md:text-base">{t("termsPage.acceptance")}</p>
    </div>
  );
}

export default function PrivacyTabTerms() {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? ("rtl" as const) : ("ltr" as const);

  return <TermsContent t={t} dir={dir} />;
}

