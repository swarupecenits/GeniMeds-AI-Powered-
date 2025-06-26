import { cn } from "../lib/utils";
import { motion } from "framer-motion";

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  // Animation variants for typewriter effect
  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: (i) => ({
      opacity: 1,
      display: "inline-block",
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  const renderWords = () => {
    return (
      <motion.div className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index, arr) => (
                <motion.span
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-black text-black`,
                    word.className
                  )}
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  style={{ display: char === ' ' ? 'inline-block' : undefined }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
    </div>
  );
};

export const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-gray-800 text-black`, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex -space-x-3 my-6 font-bold", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}
        </div>
      </motion.div>
      {/* Removed the blinking cursor */}
    </div>
  );
};