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

function PolicyContent({
  t,
  dir,
}: {
  t: TFunction;
  dir: "rtl" | "ltr";
}) {
  const collectBullets = t("privacyPage.collect.bullets", { returnObjects: true }) as string[];
  const useBullets = t("privacyPage.use.bullets", { returnObjects: true }) as string[];

  return (
    <div dir={dir} className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
      <h2 className="text-xl font-black text-slate-900 md:text-2xl">
        {t("privacyPage.collect.title")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.collect.intro")}
      </p>
      <BulletList items={collectBullets} />
      <p className="mt-6 text-sm font-bold text-slate-900 md:text-base">
        {t("privacyPage.collect.note")}
      </p>

      <hr className="my-8 border-black/10" />

      <h3 className="text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.use.title")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.use.intro")}
      </p>
      <BulletList items={useBullets} />

      <hr className="my-8 border-black/10" />

      <h3 className="text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.security.sharingTitle")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.security.sharingBody")}
      </p>

      <h3 className="mt-8 text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.security.dataSecurityTitle")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.security.dataSecurityBody")}
      </p>

      <hr className="my-8 border-black/10" />

      <h3 className="text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.rights.yourRightsTitle")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.rights.yourRightsBody")}
      </p>

      <h3 className="mt-8 text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.rights.childrenTitle")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.rights.childrenBody")}
      </p>

      <h3 className="mt-8 text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.rights.changesTitle")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.rights.changesBody")}
      </p>

      <h3 className="mt-8 text-lg font-black text-slate-900 md:text-xl">
        {t("privacyPage.rights.contactTitle")}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
        {t("privacyPage.rights.contactBody")}{" "}
        <a className="font-black text-slate-900 hover:underline" href="mailto:tech@amiaksa.com">
          tech@amiaksa.com
        </a>
        .
      </p>
    </div>
  );
}

export default function PrivacyTabPrivacyPolicy() {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? ("rtl" as const) : ("ltr" as const);

  return <PolicyContent t={t} dir={dir} />;
}

