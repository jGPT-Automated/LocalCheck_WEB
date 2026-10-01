import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SiteBrand } from "./site-header";
import styles from "./site-footer.module.css";

const FOOTER_GROUPS = [
  {
    label: "Explore",
    links: [
      { href: "/courts", label: "Courts" },
      { href: "/app", label: "The app" },
      { href: "/how-it-works", label: "How it works" },
    ],
  },
  {
    label: "Launch",
    links: [{ href: "/pioneers", label: "Pioneers" }],
  },
  {
    label: "Help & legal",
    links: [
      { href: "/support", label: "Support" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className={styles.root} data-site-footer="true">
      <div className={styles.main}>
        <div className={styles.identity}>
          <SiteBrand compact />
          <p>One shared platform for local courts, activity, and competition.</p>
          <a href="https://x.com/LocalCheckSport" rel="noreferrer" target="_blank">@LocalCheckSport</a>
        </div>

        <nav className={styles.navigation} aria-label="Footer navigation">
          {FOOTER_GROUPS.map((group) => (
            <div className={styles.group} key={group.label}>
              <span>{group.label}</span>
              {group.links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
            </div>
          ))}
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
