"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../i18n/config";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

type TranslatedItem = {
  id: string;
  title: string;
  body: string;
  imageAlt: string;
};

type Item = TranslatedItem & { imageSrc: string; themeColor: string };

export default function IphonePinnedShowcaseV2() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);

  const items = useMemo<Item[]>(() => {
    const raw = t("iphoneShowcase.items", { returnObjects: true }) as unknown;
    const list = Array.isArray(raw) ? (raw as TranslatedItem[]) : [];

    const assets = [
      { src: "/Red.svg", color: "#EF4444" },
      { src: "/yellow.svg", color: "#EAB308" },
      { src: "/green.svg", color: "#22C55E" },
      { src: "/blue.svg", color: "#30b4da" },
    ];

    const dataToUse = list.length >= assets.length ? list : [];

    return assets.map((asset, idx) => ({
      ...(dataToUse[idx] || { id: `item-${idx}`, title: "Title", body: "Body", imageAlt: "Alt" }),
      imageSrc: asset.src,
      themeColor: asset.color,
    }));
  }, [t, i18n.language]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  // تسريع حركة ظهور النصوص
  useEffect(() => {
    if (!textContentRef.current) return;
    gsap.fromTo(
      textContentRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const images = imageWrapRefs.current.filter(Boolean) as HTMLDivElement[];
      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(images, { yPercent: 100, autoAlpha: 0 });
      gsap.set(images[0], { yPercent: 0, autoAlpha: 1 });

      const activate = (idx: number) => {
        if (idx === activeIndexRef.current) return;
        const prev = activeIndexRef.current;
        const isForward = idx > prev;
        activeIndexRef.current = idx;
        setActiveIndex(idx);

        gsap.to(images[prev], {
          yPercent: isForward ? -20 : 100,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.fromTo(
          images[idx],
          { yPercent: isForward ? 100 : -100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" }
        );
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      steps.forEach((el, idx) => {
        ScrollTrigger.create({
          trigger: el,
          start: idx === 0 ? "top bottom" : "top 40%", 
          end: "bottom 40%",
          onEnter: () => activate(idx),
          onEnterBack: () => activate(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#fbfbfb]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        
        <div ref={pinRef} className="h-screen flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 lg:gap-20 w-full">
          
          {/* إطار الموبايل المصغر */}
          <div className="relative w-[140px] xs:w-[160px] md:w-[220px] lg:w-[210px] shrink-0 z-10 transition-all">
            <div className="relative rounded-[2rem] md:rounded-[3rem] bg-[#000] p-1 md:p-2 shadow-2xl ring-4 ring-gray-900/5">
              <div className="relative overflow-hidden rounded-[1.8rem] md:rounded-[2.7rem] bg-white aspect-[9/19.5]">
                <div className="absolute left-1/2 top-0 z-30 h-4 w-16 -translate-x-1/2 rounded-b-xl bg-black md:h-5 md:w-20" />
                <div className="relative w-full h-full">
                  {items.map((it, idx) => (
                    <div
                      key={it.id}
                      ref={(el) => { imageWrapRefs.current[idx] = el; }}
                      className="absolute inset-0 w-full h-full overflow-hidden"
                    >
                      <Image 
                        src={it.imageSrc} 
                        alt={it.imageAlt} 
                        fill 
                        className="object-cover" 
                        priority={idx === 0} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* نصوص العرض - خطوط أصغر */}
          <div className="w-full md:flex-1 max-w-xl">
            <div className="relative flex flex-col justify-center rounded-[1.5rem] md:rounded-[2.5rem] bg-white/50 p-5 md:p-12 shadow-sm backdrop-blur-sm border border-gray-100">
              
              <div className="flex items-center gap-2 mb-3 md:mb-6">
                 <div className="h-2 w-2 md:h-3 md:w-3 rounded-full" style={{ backgroundColor: active.themeColor }} />
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-gray-400">
                    {t("iphoneShowcase.kicker") || "Status Update"}
                 </span>
              </div>
              
              <div ref={textContentRef}>
                <h3 className="text-2xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {active?.title}
                </h3>
                <p className="mt-2 md:mt-6 text-sm md:text-lg leading-relaxed text-gray-600">
                  {active?.body}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 md:mt-10 flex gap-1.5">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="h-1 md:h-1.5 rounded-full transition-all duration-300"
                    style={{ 
                      width: idx === activeIndex ? "35px" : "8px",
                      backgroundColor: idx === activeIndex ? item.themeColor : "#e5e7eb"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* تعديل مسافات التمرير هنا لسرعة الاستجابة */}
        <div className="relative pointer-events-none">
          {items.map((it, idx) => (
            <div
              key={it.id}
              ref={(el) => { stepRefs.current[idx] = el; }}
              // أول سكرول (idx 0) قصير جداً لتبدأ الحركة فوراً، والباقي متوسط لسرعة التنقل
              className={`${idx === 0 ? "h-[20vh]" : "h-[60vh]"} md:h-[100vh]`} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}