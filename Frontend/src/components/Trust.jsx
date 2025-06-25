import { motion } from "framer-motion";
import { SlideUp } from "../utility/animation";

const Trust = () => {
  return (
    <section className="bg-brandWhite py-16 mt-20">
      <div className="container p-6">
        <motion.h1
          variants={SlideUp(0.2)}
          initial="initial"
          whileInView="animate"
          className="py-6 text-4xl pb-7 font-bold text-darkBlue text-center"
        >
          Why you can trust this tools
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            className="space-y-6 text-center md:text-left md:px-16 xl:px-32"
          >
            <img
              src="/icon1.png"
              alt="Reminder"
              className="mx-auto md:mx-0"
            />
            <p className=" text-3xl font-semibold">Based on reliable sources</p>
            <p className="">
              We want our tool to be safe and reliable, so its logic is based on
              the official global information provided by the WHO and web search of Med related Fields.
            </p>
            <p className="text-sm text-gray-400">
              Enchance your preliminary diagnosis and triage with pediatric
              content 
            </p>
          </motion.div>
          <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
            className="space-y-6 text-center md:text-left md:px-16 xl:px-32"
          >
            <img
              src="/icon2.png"
              alt="Reminder"
              className="mx-auto md:mx-0"
            />
            <p className="text-3xl font-semibold">Based on Trusted sources</p>
            <p className="">
              We want our tool to be restricted to be used for Medical knowledge accessible yo anyone, so its logic is based on
              the official Medicinal data.
            </p>
            <p className="text-sm text-gray-400">
              Enchance your preliminary diagnosis and triage with pediatric
              content 
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
