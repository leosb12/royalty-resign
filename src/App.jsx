import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  Hammer,
  Layers3,
  MapPin,
  MessageCircle,
  PaintBucket,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'

function App() {
  const phone = '270-779-9436'
  const facebookUrl = 'https://www.facebook.com/share/1CKSBtQhmn/?mibextid=wwXIfr'
  const autoSlideDelay = 6500
  const manualPauseDelay = 9000

  const banners = [
    {
      image: '/banner1.png',
      title: 'Elite Resin Flooring',
      subtitle: 'Built for homes, garages, and business spaces in Kentucky.',
      position: 'center center',
    },
    {
      image: '/banner2.png',
      title: 'Statement Epoxy Designs',
      subtitle: 'Custom finishes with depth, gloss, and long-term durability.',
      position: 'center center',
    },
  ]

  const services = [
    {
      title: 'Flake Flooring Systems',
      description:
        'Durable chip systems engineered for garages, basements, and workshops that need clean style and hard-wearing performance.',
      icon: Layers3,
    },
    {
      title: 'Custom Epoxy Designs',
      description:
        'Statement floors with metallic flow, movement, and depth. Every installation is custom-built to your space and vision.',
      icon: PaintBucket,
    },
    {
      title: 'Commercial Grade Protection',
      description:
        'Heavy-duty coatings designed for traffic, impact, and everyday wear in business environments that demand reliability.',
      icon: Building2,
    },
  ]

  const process = [
    {
      title: 'On-Site Consultation',
      description:
        'We assess concrete condition, environment, and usage goals to design the right flooring system.',
      icon: MapPin,
    },
    {
      title: 'Surface Preparation',
      description:
        'Diamond grinding and crack repair ensure a clean profile so your floor bonds correctly and lasts longer.',
      icon: Hammer,
    },
    {
      title: 'Precision Installation',
      description:
        'Base coats, color systems, and top coats are applied in controlled steps for a flawless final finish.',
      icon: Droplets,
    },
    {
      title: 'Final Walkthrough',
      description:
        'We verify quality, review cure timelines, and make sure you are fully confident before project handoff.',
      icon: ShieldCheck,
    },
  ]

  const highlights = [
    'Easy-to-clean finish',
    'Resistant to stains and scratches',
    'Custom colors, flakes and design styles',
    'Residential and commercial applications',
    'Licensed and insured workmanship',
  ]

  const gallery = [
    {
      title: 'Flake Garage System',
      image:
        'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80',
      tag: 'Clean. Tough. Timeless.',
    },
    {
      title: 'Metallic Resin Flow',
      image:
        'https://images.unsplash.com/photo-1604014056630-0f0d8d6b7657?auto=format&fit=crop&w=1200&q=80',
      tag: 'Art-level custom movement.',
    },
    {
      title: 'Commercial Durability',
      image:
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
      tag: 'Built for daily traffic.',
    },
  ]

  const [activeBanner, setActiveBanner] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const resumeAutoplayTimeoutRef = useRef(null)

  const pauseAutoplayTemporarily = () => {
    setAutoplayPaused(true)

    if (resumeAutoplayTimeoutRef.current) {
      clearTimeout(resumeAutoplayTimeoutRef.current)
    }

    resumeAutoplayTimeoutRef.current = setTimeout(() => {
      setAutoplayPaused(false)
    }, manualPauseDelay)
  }

  const moveBanner = (direction) => {
    setActiveBanner((current) => {
      const next = current + direction
      return (next + banners.length) % banners.length
    })
    pauseAutoplayTemporarily()
  }

  const selectBanner = (index) => {
    setActiveBanner(index)
    pauseAutoplayTemporarily()
  }

  useEffect(() => {
    if (autoplayPaused || banners.length < 2) return undefined

    const intervalId = setInterval(() => {
      setActiveBanner((current) => (current + 1) % banners.length)
    }, autoSlideDelay)

    return () => clearInterval(intervalId)
  }, [autoplayPaused, banners.length])

  useEffect(() => {
    return () => {
      if (resumeAutoplayTimeoutRef.current) {
        clearTimeout(resumeAutoplayTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="bg-[#060606] text-white">
      <header className="fixed left-0 right-0 top-0 z-50 bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10">
          <div>
            <p className="font-brand text-3xl leading-none text-[#f0f3f8] md:text-4xl">
              Royalty Resin
            </p>
            <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#ef2b37] sm:text-xs">
              Premium Flooring Studio
            </p>
          </div>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-white transition hover:bg-white/10 md:inline-flex"
          >
            <MessageCircle size={15} />
            Follow on Facebook
          </a>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <div className="relative aspect-[16/9] min-h-[360px] w-full sm:min-h-[420px] md:aspect-auto md:h-[100svh]">
            {banners.map((banner, index) => (
              <img
                key={banner.image}
                src={banner.image}
                alt={banner.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  activeBanner === index
                    ? 'scale-100 opacity-100'
                    : 'scale-105 opacity-0'
                }`}
                style={{ objectPosition: banner.position }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}

            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/38 to-black/18" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-black/18" />

            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="mx-auto flex h-full w-full max-w-7xl items-end md:items-center px-4 pb-8 pt-24 sm:px-6 sm:pb-10 md:px-10 md:pb-12 md:pt-24">
                <div className="max-w-[290px] sm:max-w-xl md:max-w-3xl">
                  <p className="font-display text-[10px] uppercase tracking-[0.3em] text-[#ef2b37] sm:text-xs md:text-sm">
                    Premium epoxy and resin floors
                  </p>

                  <h1 className="mt-2 font-display text-[2rem] uppercase leading-[0.9] text-white sm:text-5xl md:mt-4 md:text-6xl lg:text-7xl">
                    {banners[activeBanner].title}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:mt-4 md:text-xl">
                    {banners[activeBanner].subtitle}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5 sm:gap-3 md:mt-7">
                    <a
                      href={`tel:${phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-4 py-2.5 font-display text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722] sm:px-5 sm:text-xs md:px-6 md:py-3.5 md:text-sm"
                    >
                      <PhoneCall size={15} />
                      Call for Free Estimate
                    </a>

                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 font-display text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-white/20 sm:px-5 sm:text-xs md:px-6 md:py-3.5 md:text-sm"
                    >
                      Message on Facebook
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {banners.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => moveBanner(-1)}
                  aria-label="Previous banner"
                  className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:inline-flex md:left-6 md:h-12 md:w-12"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => moveBanner(1)}
                  aria-label="Next banner"
                  className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 md:right-6 md:h-12 md:w-12"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-6">
                  {banners.map((banner, index) => (
                    <button
                      key={banner.image}
                      type="button"
                      onClick={() => selectBanner(index)}
                      aria-label={`Go to banner ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        activeBanner === index
                          ? 'w-8 bg-[#ef2b37]'
                          : 'w-2.5 bg-white/55 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:px-10 md:py-20 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-display text-xs uppercase tracking-[0.24em] text-white/80">
              <MapPin size={14} className="text-[#ef2b37]" />
              Bowling Green, Kentucky
            </p>

            <h2 className="mt-6 font-display text-4xl uppercase leading-[0.9] text-white md:text-6xl">
              Transform your floor into a signature space.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Residential and commercial epoxy systems with elite craftsmanship,
              dramatic aesthetics, and long-term durability. Built to look bold.
              Built to perform daily.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-6 py-3 font-display text-sm uppercase tracking-[0.16em] text-white transition hover:bg-[#c41722]"
              >
                <PhoneCall size={17} />
                Call for Free Estimate
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-display text-sm uppercase tracking-[0.16em] text-white transition hover:bg-white/10"
              >
                Message us on Facebook
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-3xl text-[#ef2b37]">100%</p>
                <p className="mt-1 font-display text-sm uppercase tracking-[0.18em] text-white/70">
                  Custom systems
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-3xl text-[#ef2b37]">Fast</p>
                <p className="mt-1 font-display text-sm uppercase tracking-[0.18em] text-white/70">
                  Turnaround planning
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-3xl text-[#ef2b37]">Insured</p>
                <p className="mt-1 font-display text-sm uppercase tracking-[0.18em] text-white/70">
                  Professional installation
                </p>
              </article>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-md">
              <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl shadow-black/30">
                <img
                  src={gallery[1].image}
                  alt="Metallic epoxy flooring design"
                  className="h-[24rem] w-full rounded-2xl object-cover md:h-[28rem]"
                  loading="eager"
                />
                <div className="absolute inset-x-7 bottom-7 rounded-xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-sm">
                  <p className="font-display text-2xl uppercase text-white">
                    Custom Epoxy Flooring
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Dramatic movement, depth and gloss.
                  </p>
                </div>
              </article>

              <article className="absolute -left-10 top-8 hidden w-36 rotate-[-8deg] overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-2 backdrop-blur-sm md:block">
                <img
                  src={gallery[0].image}
                  alt="Flake epoxy garage flooring"
                  className="h-36 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </article>

              <article className="absolute -right-8 bottom-10 hidden w-32 rotate-[8deg] overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-2 backdrop-blur-sm md:block">
                <img
                  src={gallery[2].image}
                  alt="Commercial epoxy floor installation"
                  className="h-32 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-6 md:grid-cols-3 md:px-10 md:pb-20">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#ef2b37]/50"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#ef2b37]/30 bg-[#ef2b37]/10">
                  <Icon className="text-[#ef2b37]" />
                </div>

                <h3 className="font-display text-2xl uppercase leading-tight text-white">
                  {service.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {service.description}
                </p>
              </article>
            )
          })}
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 md:px-10 md:pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-[#ef2b37]">
              Why Royalty Resin
            </p>

            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
              High-performance floors with premium finish quality.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Every installation is engineered for long-term use, visual impact,
              and confident ownership in homes and business environments.
            </p>
          </div>

          <ul className="grid gap-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#ef2b37]" size={18} />
                <span className="text-base text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-10 md:pb-20">
          <div className="mb-8">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-[#ef2b37]">
              Installation Flow
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
              Our proven process
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {process.map((step, index) => {
              const Icon = step.icon

              return (
                <article
                  key={step.title}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#ef2b37]/10 blur-3xl" />
                  <p className="font-display text-sm uppercase tracking-[0.2em] text-white/45">
                    Step {index + 1}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <Icon className="text-[#ef2b37]" size={24} />
                    <h3 className="font-display text-2xl uppercase text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-base leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-10 md:pb-20">
          <div className="mb-8">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-[#ef2b37]">
              Featured Looks
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
              Flooring styles with presence
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {gallery.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-black/40 p-4 backdrop-blur-sm">
                  <p className="font-display text-2xl uppercase text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-wider text-white/70">
                    {item.tag}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-6 md:grid-cols-3 md:px-10 md:pb-20">
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-1 text-[#ef2b37]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-base leading-relaxed text-white/80">
              Excellent craftsmanship and communication from start to finish. The
              floor completely changed our garage.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2 text-[#ef2b37]">
              <Clock3 size={18} />
              <span className="font-display text-sm uppercase tracking-wider text-white/80">
                On-time project flow
              </span>
            </div>
            <p className="text-base leading-relaxed text-white/80">
              Fast, professional, and clean work. The final result looks high-end
              and handles daily traffic with zero issues.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2 text-[#ef2b37]">
              <Sparkles size={18} />
              <span className="font-display text-sm uppercase tracking-wider text-white/80">
                Lasting finish
              </span>
            </div>
            <p className="text-base leading-relaxed text-white/80">
              The metallic epoxy design turned out better than expected. It is the
              first thing everyone notices when they walk in.
            </p>
          </article>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-10">
          <div className="rounded-3xl border border-[#ef2b37]/30 bg-gradient-to-r from-white/[0.04] to-[#ef2b37]/[0.08] p-8 text-center md:p-12">
            <p className="font-display text-sm uppercase tracking-[0.24em] text-[#ef2b37]">
              Start Your Project
            </p>

            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.9] text-white md:text-6xl">
              Premium flooring. Built in Bowling Green, KY.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Get a custom quote and design consultation for your garage, basement,
              storefront, or workspace.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722]"
              >
                <PhoneCall size={17} />
                {phone}
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
              >
                <MessageCircle size={17} />
                Facebook Page
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-10 text-center sm:px-6 md:px-10 md:text-left">
          <p className="font-display text-3xl uppercase text-white md:text-4xl">
            Royalty Resin
          </p>
          <p className="font-display text-sm uppercase tracking-[0.2em] text-white/45">
            Licensed and Insured
          </p>
          <p className="text-white/55">
            Serving Bowling Green, KY and surrounding areas.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App