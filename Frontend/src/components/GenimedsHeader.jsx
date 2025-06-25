"use client";
import { TypewriterEffectSmooth } from "../components/typewritter-effect";

export default function GenimedsHeader() {
  const words = [
    {
      text: "Genimeds",
      className: "text-gray-900 font-bold font-pj",
    },
    {
      text: "Ai-",
      className: "text-gray-900 font-bold font-pj",
    },
    {
      text: "Healthcare",
      className: "text-gray-900 font-bold font-pj",
    },
    {
      text: "Platform",
      className: "text-gray-900 font-bold font-pj",
    },
  ];

  return (
    <h1 className="mt-5 text-[1.3rem] font-bold leading-tight text-gray-900 sm:text-7xl sm:leading-tight lg:text-[2.9rem] lg:leading-tight font-pj">
      <TypewriterEffectSmooth
        words={words}
        className="flex justify-center"
        cursorClassName="bg-teal-500"
      />
    </h1>
  );
}