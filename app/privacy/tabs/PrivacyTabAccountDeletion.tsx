"use client";

import "@/i18n/config";
import { useTranslation } from "react-i18next";

function AccountDeletionContent({
  t,
  dir,
}: {
  t: (key: string, opts?: any) => any;
  dir: "rtl" | "ltr";
}) {
  const steps = t("accountDeletionPage.deleteSteps", { returnObjects: true }) as string[];
  const deleted = t("accountDeletionPage.deletedData", { returnObjects: true }) as string[];
  const mayRemain = t("accountDeletionPage.mayRemain", { returnObjects: true }) as string[];
  const safety = t("accountDeletionPage.safety", { returnObjects: true }) as string[];
  const without = t("accountDeletionPage.withoutDeletion", { returnObjects: true }) as string[];

  return (
    <div dir={dir} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-900 md:text-2xl">
            {t("accountDeletionPage.deleteInsideTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
            {t("accountDeletionPage.deleteInsideIntro")}
          </p>
          <ol className="mt-6 space-y-2 text-sm text-slate-700 md:text-base">
            {steps.map((v, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky/15 text-xs font-black text-slate-900">
                  {idx + 1}
                </span>
                <span>{v}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm font-bold text-slate-900 md:text-base">
            {t("accountDeletionPage.deleteInsideNote")}
          </p>
        </div>

        <div className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-900 md:text-2xl">
            {t("accountDeletionPage.deletedTitle")}
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-slate-700 md:text-base">
            {deleted.map((v, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-black text-sky">•</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-700">{t("accountDeletionPage.noEmail")}</p>
        </div>

        <div className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-900 md:text-2xl">
            {t("accountDeletionPage.mayRemainTitle")}
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-slate-700 md:text-base">
            {mayRemain.map((v, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-black text-sky">•</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-900 md:text-2xl">
            {t("accountDeletionPage.safetyTitle")}
          </h2>
          <ul className="mt-6 space-y-2 text-sm text-slate-700 md:text-base">
            {safety.map((v, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="font-black text-sky">•</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-black/5 bg-slate-50 p-6 md:p-8">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">
          {t("accountDeletionPage.withoutTitle")}
        </h2>
        <ul className="mt-6 space-y-2 text-sm text-slate-700 md:text-base">
          {without.map((v, idx) => (
            <li key={idx} className="flex gap-2">
              <span className="font-black text-sky">•</span>
              <span>{v}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
          <p className="text-sm font-black text-slate-900">{t("accountDeletionPage.contactTitle")}</p>
          <p className="mt-2 text-sm text-slate-700 md:text-base">
            {t("accountDeletionPage.contactBody")}{" "}
            <a className="font-black text-slate-900 hover:underline" href="mailto:tech@amiaksa.com">
              tech@amiaksa.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrivacyTabAccountDeletion() {
  const { t, i18n } = useTranslation();
  const dir = i18n.language === "ar" ? ("rtl" as const) : ("ltr" as const);

  return <AccountDeletionContent t={t} dir={dir} />;
}

