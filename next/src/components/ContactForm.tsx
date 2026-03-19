"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence, useAnimate, useReducedMotion } from "framer-motion";
import { transitions } from "@/lib/transitions";

function AnimatedInput({
  id,
  name,
  type = "text",
  required,
  placeholder,
  label,
}: {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  label: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs text-white tracking-widest uppercase mb-2 block"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors"
          placeholder={placeholder}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={transitions.spring}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left rounded-b-lg"
        />
      </div>
    </div>
  );
}

function AnimatedTextarea({
  id,
  name,
  required,
  placeholder,
  label,
  rows,
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  label: string;
  rows: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs text-white tracking-widest uppercase mb-2 block"
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none transition-colors resize-none"
          placeholder={placeholder}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={transitions.spring}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left rounded-b-lg"
        />
      </div>
    </div>
  );
}

export default function ContactForm({ formspreeId }: { formspreeId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [btnScope, btnAnimate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        if (!shouldReduceMotion) {
          btnAnimate(btnScope.current, { x: [0, -8, 8, -8, 8, 0] }, { duration: 0.4 });
        }
      }
    } catch {
      setStatus("error");
      if (!shouldReduceMotion) {
        btnAnimate(btnScope.current, { x: [0, -8, 8, -8, 8, 0] }, { duration: 0.4 });
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transitions.spring}
          className="flex flex-col items-center py-12 text-center"
        >
          <p className="text-2xl font-display font-bold text-accent mb-2">
            Message sent!
          </p>
          <p className="text-sm text-secondary">
            I&apos;ll get back to you soon.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={transitions.spring}
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-white border border-white/30 px-6 py-2 rounded-full hover:bg-accent hover:border-accent hover:text-black transition-colors"
          >
            Send another
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <AnimatedInput
              id="name"
              name="name"
              required
              placeholder="Your name"
              label="Name"
            />
            <AnimatedInput
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              label="Email"
            />
          </div>
          <AnimatedInput
            id="subject"
            name="subject"
            placeholder="What's this about?"
            label="Subject"
          />
          <AnimatedTextarea
            id="message"
            name="message"
            required
            placeholder="Your message..."
            label="Message"
            rows={6}
          />
          <motion.button
            ref={btnScope}
            type="submit"
            disabled={status === "sending"}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={transitions.spring}
            className="self-start bg-accent text-black font-semibold text-sm px-8 py-3 rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
