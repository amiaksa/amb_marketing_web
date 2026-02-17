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

  const isRtl = i18n.language === "ar";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  useEffect(() => {
    const lang = i18n.language || "ar";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
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
            ? "bg-white/80 backdrop-blur-md dark:bg-primary/80 shadow-sm"
            : "bg-primary dark:bg-primary/90"
        )}
      >
        {/* التعديل هنا: قمنا بتغيير max-w إلى full أو قيمة أكبر جداً لضمان ذهاب الروابط للأطراف */}
        <div className="mx-auto flex h-16 w-full items-center justify-between px-6 lg:px-12">
          
          {/* Logo - سيبقى دائماً أقصى اليسار (أو اليمين في العربي) */}
          <Link href="/" className="group flex items-center gap-3 transition-transform active:scale-95 shrink-0">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl">
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
            <span className="text-xl font-extrabold tracking-tight text-black dark:text-white">AMB</span>
          </Link>

          {/* Desktop Navigation - ستتحرك جهة اليمين (أو اليسار في العربي) */}
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all",
                    active
                      ? "text-black dark:text-white font-bold"
                      : "text-black/60 hover:text-black dark:text-white/70 dark:hover:text-white"
                  )}
                >
                  <span className="relative z-10">{t(link.key)}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    />
                  )}
                </Link>
              );
            })}

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="mx-4 rounded-full text-white border border-main px-4 py-1.5 text-xs font-bold transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {isRtl ? "EN" : "العربية"}
            </button>

            <div className="h-6 w-[1px] bg-black/10 dark:bg-white/10" />

            <Link
              href="/our-product"
              className="ml-6 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-main hover:text-white hover:shadow-xl active:scale-95 dark:bg-white dark:text-black shrink-0"
            >
              {t("nav.ourProduct")}
            </Link>
          </nav>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10 md:hidden dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <span className="h-0.5 w-6 bg-current" />
              <span className="h-0.5 w-4 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* Side Menu Drawer - (بقيت كما هي) */}
      <AnimatePresence mode="wait">
        {/* ... (باقي كود الموبايل كما هو) ... */}
        {open && (
           <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md md:hidden"
            />

            <motion.div
              initial={{ x: isRtl ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={cn(
                "fixed top-0 z-[100] h-full w-[85%] max-w-[350px] bg-white p-8 shadow-2xl dark:bg-sky md:hidden",
                isRtl ? "right-0" : "left-0"
              )}
            >
              <div className="flex flex-col h-full">
                <button
                  onClick={() => setOpen(false)}
                  className="self-end p-3 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <nav className="mt-16 flex flex-col gap-6">
                  {navLinks.map((link, i) => {
                    const active = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ x: isRtl ? 20 : -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "text-3xl font-bold transition-colors",
                            active ? "text-primary" : "text-black/40 dark:text-white/80"
                          )}
                        >
                          {t(link.key)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-auto space-y-6">
                  <button
                    onClick={toggleLanguage}
                    className="flex w-full items-center justify-center rounded-xl border border-black/10 py-4 font-bold dark:border-white/10"
                  >
                    {isRtl ? "Switch to English" : "التغيير للعربية"}
                  </button>
                  
                  <Link
                    href="/our-product"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-2xl bg-black py-5 text-sm font-bold tracking-widest text-white uppercase dark:bg-white dark:text-black"
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