"use client";

import Link from "next/link";
import "../i18n/config";
import { useTranslation } from "react-i18next";
import type { LucideIcon } from "lucide-react";
import {
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Phone,
  MapPin,
  MessageCircle,
  Music2,
  Smartphone,
  PlayCircle,
} from "lucide-react";

type FooterLink = { label: string; href: string };
type SocialLink = FooterLink & { icon: LucideIcon };

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const pages: FooterLink[] = [
    { label: isRtl ? "الرئيسية" : "Home", href: "/" },
    { label: t("nav.aboutUs"), href: "/about-us" },
    { label: t("nav.ourProduct"), href: "/our-product" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("nav.faq"), href: "/faq" },
    { label: t("nav.privacy"), href: "/privacy" },
  ];

  const social: SocialLink[] = [
    { label: "Facebook", href: "https://facebook.com", icon: Facebook },
    { label: "YouTube", href: "https://youtube.com", icon: Youtube },
    { label: "WhatsApp", href: "https://wa.me/966593737239", icon: MessageCircle },
    { label: "Instagram", href: "https://instagram.com", icon: Instagram },
    { label: "X", href: "https://x.com", icon: Twitter },
    { label: "TikTok", href: "https://tiktok.com", icon: Music2 },
  ];

  const shop: FooterLink[] = [
    { label: "Salla", href: "#" },
    { label: "Tabby", href: "#" },
    { label: "Tamara", href: "#" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-black/5 bg-slate-950 text-white"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Brand & Contact */}
          <div className="space-y-6 flex flex-col items-center md:items-start text-center md:text-start">
            <div className="space-y-1">
              <p className="text-2xl font-black tracking-tight">
                pro<span className="text-sky">teck</span>
              </p>
              <p className="text-sm font-semibold text-white/75 italic">
                Tech That Talks To You
              </p>
            </div>

            <div className="space-y-3 text-sm text-white/70">
              <p className="font-bold text-white mb-2">{isRtl ? "تواصل معنا" : "Contact Us"}</p>
              <a className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors" href="tel:+966593737239">
                <Phone size={16} className="text-sky" />
                <span dir="ltr">+966 593 737 239</span>
              </a>
              <a className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition-colors" href="tel:+9660138910003">
                <Phone size={16} className="text-sky" />
                <span dir="ltr">+966 013 891 0003</span>
              </a>
              <div className="flex items-start justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-sky shrink-0 mt-1" />
                <p>King Faisal Road, Khobar, Saudi Arabia 34226</p>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-4 text-center md:text-start">
            <p className="text-sm font-black uppercase tracking-widest text-white/40">
              {isRtl ? "الصفحات" : "Pages"}
            </p>
            <ul className="space-y-2 text-sm">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link className="text-white/75 hover:text-sky transition-colors" href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media - Centered Layout */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <p className="text-sm font-black uppercase tracking-widest text-white/40">
              {isRtl ? "تابعنا" : "Social Media"}
            </p>
            <div className="grid grid-cols-3 gap-3 w-fit">
              {social.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-400 transition-all group w-20 h-20"
                    title={l.label}
                  >
                    <Icon size={20} className="group-hover:text-sky transition-colors" />
                    <span className="text-[10px] mt-1 opacity-50 group-hover:opacity-100">
                      {l.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop + Apps - Centered Layout */}
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="space-y-4 text-center md:text-start">
              <p className="text-sm font-black uppercase tracking-widest text-white/40">
                {isRtl ? "تسوق" : "Shop"}
              </p>
              <ul className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                {shop.map((l) => (
                  <li key={l.label}>
                    <a className="text-white/75 hover:text-white underline underline-offset-4 decoration-sky-400/30" href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 w-full flex flex-col items-center md:items-start">
              <p className="text-sm font-black uppercase tracking-widest text-white/40">
                {isRtl ? "تطبيقاتنا" : "Apps"}
              </p>
              <div className="flex flex-col gap-2 w-full max-w-[200px]">
                <a
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  href="#"
                >
                  <PlayCircle size={18} className="text-green-400" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-normal opacity-60">GET IT ON</span>
                    <span>Google Play</span>
                  </div>
                </a>
                <a
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  href="#"
                >
                  <Smartphone size={18} className="text-gray-300" />
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-normal opacity-60">Download on the</span>
                    <span>App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between text-center md:text-start">
          <p>© {year} <span className="text-white font-bold">proteck</span>. All rights reserved.</p>
          <div className="flex justify-center md:justify-end gap-6">
             <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}