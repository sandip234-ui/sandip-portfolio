/**
 * sections/Contact.jsx
 * Contact section with social links and an EmailJS-powered form.
 */

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "../data/profile";
import { SectionWrapper, SectionHeading } from "../components/ui/SectionWrapper";

const socialLinks = [
  { key: "github", label: "GitHub", emoji: "💻", color: "hover:text-slate-200" },
  { key: "linkedin", label: "LinkedIn", emoji: "🔗", color: "hover:text-blue-400" },
  { key: "kaggle", label: "Kaggle", emoji: "📊", color: "hover:text-cyan-400" },
  { key: "huggingface", label: "Hugging Face", emoji: "🤗", color: "hover:text-yellow-400" },
  { key: "twitter", label: "Twitter / X", emoji: "🐦", color: "hover:text-sky-400" },
];

export function Contact() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const form = formRef.current;
      const name = form.from_name.value;
      const email = form.from_email.value;
      const message = form.message.value;

      if (!import.meta.env.VITE_EMAILJS_SERVICE_ID) throw new Error("Missing SERVICE ID");
      if (!import.meta.env.VITE_EMAILJS_TEMPLATE_ID) throw new Error("Missing TEMPLATE ID");
      if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) throw new Error("Missing PUBLIC KEY");

      console.log("SERVICE:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log("TEMPLATE:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log("PUBLIC KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      console.log("FORM DATA:", {
        from_name: name,
        from_email: email,
        message: message
      });

      const res = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("SUCCESS:", res.text);
      setStatus("success");
      form.reset();

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("FULL EMAILJS ERROR:", JSON.stringify(error));
      console.error("STATUS:", error?.status);
      console.error("TEXT:", error?.text);
      setStatus("error");

      // Optional fallback
      if (formRef.current) {
        const msg = formRef.current.message?.value || "";
        window.location.href = `mailto:${profile.email}?subject=Contact&body=${encodeURIComponent(msg)}`;
      }

      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.location.href = `mailto:${profile.email}`;
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-purple-400/40 focus:outline-none p-3 transition-colors";

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        badge="Get In Touch"
        title="Let's Work Together"
        subtitle="Open to research collaborations, internships, and interesting ML problems. Drop me a message!"
      />

      <div className="max-w-2xl mx-auto">
        {/* Email card & Form */}
        <div className="p-8 rounded-2xl bg-linear-to-br from-violet-900/20 to-slate-900/60 border border-violet-500/20 text-center mb-10">
          <div className="text-4xl mb-4">✉️</div>
          <p className="text-slate-400 mb-6">
            The best way to reach me is via email. I usually respond within 24–48
            hours.
          </p>

          <button
            onClick={handleEmailClick}
            type="button"
            className="mx-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 bg-violet-600 text-white hover:bg-violet-500"
          >
            {copied ? "Email copied ✅" : profile.email}
          </button>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-8 text-left space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  required
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="from_email"
                  required
                  className={inputClasses}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                className={`${inputClasses} resize-none min-h-30`}
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full bg-linear-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 rounded-lg text-white font-medium py-3 transition-opacity flex justify-center items-center gap-2 ${
                status === "sending"
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-center text-emerald-400 text-sm mt-3 font-medium">
                Message sent successfully ✅
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-red-400 text-sm mt-3 font-medium">
                Failed to send. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Social grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {socialLinks.map(({ key, label, emoji, color }) =>
            profile.social[key] ? (
              <a
                key={key}
                href={profile.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 ${color} hover:border-slate-600 transition-all duration-200 group`}
              >
                <span className="text-xl">{emoji}</span>
                <span className="text-sm font-medium">{label}</span>
                <span className="ml-auto text-slate-600 group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </a>
            ) : null
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}