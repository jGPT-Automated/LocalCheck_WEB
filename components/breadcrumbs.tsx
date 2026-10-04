import Link from "next/link";
import { breadcrumbSchema, jsonLd } from "@/lib/structured-data";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail, schema = true }: { trail: readonly Crumb[]; schema?: boolean }) {
  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema(trail))} />}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {trail.map((crumb, index) => (
            <li key={crumb.path}>
              {index === trail.length - 1
                ? <span aria-current="page">{crumb.name}</span>
                : <Link href={crumb.path}>{crumb.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
