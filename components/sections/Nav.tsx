"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { TelegramIcon, XIcon } from "@/components/ui/Icons";
import { art, isTBA, links, navLinks, site } from "@/lib/site-config";

export function Nav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-lime">
      <nav className="mx-auto flex h-[68px] max-w-[1240px] items-center gap-4 px-4 sm:px-6">
        {/* Wordmark */}
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg border-[3px] border-ink bg-lime-wash">
            {/* priority, not just for speed: without it next/image emitted
                loading="eager" on the server and "lazy" on the client, which
                tripped a hydration attribute mismatch. */}
            <Image
              src={art.logo}
              alt=""
              width={40}
              height={40}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-lg font-extrabold uppercase tracking-tight text-ink sm:text-xl">
            {site.shortName}
          </span>
        </a>

        <div className="flex-1" />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-2 font-display text-sm font-extrabold uppercase tracking-tight text-ink/80 transition-colors hover:bg-ink hover:text-lime"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Socials */}
        <div className="hidden items-center gap-2 sm:flex">
          <SocialIcon href={links.telegram} label="Telegram">
            <TelegramIcon />
          </SocialIcon>
          <SocialIcon href={links.twitter} label="X / Twitter">
            <XIcon />
          </SocialIcon>
        </div>

        {/* Wrapped, not classed: Button already sets `inline-flex`, and a
            `hidden` passed through className loses to it on CSS source order —
            so the button stayed visible and wrapped onto two lines on mobile. */}
        <span className="hidden shrink-0 sm:block">
          <Button
            href={isTBA(links.buy) ? undefined : links.buy}
            external={!isTBA(links.buy)}
            disabled={isTBA(links.buy)}
            variant="ink"
          >
            {isTBA(links.buy) ? "Buy — soon" : "Buy Now"}
          </Button>
        </span>

        {/* Burger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="btn-press grid h-11 w-11 shrink-0 place-items-center rounded-lg border-[3px] border-ink bg-ink text-lime lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-[3px] w-5 rounded bg-lime transition-all duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 h-[3px] w-5 rounded bg-lime transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[3px] w-5 rounded bg-lime transition-all duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-x-0 top-[68px] bottom-0 z-40 overflow-y-auto border-t-[3px] border-ink bg-lime texture-halftone lg:hidden">
          <ul className="flex flex-col gap-3 px-5 py-7">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ rotate: `${i % 2 === 0 ? -0.8 : 0.8}deg` }}
                  className="block rounded-xl border-[3px] border-ink bg-lime-wash px-5 py-4 font-display text-2xl font-extrabold uppercase text-ink shadow-[6px_6px_0_var(--color-ink)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 px-5 pb-10">
            <SocialIcon href={links.telegram} label="Telegram">
              <TelegramIcon />
            </SocialIcon>
            <SocialIcon href={links.twitter} label="X / Twitter">
              <XIcon />
            </SocialIcon>
            <Button
              href={isTBA(links.buy) ? undefined : links.buy}
              external={!isTBA(links.buy)}
              disabled={isTBA(links.buy)}
              variant="ink"
              className="flex-1"
            >
              {isTBA(links.buy) ? "Buy — soon" : "Buy Now"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="btn-press grid h-11 w-11 place-items-center rounded-lg border-[3px] border-ink bg-lime-wash text-ink hover:bg-ink hover:text-lime active:translate-x-[2px] active:translate-y-[2px]"
    >
      {children}
    </a>
  );
}
