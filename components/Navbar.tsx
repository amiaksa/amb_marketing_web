"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "../i18n/config";
import { useTranslation } from "react-i18next";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { href: "/about-us", key: "nav.aboutUs" },
  { href: "/blog", key: "nav.blog" },
  { href: "/contact", key: "nav.contact" },
  { href: "/privacy", key: "nav.privacy" },
  { href: "/faq", key: "nav.faq" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo2.svg");
  const pathname = usePathname();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع السكرول في الصفحة الخلفية عند فتح القائمة
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  // تحديث اتجاه الصفحة بناءً على اللغة الحالية
  useEffect(() => {
    const lang = (i18n.language as "ar" | "en") || "ar";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [i18n.language]);

  const toggleLanguage = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] w-full transition-all duration-300",
          scrolled
            ? " bg-white/70 backdrop-blur-md  dark:bg-black/70"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 bg-primary/80">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 transition-transform active:scale-95">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl ">
              <Image
                src={logoSrc}
                alt="AMB logo"
                fill
                sizes="40px"
                className="object-contain transition-transform group-hover:scale-110"
                onError={() => setLogoSrc("/next.svg")}
                priority
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-black dark:text-white">AMB</span>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            key={i18n.language}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-primary dark:text-white font-bold"
                      : "text-black/50 hover:text-black dark:text-white/100 dark:hover:text-primary"
                  )}
                >
                  <motion.span
                    key={i18n.language}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t(link.key)}
                  </motion.span>
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    />
                  )}
                </Link>
              );
            })}

            {/* Language toggle (desktop) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="ml-4 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-black/70 transition hover:bg-black/5 dark:border-white/100 dark:text-white/100 dark:hover:bg-white/10"
            >
              {i18n.language === "ar" ? "EN" : "ع"}
            </button>

            <div className="ml-4 h-6 w-[1px] bg-black/10 dark:bg-white/10" />
            <Link
              href="/our-product"
              className="ml-4 rounded-full bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-main hover:text-white hover:shadow-lg active:scale-95 dark:bg-white dark:text-black"
            >
              <motion.span
                key={i18n.language + "-cta"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {t("nav.ourProduct")}
              </motion.span>
            </Link>
          </motion.nav>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10 md:hidden dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="flex flex-col gap-1 items-end">
              <span className="h-0.5 w-6 bg-current" />
              <span className="h-0.5 w-4 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm md:hidden"
            />

            {/* Side Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-[100] h-full w-[300px] bg-white shadow-2xl dark:bg-[#0a0a0a] md:hidden"
            >
              <div className="flex flex-col h-full p-8 bg-sky">
                {/* Close Button */}
                <button
                  onClick={() => setOpen(false)}
                  className="self-end p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                {/* Language toggle (mobile) */}
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="mt-4 inline-flex w-fit items-center justify-center rounded-full border border-black/15 px-4 py-1.5 text-xs font-semibold text-black/80 transition hover:bg-black/5 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/10"
                >
                  {i18n.language === "ar" ? "EN" : "ع"}
                </button>

                {/* Mobile Links */}
                <nav className="mt-12 flex flex-col gap-4">
  {navLinks.map((link, i) => {
    const active = pathname === link.href;
    return (
      <motion.div
        key={link.href}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        <Link
          href={link.href}
          onClick={() => setOpen(false)}
          className={cn(
            "relative block w-fit py-2 text-2xl font-semibold transition-colors",
            active
              ? "text-black dark:text-white font-bold"
              : "text-black/40 dark:text-white/100 "
          )}
        >
          {t(link.key)}

          {active && (
            <motion.div
              layoutId="nav-underline-mobile"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </Link>
      </motion.div>
    );
  })}
</nav>

                {/* Mobile CTA */}
                <div className="mt-auto">
                  <Link
                    href="/our-product"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-2xl bg-black py-5 text-sm font-bold tracking-widest text-white uppercase dark:bg-white dark:text-black transition-transform active:scale-95"
                  >
                    {t("nav.ourProduct")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}