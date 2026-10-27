"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const stages = [
    { id: "Starting", title: "Starting", description: "A new venture, offer, or idea needs its first coherent foundation." },
    { id: "Growing", title: "Growing", description: "The business is working and needs a stronger system to support momentum." },
    { id: "Transforming", title: "Transforming", description: "The current identity or experience no longer reflects where the business is heading." },
    { id: "Expanding", title: "Expanding", description: "A new market, product, or audience requires a coordinated next chapter." },
] as const;
const services = [
    { id: "Core", description: "Strategy & structure" }, { id: "Identity", description: "Brand & expression" },
    { id: "Digital", description: "Products & experiences" }, { id: "Promotion", description: "Reach & communication" },
    { id: "Edge", description: "Innovation & advantage" },
] as const;
const stepMeta = [
    ["Business context", "First, help us understand the movement your business is currently in."],
    ["Areas of interest", "Choose every discipline that may contribute. The final scope can cross several."],
    ["Your details", "Tell us who we should continue the conversation with."],
    ["Desired movement", "Describe the challenge and what a successful next chapter should unlock."],
] as const;

export function ContactInquiryForm({ active = true }: { active?: boolean }) {
    const [step, setStep] = useState(0);
    const [stage, setStage] = useState("");
    const [interests, setInterests] = useState<string[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [challenge, setChallenge] = useState("");
    const [consent, setConsent] = useState(false);
    const [complete, setComplete] = useState(false);
    const canContinue = step === 0 ? Boolean(stage) : step === 1 ? interests.length > 0 : step === 2 ? Boolean(name.trim() && email.trim()) : Boolean(challenge.trim() && consent);
    const toggleInterest = (value: string) => setInterests((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
    const next = () => { if (!canContinue) return; if (step === 3) setComplete(true); else setStep((value) => value + 1); };

    if (complete) return <motion.div initial={{ opacity: 0, y: 28, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} className="flex min-h-[430px] flex-col justify-center border-t border-white/20 pt-10 text-white"><div className="font-body text-[9px] uppercase tracking-[0.28em] text-[#BB987D]">Composition received</div><h3 className="mt-7 font-heading text-[clamp(3rem,5vw,5.5rem)] leading-[0.86] tracking-[-0.05em]">Thank you,<br />{name}.</h3><p className="mt-8 max-w-xl font-body text-sm leading-7 text-white/62">The experience is ready. Message delivery will be connected when the CMS workflow is enabled.</p><button type="button" onClick={() => { setStep(0); setComplete(false); }} className="mt-10 w-fit border-b border-white/35 pb-2 font-body text-[9px] uppercase tracking-[0.22em]">Start again</button></motion.div>;

    return <motion.form initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: .45 }} onSubmit={(event) => { event.preventDefault(); next(); }} className="border-t border-white/20 pt-7 text-white">
        <motion.div initial={{ opacity: 0, scaleX: .6, transformOrigin: "left" }} animate={{ opacity: active ? 1 : 0, scaleX: active ? 1 : .6 }} transition={{ duration: .8, delay: .18 }} className="mb-7 flex items-center justify-between font-body text-[9px] uppercase tracking-[0.24em] text-white/45"><span>Step {String(step + 1).padStart(2, "0")} / 04</span><div className="flex gap-2">{[0,1,2,3].map((item) => <motion.span key={item} animate={{ width: item <= step ? 32 : 12, backgroundColor: item <= step ? "#BB987D" : "rgba(255,255,255,.2)" }} className="h-1 rounded-full" />)}</div></motion.div>
        <div className="mb-7"><motion.div key={`eyebrow-${step}`} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} className="font-body text-[9px] uppercase tracking-[0.25em] text-[#BB987D]">{stepMeta[step][0]}</motion.div><motion.p key={`description-${step}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="mt-3 max-w-xl font-body text-xs leading-5 text-white/48">{stepMeta[step][1]}</motion.p></div>
        <div className="min-h-[330px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div key={`${active}-${step}`} initial={{ opacity: 0, x: 44, clipPath: "inset(0 0 0 18%)", filter: "blur(8px)" }} animate={{ opacity: active ? 1 : 0, x: active ? 0 : 44, clipPath: active ? "inset(0 0 0 0%)" : "inset(0 0 0 18%)", filter: active ? "blur(0px)" : "blur(8px)" }} exit={{ opacity: 0, x: -34, clipPath: "inset(0 18% 0 0)", filter: "blur(6px)" }} transition={{ duration: .72, delay: step === 0 ? .28 : 0, ease: [0.22, 0.75, 0.18, 1] }}>
                    {step === 0 && <fieldset><legend className="font-heading text-[clamp(2rem,3.3vw,3.7rem)] leading-[0.94] tracking-[-0.04em]">Where is your business now?</legend><div className="mt-7 grid gap-3 sm:grid-cols-2">{stages.map((item,index) => <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + index * .06 }} key={item.id} type="button" onClick={() => setStage(item.id)} className={`rounded-[1.1rem] p-5 text-left transition-colors ${stage === item.id ? "bg-[#BB987D] text-[#01362E]" : "bg-white/[0.07] text-white hover:bg-white/[0.12]"}`}><span className="block font-body text-[10px] uppercase tracking-[0.2em]">{item.title}</span><span className={`mt-3 block font-body text-xs leading-5 ${stage === item.id ? "text-[#01362E]/70" : "text-white/45"}`}>{item.description}</span></motion.button>)}</div></fieldset>}
                    {step === 1 && <fieldset><legend className="font-heading text-[clamp(2rem,3.3vw,3.7rem)] leading-[0.94] tracking-[-0.04em]">What should join the composition?</legend><div className="mt-7 grid gap-3 sm:grid-cols-2">{services.map((item,index) => { const selected = interests.includes(item.id); return <motion.button initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .1 + index * .055 }} key={item.id} type="button" aria-pressed={selected} onClick={() => toggleInterest(item.id)} className={`flex items-center justify-between rounded-[1.1rem] p-5 text-left transition-colors ${selected ? "bg-[#BB987D] text-[#01362E]" : "bg-white/[0.07] text-white hover:bg-white/[0.12]"}`}><span><span className="block font-body text-[10px] uppercase tracking-[0.2em]">{item.id}</span><span className={`mt-2 block font-body text-xs ${selected ? "text-[#01362E]/65" : "text-white/42"}`}>{item.description}</span></span><span className="text-lg">{selected ? "×" : "+"}</span></motion.button>; })}</div></fieldset>}
                    {step === 2 && <fieldset><legend className="font-heading text-[clamp(2rem,3.3vw,3.7rem)] leading-[0.94] tracking-[-0.04em]">How can we reach you?</legend><div className="mt-9 grid gap-7 sm:grid-cols-2"><label className="font-body text-[9px] uppercase tracking-[0.2em] text-white/45">Name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="mt-3 w-full border-b border-white/25 bg-transparent py-3 text-base normal-case tracking-normal text-white outline-none focus:border-[#BB987D]" /></label><label className="font-body text-[9px] uppercase tracking-[0.2em] text-white/45">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="mt-3 w-full border-b border-white/25 bg-transparent py-3 text-base normal-case tracking-normal text-white outline-none focus:border-[#BB987D]" /></label></div></fieldset>}
                    {step === 3 && <fieldset><legend className="font-heading text-[clamp(2rem,3.3vw,3.7rem)] leading-[0.94] tracking-[-0.04em]">What should become possible?</legend><textarea value={challenge} onChange={(event) => setChallenge(event.target.value)} rows={4} className="mt-7 w-full resize-none border-b border-white/25 bg-transparent py-4 font-body text-base leading-7 text-white outline-none placeholder:text-white/25 focus:border-[#BB987D]" placeholder="The challenge, ambition, or outcome..." /><label className="mt-5 flex cursor-pointer items-start gap-4 font-body text-xs leading-5 text-white/52"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-[#BB987D]" /><span>I agree that AKORD may use these details to respond to this inquiry.</span></label></fieldset>}
                </motion.div>
            </AnimatePresence>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-6"><button type="button" onClick={() => setStep((value) => Math.max(0,value - 1))} className={`font-body text-[9px] uppercase tracking-[0.22em] text-white/45 ${step === 0 ? "invisible" : "visible"}`}>Back</button><button type="submit" disabled={!canContinue} className="group flex items-center gap-5 rounded-full bg-white px-7 py-4 font-body text-[9px] uppercase tracking-[0.23em] text-[#01362E] enabled:hover:bg-[#BB987D] disabled:cursor-not-allowed disabled:opacity-25"><span>{step === 3 ? "Complete inquiry" : "Continue"}</span><span>→</span></button></div>
    </motion.form>;
}
