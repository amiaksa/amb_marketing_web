
"use client";

import Link from "next/link";
import "@/i18n/config";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky/20 via-white to-white" />

        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <p className="text-sm text-black/60">
            <Link className="hover:underline" href="/">
              {t("contactPage.breadcrumbHome")}
            </Link>{" "}
            / {t("contactPage.breadcrumbTitle")}
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            {t("contactPage.title")}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">
            {t("contactPage.lead")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_520px]">
          {/* Info */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
              <h2 className="text-xl font-black text-slate-900 md:text-2xl">
                {t("contactPage.subtitle")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                {t("contactPage.subLead")}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {t("contactPage.country")}
                  </p>
                  <p className="mt-2 font-black text-slate-900">{t("contactPage.countryValue")}</p>
                  <p className="mt-2 text-sm text-slate-600">{t("contactPage.cityValue")}</p>
                </div>

                <div className="rounded-2xl border border-black/5 bg-slate-50 p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {t("contactPage.emailLabel")}
                  </p>
                  <a
                    className="mt-2 inline-block font-black text-slate-900 hover:underline"
                    href="mailto:info@amiaksa.com"
                  >
                    info@amiaksa.com
                  </a>
                  <p className="mt-2 text-sm text-slate-600">{t("contactPage.emailHint")}</p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6">
                <p className="text-sm font-black text-slate-900">{t("contactPage.socialTitle")}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    X
                  </a>
                  <a
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
            <h2 className="text-xl font-black text-slate-900 md:text-2xl">
              {t("contactPage.form.title")}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
              {t("contactPage.form.lead")}
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">
                    {t("contactPage.form.firstName")}{" "}
                    <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    name="firstName"
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-sky/30 placeholder:text-slate-400 focus:ring-4"
                    placeholder={t("contactPage.form.firstNamePlaceholder")}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-700">
                    {t("contactPage.form.lastName")}
                  </span>
                  <input
                    name="lastName"
                    className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-sky/30 placeholder:text-slate-400 focus:ring-4"
                    placeholder={t("contactPage.form.lastNamePlaceholder")}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  {t("contactPage.form.email")} <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-sky/30 placeholder:text-slate-400 focus:ring-4"
                  placeholder={t("contactPage.form.emailPlaceholder")}
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  {t("contactPage.form.message")} <span className="text-red-500">*</span>
                </span>
                <textarea
                  required
                  name="message"
                  rows={6}
                  className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-sky/30 placeholder:text-slate-400 focus:ring-4"
                  placeholder={t("contactPage.form.messagePlaceholder")}
                />
              </label>

              <p className="text-xs leading-relaxed text-slate-500">
                {t("contactPage.form.consent")}{" "}
                <Link className="font-bold text-slate-900 hover:underline" href="/privacy">
                  {t("contactPage.form.privacy")}
                </Link>
                .
              </p>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-main/90"
              >
                {t("contactPage.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

