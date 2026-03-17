import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

const copy = [
  "Before Galaxy 2026 turns into a memory, I wanted to keep a part of VSSUT that photos alone can never hold. If we shared lectures, labs, projects, hostel nights, campus walks, fests, deadlines, or simple everyday moments, leave me something to remember you by.",
  "Write a message, a memory, a roast, a confession, an inside joke, or a few honest words you never said out loud.",
  "When the night ends and everyone moves on, I want to return to these voices and remember what this chapter felt like.",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Hero({ onOpenModal }) {
  return (
    <section className="relative isolate flex min-h-[100svh] overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-4%] h-64 w-64 rounded-full bg-[#ffd6de] blur-3xl sm:h-80 sm:w-80" />
        <motion.div
          className="absolute right-[-6%] top-[18%] h-72 w-72 rounded-full bg-[#fff0dc] blur-3xl sm:h-96 sm:w-96"
          animate={{ x: [0, 22, -8, 0], y: [0, 18, 8, 0], scale: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-5%] left-[18%] h-64 w-64 rounded-full bg-[#ffdfe8] blur-3xl sm:h-80 sm:w-80"
          animate={{ x: [0, -18, 12, 0], y: [0, -12, 6, 0], scale: [1, 0.96, 1.05, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,248,0.28)_0%,rgba(255,251,244,0.86)_42%,rgba(255,246,248,0.98)_100%)]" />
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-grain" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl lg:max-w-[42rem]"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-rosewood shadow-sm backdrop-blur"
            >
              <Sparkles size={14} />
              VSSUT Farewell Scrapbook
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 font-serif text-5xl leading-[0.92] tracking-tight text-rosewood sm:text-6xl md:text-7xl xl:text-[6rem]"
            >
              Galaxy 2026
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-xs font-medium uppercase tracking-[0.24em] text-rosewood/55 sm:text-sm md:text-base"
            >
              Messages. Memories. Roasts. The moments I never want to lose.
            </motion.p>

            <motion.div
              variants={container}
              className="mt-5 space-y-3 text-sm leading-7 text-rosewood/75 sm:text-base sm:leading-8 lg:mt-6"
            >
              {copy.map((paragraph) => (
                <motion.p key={paragraph} variants={item} className="max-w-2xl">
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            <motion.div
              variants={item}
              className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-8"
            >
              <button
                type="button"
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#b85c7a] via-[#d97f9d] to-[#efb3c7] px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition duration-300 hover:scale-[1.02]"
              >
                <Camera className="h-4 w-4 transition duration-300 group-hover:rotate-6" />
                Leave a Memory
              </button>

              <div className="flex items-center gap-3 text-sm text-rosewood/65">
                <span className="h-px w-12 bg-gradient-to-r from-[#eeb6c8]/0 via-[#d97f9d]/80 to-[#eeb6c8]/0" />
                Crafted for one unforgettable goodbye
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45 }}
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-[31rem] xl:max-w-[33rem]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#ffd9e4]/35 via-transparent to-[#fff1df]/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/45 p-4 shadow-card backdrop-blur-xl sm:p-5 lg:p-5">
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.24),transparent_28%,transparent_70%,rgba(255,204,221,0.16))]" />
              <div className="relative aspect-[4/4.65] overflow-hidden rounded-[1.6rem] border border-white/60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,208,223,0.45),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(255,243,231,0.55),transparent_25%),linear-gradient(180deg,rgba(255,250,252,0.96),rgba(252,238,243,0.98))] p-4 sm:p-5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 blur-[0.5px]" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(126,52,84,0.16))]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-rosewood/55">
                        Memory Frame
                      </p>
                      <p className="mt-2 max-w-[13ch] font-serif text-3xl leading-tight text-rosewood sm:max-w-none sm:text-4xl">
                        VSSUT, in one soft glow
                      </p>
                    </div>
                    <div className="rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-rosewood/65">
                      2026
                    </div>
                  </div>

                  <div className="space-y-3 rounded-[1.5rem] border border-white/60 bg-white/55 p-4 backdrop-blur-md sm:p-5">
                    <p className="text-sm leading-6 text-rosewood/80 sm:leading-7">
                      "Some places become beautiful because of the people attached to them. For me, VSSUT will always sound like your laughter, your chaos, and the years we grew through together."
                    </p>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-rosewood/55 sm:text-xs sm:tracking-[0.3em]">
                      <span>Golden Hour Note</span>
                      <span>Farewell 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
