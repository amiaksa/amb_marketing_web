export default function OurProductPage() {
  return<>
  <div>our product</div>
  <div>our product</div>
  <div>our product</div>
  </>
}



// "use client";
// import React, { Suspense, useLayoutEffect, useRef } from "react";
// import * as THREE from "three"; // <-- مهم هنا
// import { Canvas, useLoader } from "@react-three/fiber";
// import { OBJLoader, MTLLoader } from "three-stdlib";
// import { OrbitControls, Center, Stage, Html } from "@react-three/drei";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// function Scene() {
//   const meshRef = useRef<THREE.Object3D>(null); // النوع موجود الآن

//   const materials = useLoader(MTLLoader, "/asset_2ldpi.mtl");
//   const obj = useLoader(OBJLoader, "/asset_2ldpi.obj", (loader) => {
//     materials.preload();
//     loader.setMaterials(materials);
//   });

//   useLayoutEffect(() => {
//     if (!meshRef.current) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".section-wrapper",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1,
//       },
//     });

//     tl.to(meshRef.current.rotation, { y: Math.PI / 2, ease: "power1.inOut" }, "step1")
//       .to(meshRef.current.rotation, { y: Math.PI, ease: "power1.inOut" }, "step2")
//       .to(meshRef.current.rotation, { x: 0.2, y: Math.PI * 1.5, ease: "power1.inOut" }, "step3")
//       .to(meshRef.current.rotation, { x: 0, y: Math.PI * 2, ease: "power1.inOut" }, "step4");

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//     };
//   }, []);

//   return <primitive ref={meshRef} object={obj} scale={0.8} />;
// }

// export default function OurProductPage() {
//   return (
//     <div className="section-wrapper" style={{ position: "relative", overflow: "clip" }}>
//       <div style={{ 
//         position: "sticky",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: 1,
//         pointerEvents: "none"
//       }}>
//         <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: "all" }}>
//           <Suspense fallback={<Html center>جاري التحميل...</Html>}>
//             <Stage environment="city" intensity={0.6} adjustCamera={1.5}>
//               <Center>
//                 <Scene />
//               </Center>
//             </Stage>
//           </Suspense>
//           <OrbitControls enableZoom={false} />
//         </Canvas>
//       </div>

//       <div style={{ position: "relative", zIndex: 2, marginTop: "-100vh" }}>
//         <section style={sectionStyle}>
//           <div style={contentBox}>
//             <h1>إبداع من كل زاوية</h1>
//             <p>ابدأ السكرول لاكتشاف التصميم العصري.</p>
//           </div>
//         </section>

//         <section style={sectionStyle}>
//           <div style={{ ...contentBox, marginLeft: 'auto' }}>
//             <h2>انسيابية التصميم</h2>
//             <p>تفاصيل دقيقة تم صقلها بعناية فائقة.</p>
//           </div>
//         </section>

//         <section style={sectionStyle}>
//           <div style={contentBox}>
//             <h2>تفاصيل الظهر</h2>
//             <p>هنا تكمن القوة التقنية والمنافذ المخفية التي طلبت شرحها.</p>
//           </div>
//         </section>

//         <section style={sectionStyle}>
//           <div style={{ ...contentBox, margin: '0 auto' }}>
//             <h2>الجودة الشاملة</h2>
//             <p>منتج صُمم ليدوم معك طويلاً.</p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// const sectionStyle = {
//   height: "100vh",
//   display: "flex",
//   alignItems: "center",
//   padding: "0 10%",
//   pointerEvents: "none",
// };

// const contentBox = {
//   background: "rgba(255, 255, 255, 0.9)",
//   backdropFilter: "blur(10px)",
//   padding: "2.5rem",
//   borderRadius: "20px",
//   maxWidth: "450px",
//   boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//   pointerEvents: "all",
//   color: "#333",
// };

