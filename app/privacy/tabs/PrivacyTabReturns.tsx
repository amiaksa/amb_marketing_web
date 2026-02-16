"use client";

import "@/i18n/config";
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

function ReturnsContent({
  t,
  dir,
}: {
  t: (key: string, opts?: any) => any;
  dir: "rtl" | "ltr";
}) {
  const returnPoints = t("returnsPage.return.points", { returnObjects: true }) as string[];
  const exchangePoints = t("returnsPage.exchange.points", { returnObjects: true }) as string[];
  const notes = t("returnsPage.notes", { returnObjects: true }) as string[];

  return (
    <div dir={dir} className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
      <h2 className="text-xl font-black text-slate-900 md:text-2xl">{t("returnsPage.title")}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{t("returnsPage.lead")}</p>

      <hr className="my-8 border-black/10" />

      <h3 className="text-lg font-black text-slate-900 md:text-xl">{t("returnsPage.return.title")}</h3>
      <p className="mt-2 text-sm text-slate-700 md:text-base">{t("returnsPage.return.intro")}</p>
      <BulletList items={returnPoints} />

      <hr className="my-8 border-black/10" />

      <h3 className="text-lg font-black text-slate-900 md:text-xl">{t("returnsPage.exchange.title")}</h3>
      <p className="mt-2 text-sm text-slate-700 md:text-base">{t("returnsPage.exchange.intro")}</p>
      <BulletList items={exchangePoints} />

      <hr className="my-8 border-black/10" />

      <h3 className="text-lg font-black text-slate-900 md:text-xl">{t("returnsPage.notesTitle")}</h3>
      <BulletList items={notes} />
    </div>
  );
}

export default function PrivacyTabReturns() {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? ("rtl" as const) : ("ltr" as const);

  return <ReturnsContent t={t} dir={dir} />;
}

