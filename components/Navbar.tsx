"use client";

import { useState } from "react";
import { clinic } from "@/lib/clinic";
import { Icon } from "./Icon";

const links = [["Home", "#home"], ["About", "#about"], ["Services", "#services"], ["Schedule", "#schedule"], ["Find Appointment", "#find-appointment"], ["Contact", "#contact"]];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <nav className="relative z-40 border-b border-border bg-white" aria-label="Main navigation"><div className="container-page flex min-h-20 items-center justify-between gap-5">
    <a href="#home" className="flex min-h-12 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dental" aria-label={`${clinic.name} home`}><span className="grid h-11 w-11 place-items-center rounded-full bg-light-blue text-dental"><Icon name="tooth" className="h-7 w-7"/></span><span className="leading-none"><strong className="block font-serif text-lg text-navy">HORCABAS</strong><span className="mt-1 block text-[10px] font-bold tracking-[.22em] text-dental">DENTAL CLINIC</span></span></a>
    <div className="hidden items-center gap-6 lg:flex">{links.map(([label, href], i) => <a key={href} href={href} className={`flex min-h-12 items-center border-b-2 text-sm font-semibold transition-colors hover:text-dental focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dental ${i === 0 ? "border-dental text-dental" : "border-transparent text-navy"}`}>{label}</a>)}<a href={clinic.phoneHref} className="btn-primary"><Icon name="phone" className="h-4 w-4"/>Call to Book</a></div>
    <button type="button" onClick={() => setOpen(!open)} className="grid h-12 w-12 place-items-center rounded-md border border-border text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dental lg:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation"><Icon name={open ? "close" : "menu"} className="h-6 w-6"/></button>
  </div>{open && <div id="mobile-navigation" className="absolute left-0 right-0 top-full border-b border-border bg-white shadow-soft lg:hidden"><div className="container-page flex flex-col py-3">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-border/60 font-semibold text-navy hover:text-dental">{label}</a>)}<a href={clinic.phoneHref} className="btn-primary mt-4"><Icon name="phone" className="h-4 w-4"/>Call to Book</a></div></div>}</nav>;
}
