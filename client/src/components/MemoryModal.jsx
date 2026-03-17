import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LoaderCircle, Send, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { submitMemory } from "../utils/api";

const relationshipOptions = ["Branch mate", "Junior", "Other"];

const initialForm = {
  name: "",
  relationship: "",
  relationshipOther: "",
  message: "",
};

function MemoryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isRelationshipOpen, setIsRelationshipOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setIsSubmitting(false);
      setStatus({ type: "", message: "" });
      setIsRelationshipOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (status.type !== "success") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "relationship" && value !== "Other"
        ? { relationshipOther: "" }
        : {}),
    }));
  };

  const handleRelationshipSelect = (value) => {
    setFormData((current) => ({
      ...current,
      relationship: value,
      relationshipOther: value === "Other" ? current.relationshipOther : "",
    }));
    setIsRelationshipOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        name: formData.name,
        relationship: formData.relationship,
        relationshipOther: formData.relationshipOther,
        message: formData.message,
      };

      const response = await submitMemory(payload);
      setStatus({
        type: "success",
        message: response.message || "Memory Captured!",
      });
      setFormData(initialForm);
      setIsRelationshipOpen(false);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Something went wrong while saving your memory.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#341d24]/35 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close modal"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/50 bg-white/45 shadow-card backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.24),transparent_22%,transparent_72%,rgba(255,214,226,0.22))]" />
            <div className="relative grid sm:grid-cols-[0.86fr_1.14fr]">
              <div className="relative min-h-56 overflow-hidden border-b border-white/40 bg-gradient-to-br from-[#f9dbe3] via-[#fff6f0] to-[#f7dfe8] p-6 sm:min-h-full sm:border-b-0 sm:border-r sm:border-white/40 sm:p-8">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-grain" />
                </div>
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[10px] uppercase tracking-[0.4em] text-rosewood/70">
                      <Sparkles className="h-3.5 w-3.5" />
                      Digital Postcard
                    </p>
                    <h2 className="mt-4 font-serif text-3xl text-rosewood sm:text-4xl">
                      Leave a memory for my scrapbook.
                    </h2>
                  </div>
                  <p className="mt-6 max-w-xs text-sm leading-7 text-rosewood/80">
                    A joke, a roast, a thank you, or a memory from campus. Make
                    it feel like us.
                  </p>
                </div>
              </div>

              <div className="relative p-5 sm:p-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/60 text-rosewood transition hover:bg-white"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>

                <form onSubmit={handleSubmit} className="space-y-5 pt-10 sm:pt-4">
                  <label className="block space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] text-rosewood/70">
                      Who are you?
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name (optional)"
                      maxLength={60}
                      className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-rosewood/45 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] text-rosewood/70">
                      How do I know you from VSSUT?
                    </span>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setIsRelationshipOpen((current) => !current)
                        }
                        className={`flex w-full items-center justify-between rounded-2xl border bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(255,241,245,0.96))] px-4 py-3 text-left text-sm outline-none transition focus:border-blush-300 focus:ring-2 focus:ring-blush-200 ${
                          isRelationshipOpen
                            ? "border-blush-300 ring-2 ring-blush-200"
                            : "border-[#ffffff95]"
                        } ${formData.relationship ? "text-ink" : "text-rosewood/45"}`}
                        aria-expanded={isRelationshipOpen}
                        aria-haspopup="listbox"
                      >
                        <span>
                          {formData.relationship || "Choose your connection"}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-rosewood/70 transition ${
                            isRelationshipOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <input
                        type="hidden"
                        name="relationship"
                        value={formData.relationship}
                        required
                      />

                      {isRelationshipOpen ? (
                        <div
                          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,252,0.98),rgba(255,241,245,0.98))] p-2 shadow-[0_20px_50px_rgba(126,52,84,0.18)] backdrop-blur-xl"
                          role="listbox"
                        >
                          {relationshipOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleRelationshipSelect(option)}
                              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                                formData.relationship === option
                                  ? "bg-[#f6d8e2] text-rosewood"
                                  : "text-rosewood/85 hover:bg-[#fff1f5]"
                              }`}
                              role="option"
                              aria-selected={formData.relationship === option}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </label>

                  {formData.relationship === "Other" ? (
                    <label className="block space-y-2">
                      <span className="text-xs uppercase tracking-[0.28em] text-rosewood/70">
                        Please specify your connection
                      </span>
                      <input
                        type="text"
                        name="relationshipOther"
                        value={formData.relationshipOther}
                        onChange={handleChange}
                        required
                        maxLength={120}
                        className="w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-rosewood/45 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
                      />
                    </label>
                  ) : null}

                  <label className="block space-y-2">
                    <span className="text-xs uppercase tracking-[0.28em] text-rosewood/70">
                      Your Message / Memory
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write something funny, congratulatory, sentimental, advisory, chaotic, or unforgettable..."
                      required
                      rows={6}
                      className="w-full resize-none rounded-[1.5rem] border border-white/70 bg-white/70 px-4 py-3 text-sm leading-7 text-ink outline-none transition placeholder:text-rosewood/45 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
                    />
                  </label>

                  {status.message ? (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        status.type === "success"
                          ? "border-[#d9eecf] bg-[#f3fff0] text-[#4d7b35]"
                          : "border-[#f3b9c8] bg-[#fff2f4] text-[#9d3552]"
                      }`}
                    >
                      {status.message}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#b85c7a] via-[#d97f9d] to-[#efb3c7] px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Capturing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Save Memory
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default MemoryModal;
