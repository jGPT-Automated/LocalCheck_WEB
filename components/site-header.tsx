"use client";

import { Check, CornersOut } from "@phosphor-icons/react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import styles from "./site-header.module.css";

const SITE_NAV_ITEMS = [
  { href: "/app#heatmap", label: "Heatmap" },
  { href: "/app#competition", label: "Competition" },
  { href: "/app#verify", label: "Add a court" },
  { href: "/pioneers", label: "Pioneers" },
] as const;

const DEFAULT_CTA = { href: "/app", label: "Explore the app" } as const;

type HeaderCta = {
  href: string;
  label: string;
};

export function SiteBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`${styles.brand} ${compact ? styles.brandCompact : ""}`}
      aria-label="LocalCheck home"
    >
      <span className={styles.brandMark} aria-hidden="true">
        <CornersOut size={compact ? 27 : 31} weight="bold" />
        <Check className={styles.brandCheck} size={compact ? 18 : 21} weight="bold" />
      </span>
      <span>LOCALCHECK</span>
    </Link>
  );
}

function DesktopNavigation({ cta }: { cta: HeaderCta }) {
  return (
    <nav className={styles.desktopNav} aria-label="Primary navigation">
      {SITE_NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href}>{item.label}</Link>
      ))}
      <Button asChild className={styles.headerCta}>
        <Link href={cta.href}>{cta.label} <ArrowRightIcon size={17} /></Link>
      </Button>
    </nav>
  );
}

function MobileNavigation({ cta }: { cta: HeaderCta }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className={styles.menuButton}
          aria-label="Open navigation"
        >
          <Menu size={21} strokeWidth={2.5} />
        </Button>
      </SheetTrigger>
      <SheetContent className={styles.mobileSheet}>
        <SheetHeader className={styles.mobileSheetHeader}>
          <SheetTitle><SiteBrand compact /></SheetTitle>
          <SheetDescription>Courts, activity, competition, and the people building the local scene.</SheetDescription>
        </SheetHeader>
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {SITE_NAV_ITEMS.map((item, index) => (
            <SheetClose key={item.href} asChild>
              <Link href={item.href}><span>0{index + 1}</span>{item.label}</Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href={cta.href} className={styles.mobileCta}>{cta.label} <ArrowRightIcon size={18} /></Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader({ cta = DEFAULT_CTA }: { cta?: HeaderCta }) {
  return (
    <header className={styles.root} data-site-header="true">
      <div className={styles.inner}>
        <SiteBrand />
        <DesktopNavigation cta={cta} />
        <MobileNavigation cta={cta} />
      </div>
    </header>
  );
}
