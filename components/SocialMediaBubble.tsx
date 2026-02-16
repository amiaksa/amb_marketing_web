"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, Linkedin, Send, X } from "lucide-react";
const socials = [
  { name: "WhatsApp", icon: <MessageCircle size={16} />, href: "#", color: "bg-[#25D366]", angle: -90 },
  { name: "Instagram", icon: <Instagram size={16} />, href: "#", color: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]", angle: -125 },
  { name: "LinkedIn", icon: <Linkedin size={16} />, href: "#", color: "bg-[#0077b5]", angle: -55 },
  { name: "Telegram", icon: <Send size={16} />, href: "#", color: "bg-[#229ED9]", angle: -160 },
] as const;

export default function SocialMediaBubble() {
  const [open, setOpen] = useState(false);
  
  const radius = 65; // مسافة ملمومة جداً في الكورنر
  const iconSize = "h-9 w-9"; 

  return (
    <div
      className="fixed bottom-4 right-10 z-[100]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* منطقة الحساسية (Invisible Area) لضمان عدم غلق المنيو عند التحرك للأيقونات */}
      <div className="relative flex h-24 w-24 items-end justify-end">
        
        <AnimatePresence>
          {open &&
            socials.map((item, i) => {
              // حسابات الإحداثيات بناءً على الزاوية
              const x = Math.cos((item.angle * Math.PI) / 180) * radius;
              const y = Math.sin((item.angle * Math.PI) / 180) * radius;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 25,
                    delay: i * 0.03 
                  }}
                  className={`absolute flex ${iconSize} items-center justify-center rounded-full text-white shadow-lg backdrop-blur-md ${item.color} z-20`}
                >
                  {item.icon}
                </motion.a>
              );
            })}
        </AnimatePresence>

        {/* الزر الرئيسي AMB */}
        <motion.button
          className="relative z-30 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-black shadow-xl dark:bg-white"
          animate={{ scale: open ? 0.9 : 1 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <X className="text-white dark:text-black" size={20} />
              </motion.div>
            ) : (
              <motion.div key="brand" className="text-center">
                <span className="block text-[9px] font-black leading-none text-white dark:text-black tracking-tighter">AMB</span>
                <span className="block text-[7px] font-medium text-white/60 dark:text-black/60">MEDIA</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}