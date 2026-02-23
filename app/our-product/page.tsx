"use client";
import React, { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrbitControls, Center, Stage, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// تسجيل الـ Plugin الخاص بـ GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Scene() {
  const meshRef = useRef();
  
  // تحميل الخامات والموديل
  const materials = useLoader(MTLLoader, "/Asset 2ldpi.mtl");
  const obj = useLoader(OBJLoader, "/Asset 2ldpi.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    // إنشاء الجدول الزمني للحركة مربوطاً بالسكرول
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // حركة ناعمة مرتبطة بسرعة السكرول
      },
    });

    // -- مراحل الدوران --
    tl.to(meshRef.current.rotation, { y: Math.PI / 2 }, "step1")   // يلف للجنب (90 درجة)
      .to(meshRef.current.rotation, { y: Math.PI }, "step2")       // يلف للضهر تماماً (180 درجة) لشرح التفاصيل الخلفية
      .to(meshRef.current.rotation, { x: 0.2, y: Math.PI * 1.5 }, "step3") // يميل قليلاً ويلف للجانب الآخر
      .to(meshRef.current.rotation, { x: 0, y: Math.PI * 2 }, "step4");    // يعود للوجه الأصلي (دورة كاملة)

    return () => {
      // تنظيف الـ ScrollTrigger عند مغادرة الصفحة
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <primitive ref={meshRef} object={obj} scale={0.8} />;
}

export default function OurProductPage() {
  return (
    <div className="section-wrapper" style={{ position: "relative", overflow: "clip" }}>
      
      {/* حاوية الـ Canvas الثابتة أثناء السكرول */}
      <div style={{ 
        position: "sticky", 
        top: 0, 
        left: 0, 
        width: "100vw", 
        height: "100vh", 
        zIndex: 1,
        pointerEvents: "none" // يسمح بالسكرول من خلال الكانفاس
      }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: "all" }}>
          <Suspense fallback={<Html center>جاري التحميل...</Html>}>
            <Stage environment="city" intensity={0.6} adjustCamera={1.5}>
              <Center>
                <Scene />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* المحتوى النصي الموزع على أقسام (Sections) */}
      <div style={{ position: "relative", zIndex: 2, marginTop: "-100vh" }}>
        
        {/* القسم الأول: الوجه */}
        <section style={sectionStyle}>
          <div style={contentBox}>
            <h1>إبداع من كل زاوية</h1>
            <p>ابدأ السكرول لاكتشاف التصميم العصري.</p>
          </div>
        </section>

        {/* القسم الثاني: الجانب */}
        <section style={sectionStyle}>
          <div style={{...contentBox, marginLeft: 'auto'}}>
            <h2>انسيابية التصميم</h2>
            <p>تفاصيل دقيقة تم صقلها بعناية فائقة.</p>
          </div>
        </section>

        {/* القسم الثالث: الظهر (نقطة تركيزك) */}
        <section style={sectionStyle}>
          <div style={contentBox}>
            <h2>تفاصيل الظهر</h2>
            <p>هنا تكمن القوة التقنية والمنافذ المخفية التي طلبت شرحها.</p>
          </div>
        </section>

        {/* القسم الرابع: النهاية */}
        <section style={sectionStyle}>
          <div style={{...contentBox, margin: '0 auto'}}>
            <h2>الجودة الشاملة</h2>
            <p>منتج صُمم ليدوم معك طويلاً.</p>
          </div>
        </section>

      </div>
    </div>
  );
}

// --- تنسيقات بسيطة ---

const sectionStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "0 10%",
  pointerEvents: "none", 
};

const contentBox = {
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  padding: "2.5rem",
  borderRadius: "20px",
  maxWidth: "450px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  pointerEvents: "all",
  color: "#333"
};