import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "white";
  showText?: boolean;
}

export default function Logo({ className = "", variant = "dark", showText = true }: LogoProps) {
  const logoUrl = "https://xzuwhajkyxrztrxosand.supabase.co/storage/v1/object/sign/Mon%20bucket/logo-transparent.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85NGNlM2FjMS03NzNkLTQ1OGUtODU2YS02ZTRmNGVjZGQ1ODEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJNb24gYnVja2V0L2xvZ28tdHJhbnNwYXJlbnQucG5nIiwiaWF0IjoxNzc2MDY5MjIzLCJleHAiOjE4MDc2MDUyMjN9.Tza7nG0c-8-TJgvPreIsRAtmA7E8GT4fjqLPMJuZySs";

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center cursor-pointer ${className}`}
    >
      <img 
        src={logoUrl} 
        alt="FinTrack" 
        className="h-full w-auto object-contain drop-shadow-sm" 
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}
