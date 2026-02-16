"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "../i18n/config";
import { useTranslation } from "react-i18next";
import FeaturesSection from "./FeaturesSection";
import DeviceShowcaseSection from "./DeviceShowcaseSection";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function HomePageClient() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero (with background) */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/saudi-family.webp"
            alt="Saudi family"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        <motion.div
          className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-6 px-4 py-24 text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        <motion.div className="max-w-2xl space-y-4" variants={itemVariants}>
          <motion.p
            className="text-sm font-rubik uppercase tracking-[0.2em] text-white/80"
            variants={itemVariants}
          >
            {t("brand")}
          </motion.p>
          <motion.h1
            className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            variants={itemVariants}
          >
            {t("hero.titleMain")}
            <span className="text-sky"> {t("hero.titleHighlight")}</span>
          </motion.h1>
          <motion.p
            className="max-w-xl text-sm md:text-base text-white/85"
            variants={itemVariants}
          >
            {t("hero.description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-4 flex flex-wrap items-center gap-4"
          variants={itemVariants}
        >
          <motion.a
            href="/our-product"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-lg transition hover:bg-main/90"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("cta.primary")}
          </motion.a>
          <motion.a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-main px-6 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white hover:text-heading"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("cta.secondary")}
          </motion.a>
        </motion.div>
        </motion.div>
      </section>

      {/* Features cards (overlap the hero a bit, depending on its own styles) */}
   
    </>
  );
}

