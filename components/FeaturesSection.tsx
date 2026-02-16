"use client";

import { motion } from "framer-motion";
import { Monitor, LayoutDashboard, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const cards = [
  {
    icon: <Monitor size={20} />,
    titleKey: "features.realtimeTitle",
    bodyKey: "features.realtimeBody",
  },
  {
    icon: <LayoutDashboard size={20} />,
    titleKey: "features.screenTitle",
    bodyKey: "features.screenBody",
  },
  {
    icon: <ShieldCheck size={20} />,
    titleKey: "features.appTitle",
    bodyKey: "features.appBody",
  },
] as const;

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section className="relative z-20 mx-auto max-w-6xl px-8 pb-20 -mt-18">
      <motion.div
        className="scroll-trigger-ready__worm-wrap grid gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
      >
        {cards.map((card) => (
          <motion.article
            key={card.titleKey}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="scroll-trigger-card flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-lg hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-sky/20">
                {card.icon}
              </span>
              <h3 className="text-lg font-bold text-white">
                {t(card.titleKey)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-dark-blue">
              {t(card.bodyKey)}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

