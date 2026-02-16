"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "../i18n/config";
import { useTranslation } from "react-i18next";
import { BellRing, Siren, Smartphone } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DeviceShowcaseSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/Screenshot-2025-10-06-104827.webp"
              alt={t("device.imageAlt")}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(min-width: 768px) 520px, 100vw"
              priority={false}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky/15 via-transparent to-primary/15" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="space-y-6"
        >
          <motion.div variants={item} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
              {t("device.kicker")}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-heading sm:text-3xl">
              {t("device.title")}
            </h2>
            <p className="text-sm leading-relaxed text-black/70">
              {t("device.description")}
            </p>
          </motion.div>

          <motion.div variants={item} className="grid gap-3">
            <div className="group flex items-start gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-4 transition hover:-translate-y-0.5 hover:bg-black/[0.03] hover:shadow-lg">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white transition group-hover:shadow-md group-hover:shadow-sky/20">
                <BellRing size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-heading">
                  {t("device.bullets.autoAlertsTitle")}
                </p>
                <p className="text-sm text-black/65">
                  {t("device.bullets.autoAlertsBody")}
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-4 transition hover:-translate-y-0.5 hover:bg-black/[0.03] hover:shadow-lg">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white transition group-hover:shadow-md group-hover:shadow-sky/20">
                <Siren size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-heading">
                  {t("device.bullets.distressTitle")}
                </p>
                <p className="text-sm text-black/65">
                  {t("device.bullets.distressBody")}
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-3 rounded-2xl border border-black/5 bg-black/[0.02] p-4 transition hover:-translate-y-0.5 hover:bg-black/[0.03] hover:shadow-lg">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white transition group-hover:shadow-md group-hover:shadow-sky/20">
                <Smartphone size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-heading">
                  {t("device.bullets.appTitle")}
                </p>
                <p className="text-sm text-black/65">
                  {t("device.bullets.appBody")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

