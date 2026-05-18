"use client";

import { Suspense, lazy, useState } from "react";
import {
  BookOpen,
  Gift,
  GraduationCap,
  ListOrdered,
  Users,
  Shuffle,
  Map,
  Gem,
  Castle,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://animestory2wiki.wiki";
  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toolIcons = [Gift, GraduationCap, ListOrdered, Users, Shuffle, Map, Gem, Castle];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Anime Story 2 Wiki",
      },
      {
        "@type": "VideoGame",
        name: "Anime Story 2",
        gamePlatform: ["PC", "Mobile", "Console", "Roblox"],
        applicationCategory: "Game",
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <BookOpen className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a href="https://www.youtube.com/watch?v=Ity6X6yXmrc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors">
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a href="https://www.roblox.com/games/116877041621051/Anime-Story-2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors">
                {t.hero.playOnRobloxCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId="Ity6X6yXmrc" title="Anime Story 2 Black Clover Update 0.5 Guide" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span></h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionIds = ["codes", "beginner-guide", "tier-list", "units-guide", "traits-rerolls", "worlds-progression", "relics-items-evolution", "raids-tower-events"];
              const Icon = toolIcons[index];
              const sectionId = sectionIds[index];
              return (
                <a
                  key={sectionId}
                  href={`#${sectionId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(sectionId);
                  }}
                  className="scroll-reveal group block rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                >
                  <div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                    {Icon ? <Icon className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /> : null}
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{t.modules.animeStory2Codes.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{t.modules.animeStory2Codes.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2Codes.cards.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2BeginnerGuide.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2BeginnerGuide.intro}</p>
          </div>
          <div className="space-y-3 md:space-y-4">
            {t.modules.animeStory2BeginnerGuide.steps.map((step: any, index: number) => (
              <div key={index} className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl">
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tier-list" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2TierList.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2TierList.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.animeStory2TierList.tiers.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <p className="text-xs mb-2">{item.rank}</p>
                <h3 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="units-guide" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2UnitsGuide.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2UnitsGuide.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2UnitsGuide.groups.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="traits-rerolls" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2TraitsRerolls.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2TraitsRerolls.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2TraitsRerolls.traits.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.35)]">
                    {item.chance}
                  </span>
                </div>
                <p className="text-sm mb-1"><span className="text-muted-foreground">Buff:</span> {item.buff}</p>
                <p className="text-sm mb-1"><span className="text-muted-foreground">Best Role:</span> {item.bestFor}</p>
                <p className="text-sm text-muted-foreground">{item.rerollAdvice}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="worlds-progression" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2WorldsProgression.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2WorldsProgression.intro}</p>
          </div>
          <div className="space-y-3">
            {t.modules.animeStory2WorldsProgression.steps.map((item: any, index: number) => (
              <div key={index} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="relics-items-evolution" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2RelicsItemsEvolution.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2RelicsItemsEvolution.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2RelicsItemsEvolution.items.map((item: any, index: number) => (
              <div key={index} className="p-6 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2 text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="raids-tower-events" className="scroll-mt-24 px-4 py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.modules.animeStory2RaidsTowerEvents.title}</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.modules.animeStory2RaidsTowerEvents.intro}</p>
          </div>
          <div className="space-y-2">
            {t.modules.animeStory2RaidsTowerEvents.faqs.map((faq: any, index: number) => (
              <div key={index} className="border border-border rounded-xl overflow-hidden">
                <button onClick={() => setFaqExpanded(faqExpanded === index ? null : index)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${faqExpanded === index ? "rotate-180" : ""}`} />
                </button>
                {faqExpanded === index && <div className="px-5 pb-5 text-muted-foreground text-sm">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection faq={t.faq} />
      </Suspense>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-970x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_970X90} className="hidden md:flex" />

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection cta={t.cta} locale={locale} />
      </Suspense>
    </div>
  );
}
