"use client";
import React from "react";
import { cn1 as cn } from "../lib/utils";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0% 0%",
    },
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 opacity-70 blur-xl transition duration-500 group-hover:opacity-100"
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 opacity-80 group-hover:opacity-100"
      />
      <div className={cn("relative bg-blue-50 rounded-[calc(1.5rem-4px)]", className)}>
        {children}
      </div>
    </div>
  );
};

export const AceternityCard = ({
  children,
  className,
  containerClassName,
  cardType = "default"
}) => {
  const renderCard = () => {
    switch(cardType) {
      case "gradient":
        return (
          <BackgroundGradient 
            containerClassName={containerClassName}
            className={className}
          >
            {children}
          </BackgroundGradient>
        );
      
      case "glass":
        return (
          <div 
            className={cn(
              "relative overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 shadow-xl backdrop-blur-md",
              containerClassName
            )}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-cyan-100 opacity-30"
            />
            <div className={cn("relative z-10", className)}>
              {children}
            </div>
          </div>
        );
      
      case "border":
        return (
          <div 
            className={cn(
              "relative overflow-hidden rounded-2xl border border-purple-200 bg-purple-50 p-px shadow-xl",
              containerClassName
            )}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 opacity-30"
            />
            <div 
              className="absolute inset-px rounded-2xl bg-purple-50"
            />
            <div className={cn("relative z-10", className)}>
              {children}
            </div>
          </div>
        );
        
      case "3d":
        return (
          <motion.div
            whileHover={{ translateY: -5, rotateX: 5, rotateY: 5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative overflow-hidden rounded-2xl shadow-lg border border-pink-200 bg-pink-50",
              containerClassName
            )}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              transformOrigin: "center center",
            }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 opacity-40"
            />
            <div className={cn("relative z-10", className)}>
              {children}
            </div>
          </motion.div>
        );
        
      default:
        return (
          <div 
            className={cn(
              "relative overflow-hidden rounded-2xl bg-amber-50 border border-amber-200 shadow-xl",
              containerClassName
            )}
          >
            <div className={cn("relative", className)}>
              {children}
            </div>
          </div>
        );
    }
  };

  return renderCard();
};

// This is a floating pattern to add visual interest to cards
export const FloatingPattern = ({ children, className }) => {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      {children}
    </div>
  );
};