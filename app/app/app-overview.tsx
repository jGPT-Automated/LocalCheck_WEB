"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check, CornersOut, Trophy } from "@phosphor-icons/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { CalendarDaysIcon } from "@/components/ui/calendar-days";
import { CircleCheckIcon } from "@/components/ui/circle-check";
import { MapPinIcon } from "@/components/ui/map-pin";
import { SwitchCameraIcon } from "@/components/ui/switch-camera";
import { PRODUCT_EXPLANATION, PUBLIC_PROMISE } from "@/lib/messaging";
import styles from "./app-overview.module.css";

type ScreenProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  wide?: boolean;
};

const NAV_ITEMS = [
  { href: "#heatmap", label: "Heatmap" },
  { href: "#competition", label: "Competition" },
  { href: "#verify", label: "Add a court" },
  { href: "/pioneers", label: "Pioneers" },
];

const JOURNEY = [
  { number: "01", label: "Find a verified court" },
  { number: "02", label: "See when locals plan to play" },
  { number: "03", label: "Check in or schedule a game" },
  { number: "04", label: "Settle the result" },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className={`${styles.brand} ${compact ? styles.brandCompact : ""}`}>
      <span className={styles.brandMark} aria-hidden="true">
        <CornersOut size={compact ? 27 : 31} weight="bold" />
        <Check className={styles.brandCheck} size={compact ? 18 : 21} weight="bold" />
      </span>
      <span>LOCALCHECK</span>
    </Link>
  );
}

function ProductScreen({ src, alt, className = "", priority = false, wide = false }: ScreenProps) {
  return (
    <figure className={`${styles.phone} ${wide ? styles.phoneWide : ""} ${className}`}>
      <span className={styles.phoneSpeaker} aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        width={wide ? 1580 : 1179}
        height={wide ? 3504 : 2556}
        priority={priority}
        unoptimized
        sizes="(max-width: 760px) 58vw, (max-width: 1100px) 32vw, 360px"
        className={styles.phoneImage}
      />
    </figure>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""}`}>
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function DesktopNavigation() {
  return (
    <nav className={styles.desktopNav} aria-label="App overview">
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href}>{item.label}</Link>
      ))}
      <Button asChild className={styles.headerCta}>
        <Link href="/courts">Find a court <ArrowRightIcon size={17} /></Link>
      </Button>
    </nav>
  );
}

function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={styles.menuButton} aria-label="Open navigation">
          <Menu size={21} strokeWidth={2.5} />
        </Button>
      </SheetTrigger>
      <SheetContent className={styles.mobileSheet}>
        <SheetHeader className={styles.mobileSheetHeader}>
          <SheetTitle><Brand compact /></SheetTitle>
          <SheetDescription>The app that gets the local run out of the group chat.</SheetDescription>
        </SheetHeader>
        <nav className={styles.mobileNav} aria-label="Mobile app overview">
          {NAV_ITEMS.map((item, index) => (
            <SheetClose key={item.href} asChild>
              <Link href={item.href}><span>0{index + 1}</span>{item.label}</Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href="/courts" className={styles.mobileCta}>Find a court <ArrowRightIcon size={18} /></Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function AppOverview() {
  const reduced = useReducedMotion();

  return (
    <main className={styles.page} data-app-overview="true">
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true" />
        <header className={styles.header}>
          <Brand />
          <DesktopNavigation />
          <MobileNavigation />
        </header>

        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className={styles.liveBadge}><span /> THE LOCALCHECK APP</Badge>
            <h1>KNOW WHERE.<br />KNOW WHEN.<br /><em>PLAY FOR SOMETHING.</em></h1>
            <p>
              {PUBLIC_PROMISE} {PRODUCT_EXPLANATION}
            </p>
            <div className={styles.heroActions}>
              <Button asChild className={styles.primaryButton}>
                <Link href="/courts">Explore courts <ArrowRightIcon size={19} /></Link>
              </Button>
              <Button asChild variant="outline" className={styles.secondaryButton}>
                <a href="https://github.com/jGPT-Automated/LocalCheck_Expo" target="_blank" rel="noreferrer">Preview the mobile build</a>
              </Button>
            </div>
            <div className={styles.heroProof} aria-label="Core app capabilities">
              <span><CircleCheckIcon size={17} /> Verified places</span>
              <span><CircleCheckIcon size={17} /> Reviewed results</span>
              <span><CircleCheckIcon size={17} /> Local context</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroPhones}
            initial={reduced ? false : { opacity: 0, x: 34 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductScreen
              src="/app-screens/heatmap.png"
              alt="LocalCheck weekly Who's Going heatmap showing planned attendance and scheduled games"
              className={styles.heroPhoneBack}
              priority
            />
            <ProductScreen
              src="/app-screens/home-feed.png"
              alt="LocalCheck court home feed with check in, locals, visits, and recent activity"
              className={styles.heroPhoneFront}
              priority
            />
            <ProductScreen
              src="/app-screens/leaderboard.png"
              alt="LocalCheck regional basketball Elo leaderboard"
              className={styles.heroPhoneSide}
              priority
            />
            <span className={styles.heroAnnotation}>ACTUAL APP SCREENS</span>
          </motion.div>
        </div>

        <div className={styles.journeyStrip}>
          {JOURNEY.map((item) => (
            <div key={item.number}>
              <span>{item.number}</span>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.promiseSection}>
        <Reveal className={styles.promiseInner}>
          <Eyebrow index="01" light>THE PROBLEM</Eyebrow>
          <h2>A COURT LIST TELLS YOU <em>WHERE.</em><br />LOCALCHECK TELLS YOU <em>WHEN.</em></h2>
          <p>
            A pin on a map cannot tell you if a run is forming tonight. LocalCheck connects each verified court to the people who use it, the times they plan to show, and the games they organize there.
          </p>
        </Reveal>
      </section>

      <section className={styles.heatmapSection} id="heatmap">
        <div className={styles.sectionInner}>
          <Reveal className={styles.heatmapCopy}>
            <Eyebrow index="02">PLAN THE RUN</Eyebrow>
            <h2>WHO&apos;S GOING,<br /><em>BEFORE YOU GO.</em></h2>
            <p className={styles.lede}>
              The weekly heatmap turns individual plans into a shared picture of the court. Pick an hour, add your time, and help the next person know when the run is likely to be there.
            </p>

            <div className={styles.heatLegend} aria-label="Heatmap legend">
              <div className={styles.legendScale}>
                <span>Quiet</span>
                <i data-level="1" />
                <i data-level="2" />
                <i data-level="3" />
                <i data-level="4" />
                <span>Busy</span>
              </div>
              <div><i className={styles.gameDot} /> Scheduled game</div>
            </div>

            <div className={styles.stateRows}>
              <div><CalendarDaysIcon size={28} /><span><strong>PLANNED</strong>People add the hours they intend to play.</span></div>
              <div><MapPinIcon size={28} /><span><strong>LIVE</strong>Check-ins show who is at the court right now.</span></div>
              <div><Trophy size={28} weight="bold" /><span><strong>ORGANIZED</strong>A game has a time, court, format, and roster.</span></div>
            </div>
          </Reveal>

          <Reveal className={styles.heatmapVisual}>
            <div className={styles.visualLabel}>WEEKLY COURT INTENT</div>
            <ProductScreen
              src="/app-screens/heatmap.png"
              alt="Weekly LocalCheck heatmap with quiet-to-busy cells, a game marker, and a selected time"
              className={styles.heatmapPhone}
            />
            <div className={styles.heatmapCallout}>
              <span>FRI · 10 PM</span>
              <strong>1 GOING</strong>
              <p>The selected slot reveals who plans to show.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.useCaseSection}>
        <div className={styles.sectionInnerNarrow}>
          <Reveal className={styles.useCaseHeader}>
            <Eyebrow index="03" light>USE IT YOUR WAY</Eyebrow>
            <h2>THE SAME COURT.<br /><em>THREE REASONS TO OPEN THE APP.</em></h2>
          </Reveal>

          <Tabs defaultValue="find" className={styles.useCaseTabs}>
            <TabsList variant="line" className={styles.useCaseTabsList}>
              <TabsTrigger value="find">Find a run</TabsTrigger>
              <TabsTrigger value="organize">Organize a game</TabsTrigger>
              <TabsTrigger value="build">Build the scene</TabsTrigger>
            </TabsList>
            <TabsContent value="find" className={styles.useCasePanel}>
              <div className={styles.useCaseCopy}>
                <span>01 / FIND</span>
                <h3>Start with a real place.</h3>
                <p>Explore nearby courts, open the one you care about, and see its local activity instead of guessing from an old directory listing.</p>
                <ul><li>Verified court records</li><li>Map and list discovery</li><li>Locals, visits, and court activity</li></ul>
              </div>
              <ProductScreen src="/app-screens/explore-map.png" alt="LocalCheck Explore map for finding nearby courts" />
            </TabsContent>
            <TabsContent value="organize" className={styles.useCasePanel}>
              <div className={styles.useCaseCopy}>
                <span>02 / ORGANIZE</span>
                <h3>Turn “who&apos;s in?” into a roster.</h3>
                <p>Create a game at a court, choose the format and time, and let players join until the run is full.</p>
                <ul><li>2v2, 3v3, 5v5, or custom play</li><li>Open spots and joined players</li><li>One shared court and start time</li></ul>
              </div>
              <ProductScreen src="/app-screens/game-roster.png" alt="LocalCheck scheduled game roster with open spots and joined players" />
            </TabsContent>
            <TabsContent value="build" className={styles.useCasePanel}>
              <div className={styles.useCaseCopy}>
                <span>03 / BUILD</span>
                <h3>Make the local scene visible.</h3>
                <p>Add a missing court, bring people into a verified place, and give your community a dependable home for local play.</p>
                <ul><li>Live-location court submission</li><li>On-site photo verification</li><li>Community contribution through Pioneers</li></ul>
                <Button asChild variant="outline" className={styles.inlineButton}>
                  <Link href="/pioneers">Meet the Pioneers <ArrowRightIcon size={17} /></Link>
                </Button>
              </div>
              <ProductScreen src="/app-screens/add-court-success.png" alt="Successful verified court submission in LocalCheck" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className={styles.gameSection}>
        <div className={styles.sectionInner}>
          <Reveal className={styles.gameVisuals}>
            <ProductScreen src="/app-screens/schedule-going.png" alt="LocalCheck schedule with planned time and a scheduled game" className={styles.gamePhoneOne} />
            <ProductScreen src="/app-screens/game-roster.png" alt="LocalCheck game roster showing joined players and open positions" className={styles.gamePhoneTwo} />
          </Reveal>
          <Reveal className={styles.gameCopy}>
            <Eyebrow index="04">MAKE IT A GAME</Eyebrow>
            <h2>FROM A TIME SLOT<br />TO A <em>REAL ROSTER.</em></h2>
            <p className={styles.lede}>Intent is lightweight. A scheduled game is specific. Choose the court, time, and format, then give players one place to join.</p>
            <ol className={styles.stepList}>
              <li><span>01</span><div><strong>Choose a court and time</strong><p>The game lives where the run actually happens.</p></div></li>
              <li><span>02</span><div><strong>Set the format</strong><p>Make the number of spots and open positions clear.</p></div></li>
              <li><span>03</span><div><strong>Build the roster</strong><p>Players can see who joined and what is still open.</p></div></li>
            </ol>
          </Reveal>
        </div>
      </section>

      <section className={styles.eloSection} id="competition">
        <div className={styles.eloInner}>
          <Reveal className={styles.eloHeader}>
            <Eyebrow index="05" light>REVIEWED COMPETITION</Eyebrow>
            <h2>HOW ELO MOVES.<br /><em>AND WHY IT DOESN&apos;T MOVE YET.</em></h2>
            <p>
              LocalCheck separates a claimed score from a settled result. A submitted game enters review. The opponent can approve it or open a dispute. Only a finalized result reaches the record and the rating.
            </p>
          </Reveal>

          <div className={styles.eloStory}>
            <Reveal className={styles.eloPhones}>
              <ProductScreen src="/app-screens/leaderboard.png" alt="LocalCheck local and regional Elo leaderboard" className={styles.eloPhonePrimary} />
              <ProductScreen src="/app-screens/final-score-detail.png" alt="Finalized LocalCheck game result with Elo change" className={styles.eloPhoneSecondary} wide />
            </Reveal>

            <Reveal className={styles.eloExplainer}>
              <div className={styles.eloEquation} aria-label="Conceptual Elo movement">
                <div><span>EXPECTED RESULT</span><strong>Opponent strength</strong></div>
                <b>+</b>
                <div><span>ACTUAL RESULT</span><strong>Win or loss</strong></div>
                <b>=</b>
                <div className={styles.eloOutcome}><span>RATING MOVE</span><strong>After review</strong></div>
              </div>
              <p className={styles.eloNote}>
                Beating a higher-rated opponent can matter more than beating a lower-rated one. The leaderboard makes that competitive history visible at friends, local, and regional levels.
              </p>

              <Accordion type="single" collapsible defaultValue="review" className={styles.eloAccordion}>
                <AccordionItem value="strength">
                  <AccordionTrigger>Opponent strength</AccordionTrigger>
                  <AccordionContent>Elo compares the result with what the two current ratings suggested was likely. It rewards meaningful upsets more than expected wins.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="review">
                  <AccordionTrigger>Score review</AccordionTrigger>
                  <AccordionContent>A submitted score is pending, not final. The other player gets the chance to approve the result before it changes records and ratings.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="dispute">
                  <AccordionTrigger>Disputes</AccordionTrigger>
                  <AccordionContent>A disputed score pauses settlement. The review flow preserves both sides of the result instead of silently changing the leaderboard.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          </div>

          <div className={styles.reviewRail} aria-label="Score review sequence">
            <div><span>01</span><strong>Submit score</strong><small>Claimed result</small></div>
            <i />
            <div><span>02</span><strong>Opponent reviews</strong><small>Approve or dispute</small></div>
            <i />
            <div><span>03</span><strong>Result settles</strong><small>Record and Elo update</small></div>
          </div>
        </div>
      </section>

      <section className={styles.verifySection} id="verify">
        <div className={styles.verifyInner}>
          <Reveal className={styles.verifyCopy}>
            <Eyebrow index="06">GROW THE MAP</Eyebrow>
            <h2>VERIFY A COURT.<br /><em>LEAVE A REAL PLACE BEHIND.</em></h2>
            <p className={styles.lede}>
              When a court is missing, LocalCheck asks you to prove you are there. Location is locked on site, the camera opens live, and the submission is checked before the court joins the public map.
            </p>

            <div className={styles.verificationRules}>
              <div><MapPinIcon size={27} /><span><strong>ON-SITE LOCATION</strong>Proximity and duplicate checks protect the map.</span></div>
              <div><SwitchCameraIcon size={27} /><span><strong>LIVE CAMERA ONLY</strong>The court photo is captured in the moment, not uploaded from a gallery.</span></div>
              <div><CircleCheckIcon size={27} /><span><strong>VERIFIED BEFORE PUBLISHING</strong>The submission is reviewed before becoming a trusted court record.</span></div>
            </div>

            <Button asChild className={styles.darkButton}>
              <Link href="/pioneers">Become a Pioneer <ArrowRightIcon size={18} /></Link>
            </Button>
          </Reveal>

          <Reveal className={styles.verifyPhones}>
            <ProductScreen src="/app-screens/add-court-start.png" alt="Start of the LocalCheck add-a-court verification flow" className={styles.verifyPhoneStart} />
            <ProductScreen src="/app-screens/add-court-photo.png" alt="LocalCheck live camera step framing a real court" className={styles.verifyPhonePhoto} />
            <ProductScreen src="/app-screens/add-court-ai.png" alt="LocalCheck court submission verification step" className={styles.verifyPhoneAi} />
          </Reveal>
        </div>
      </section>

      <section className={styles.identitySection}>
        <div className={styles.identityInner}>
          <Reveal className={styles.identityCopy}>
            <Eyebrow index="07" light>YOUR LOCAL RECORD</Eyebrow>
            <h2>YOUR PROFILE ISN&apos;T A BIO.<br /><em>IT&apos;S WHAT YOU DID.</em></h2>
            <p>Visits, court activity, settled games, and competitive standing create a record rooted in real local play.</p>
          </Reveal>
          <Reveal className={styles.identityPhones}>
            <ProductScreen src="/app-screens/my-profile.png" alt="LocalCheck player profile and activity history" />
            <ProductScreen src="/app-screens/local-legend.png" alt="LocalCheck Local Legend profile state" wide />
          </Reveal>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <Reveal className={styles.faqHeading}>
            <Eyebrow index="08">QUICK READ</Eyebrow>
            <h2>WHAT THE APP<br /><em>ACTUALLY KNOWS.</em></h2>
          </Reveal>
          <Reveal className={styles.faqContent}>
            <Accordion type="single" collapsible defaultValue="heatmap">
              <AccordionItem value="heatmap">
                <AccordionTrigger>Is the heatmap live occupancy?</AccordionTrigger>
                <AccordionContent>No. The weekly heatmap shows when players plan to go. Live check-ins are a separate current-court signal, and scheduled games are marked as organized events.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="elo">
                <AccordionTrigger>Does a submitted score change Elo immediately?</AccordionTrigger>
                <AccordionContent>No. A score enters review first. A finalized result updates the competitive record and Elo; a dispute pauses settlement.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="courts">
                <AccordionTrigger>Can anyone add a court?</AccordionTrigger>
                <AccordionContent>Players can submit a missing court from the app, but the flow checks location, possible duplicates, and a live on-site photo before the court is published.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="sports">
                <AccordionTrigger>Which sports are shown?</AccordionTrigger>
                <AccordionContent>LocalCheck currently presents basketball and pickleball court discovery, schedules, games, and leaderboards within their own local context.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className={styles.finalCta}>
        <Reveal className={styles.finalCtaInner}>
          <MapPinIcon size={44} />
          <span>YOUR NEXT RUN STARTS WITH A REAL COURT.</span>
          <h2>FIND THE PLACE.<br /><em>SHOW UP TOGETHER.</em></h2>
          <div>
            <Button asChild className={styles.primaryButton}>
              <Link href="/courts">Explore nearby courts <ArrowRightIcon size={19} /></Link>
            </Button>
            <Button asChild variant="outline" className={styles.secondaryButton}>
              <Link href="/pioneers">Build your local scene</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <footer className={styles.footer}>
        <Brand compact />
        <div className={styles.footerLinks}>
          <Link href="/courts">Courts</Link>
          <Link href="/pioneers">Pioneers</Link>
          <Link href="/support">Support</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <Separator className={styles.footerRule} />
        <p>© 2026 LocalCheck. Built for the local run.</p>
      </footer>
    </main>
  );
}
