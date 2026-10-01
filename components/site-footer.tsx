import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SiteBrand } from "./site-header";
import styles from "./site-footer.module.css";

const FOOTER_LINKS = [
  { href: "/support", label: "Help" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.root} data-site-footer="true">
      <div className={styles.main}>
        <SiteBrand compact />
        <nav className={styles.navigation} aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
        </nav>
      </div>

      <Separator className={styles.rule} />

      <div className={styles.bottom}>
        <span>© 2026 LocalCheck</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
