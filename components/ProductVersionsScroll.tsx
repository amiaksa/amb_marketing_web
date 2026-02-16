"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../i18n/config";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type Version = {
  id: string;
  imageSrc: string;
  itemKey: "survivalCeiling" | "survivalWall" | "geminiO8f5";
};

gsap.registerPlugin(ScrollTrigger);

export default function ProductVersionsScroll() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  
  const triggerRef = useRef<HTMLElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [activeItemKey, setActiveItemKey] = useState<Version["itemKey"] | null>(null);

  const versions = useMemo<Version[]>(
    () => [
      {
        id: "survival-wall",
        itemKey: "survivalWall",
        imageSrc: "/real_device_1.png",
      },
      {
        id: "survival-ceiling",
        itemKey: "survivalCeiling",
        imageSrc: "/real_device_2.png",
      },
      {
        id: "gemini-o8f5",
        itemKey: "geminiO8f5",
        imageSrc: "/real_device_3.png",
      },
    ],
    []
  );

  const activeVersion = useMemo(() => {
    if (!activeItemKey) return null;
    return versions.find((v) => v.itemKey === activeItemKey) ?? null;
  }, [activeItemKey, versions]);

  // منع السكرول عند فتح المودال
  useEffect(() => {
    if (!activeItemKey) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItemKey(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItemKey]);

  useLayoutEffect(() => {
    if (!triggerRef.current || !wheelRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-wheel-item]");
      if (panels.length <= 1) return;
      const step = 360 / panels.length;
      
      const isMobile = window.innerWidth < 768;
      const radius = isMobile 
        ? window.innerWidth * 0.35 
        : Math.min(window.innerWidth * 0.22, 280); 

      gsap.set(panels, {
        position: "absolute",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      const updateWheel = (rotation: number) => {
        panels.forEach((el, i) => {
          const angle = i * step + rotation;
          const radian = angle * (Math.PI / 180);
          
          const x = Math.sin(radian) * radius;
          const z = Math.cos(radian) * radius;
          const frontness = (Math.cos(radian) + 1) / 2;
          
          gsap.set(el, {
            x: x,
            z: z,
            scale: isMobile ? (0.7 + frontness * 0.3) : (0.8 + frontness * 0.2),
            opacity: 0.4 + (frontness * 0.6),
            filter: `blur(${(1 - frontness) * (isMobile ? 1 : 2)}px)`,
            zIndex: Math.round(frontness * 100),
            pointerEvents: frontness > 0.85 ? "auto" : "none",
          });
        });
      };

      const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        pin: true,
        pinSpacing: true, // يمنع الحركة الجانبية ويحجز مساحة السكرول
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const rotation = self.progress * (panels.length - 1) * step;
          updateWheel(rotation);
        }
      });

      updateWheel(0);
      return () => st.kill();
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden w-full mt-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/Untitled-6.webp"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-primary/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>
      <section 
        ref={triggerRef} 
        className="relative z-10 w-full overflow-hidden h-[100vh] flex flex-col justify-center"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="mx-auto max-w-6xl px-6 w-full relative z-10">
        
          <div className="mb-16 text-center space-y-2  relative z-50">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              {t("versions.section.title")}
            </h2>
            <p className="text-sm md:text-base font-medium text-slate-800">
              {t("versions.section.pricesNote")}
            </p>
          </div>

          {/* Wheel Container */}
          <div 
            className="relative h-[60vh] md:h-[65vh] mb-12 flex items-center justify-center" 
            style={{ perspective: "15000px" }}
          >
            <div ref={wheelRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
              {versions.map((v) => (
                <div
                  key={v.id}
                  data-wheel-item
                  className="w-[280px] md:w-[340px] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-2xl"
                >
                  <div className="flex flex-col">
                    <div className="relative h-40 md:h-48 w-full bg-slate-50">
                      <Image
                        src={v.imageSrc}
                        alt={t(`versions.items.${v.itemKey}.imageAlt`)}
                        fill
                        className="object-contain p-4"
                      />
                      <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-4 rounded-full bg-black/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm`}>
                        {t(`versions.items.${v.itemKey}.price`)}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-main uppercase tracking-widest mb-1">
                          {t(`versions.items.${v.itemKey}.mount`)}
                        </p>
                        <h3 className="text-lg md:text-xl font-extrabold leading-tight text-slate-800">
                          {t(`versions.items.${v.itemKey}.title`)}
                        </h3>
                      </div>
                      
                      <div className="mb-5 text-[12px] leading-relaxed text-slate-500 line-clamp-3">
                         {/* عرض أول سطرين فقط كنبذة */}
                         {(t(`versions.items.${v.itemKey}.description`, { returnObjects: true }) as string[])[0]}
                      </div>

                      <div className="grid gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveItemKey(v.itemKey)}
                          className="w-full rounded-xl border border-main/50 bg-white py-3 text-sm font-black text-slate-800 transition hover:bg-main hover:text-white active:scale-95"
                        >
                          {t("versions.section.readMore")}
                        </button>
                        <button className="w-full rounded-xl bg-primary py-3 text-xs font-black text-white shadow-lg active:scale-95">
                          {t("versions.section.cta")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal النافذة المنبثقة */}
        {activeVersion && typeof document !== "undefined"
          ? createPortal(
              <div
                className="fixed inset-0 z-[10000] flex min-h-[100dvh] items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                onMouseDown={(e) =>
                  e.target === e.currentTarget && setActiveItemKey(null)
                }
              >
                <div className="w-full max-w-4xl max-h-[92dvh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-main">
                        {t(`versions.items.${activeVersion.itemKey}.mount`)}
                      </p>
                      <h3 className="text-xl font-black text-slate-900">
                        {t(`versions.items.${activeVersion.itemKey}.title`)}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveItemKey(null)}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <X size={18} className="text-slate-600" />
                      
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="overflow-y-auto p-6 custom-scrollbar">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="relative rounded-2xl bg-slate-50 p-4 flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-[320px]">
                          <Image
                            src={activeVersion.imageSrc}
                            alt={t(
                              `versions.items.${activeVersion.itemKey}.imageAlt`
                            )}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div
                          className={`absolute ${isRtl ? "right-4" : "left-4"} top-4 rounded-full bg-main px-4 py-1.5 text-sm font-bold text-white shadow-lg`}
                        >
                          {t(`versions.items.${activeVersion.itemKey}.price`)}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-black text-slate-800 border-b pb-2">
                            {t("versions.section.detailsTitle")}
                          </h4>
                          <div className="space-y-3">
                            {(
                              t(
                                `versions.items.${activeVersion.itemKey}.description`,
                                { returnObjects: true }
                              ) as string[]
                            ).map((line, idx) => (
                              <div
                                key={idx}
                                className="flex gap-3 text-sm leading-relaxed text-slate-600"
                              >
                                <span className="text-main font-bold">•</span>
                                <p>{line}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button className="w-full rounded-xl bg-primary py-4 text-sm font-black text-white shadow-xl hover:bg-main transition-all active:scale-95">
                          {t("versions.section.cta")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )
          : null}

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        `}</style>
      </section>
    </div>
  );
}