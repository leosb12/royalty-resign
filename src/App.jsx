import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Hammer,
  Layers3,
  MapPin,
  Menu,
  MessageCircle,
  PaintBucket,
  PhoneCall,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const cardMotion = {
  initial: { opacity: 0, y: 22, scale: 0.985 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

function GlobalHeader({ facebookUrl, pathname }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(window.location.hash || '')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const scrollToFaqIfNeeded = () => {
      if ((window.location.hash || '').toLowerCase() !== '#faq') {
        return
      }

      const faqSection = document.getElementById('faq')
      if (!faqSection) {
        return
      }

      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Wait one frame so the section exists after route render.
    const frameId = window.requestAnimationFrame(scrollToFaqIfNeeded)
    window.addEventListener('hashchange', scrollToFaqIfNeeded)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('hashchange', scrollToFaqIfNeeded)
    }
  }, [pathname])

  const handleNavClick = (key) => {
    if (key === 'faq') {
      setCurrentHash('#faq')
    } else {
      setCurrentHash('')
    }
  }

  const handleFaqClick = (event) => {
    event.preventDefault()
    setCurrentHash('#faq')

    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
    if (currentPath !== '/') {
      window.location.assign('/#faq')
      return
    }

    window.history.replaceState(null, '', '/#faq')
    const faqSection = document.getElementById('faq')
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navItems = [
    { label: 'Our Work', href: '/works', key: 'works' },
    { label: 'About Us', href: '/about', key: 'about' },
    { label: 'Contact', href: '/contact', key: 'contact' },
    { label: 'Faq', href: '/#faq', key: 'faq' },
  ]

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-md"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-10">
        <a href="/" className="shrink-0">
          <p className="font-brand text-2xl leading-none text-[#f0f3f8] md:text-3xl">
            Royalty Resin
          </p>
          <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#ef2b37] sm:text-xs">
            Premium Flooring Studio
          </p>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.key === 'faq'
                ? pathname === '/' && currentHash.toLowerCase() === '#faq'
                : pathname === item.href

            return (
              <motion.a
                key={item.key}
                href={item.href}
                onClick={(event) => {
                  if (item.key === 'faq') {
                    handleFaqClick(event)
                    return
                  }

                  handleNavClick(item.key)
                }}
                className={`rounded-full px-4 py-2 font-display text-xs uppercase tracking-[0.18em] transition ${
                  isActive
                    ? 'bg-[#ef2b37]/90 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {item.label}
              </motion.a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
          >
            <MessageCircle size={14} />
            Facebook
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="border-t border-white/10 bg-black/75 px-4 pb-4 pt-3 backdrop-blur-md sm:px-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
          >
            <nav className="grid gap-2">
              {navItems.map((item) => {
                const isActive =
                  item.key === 'faq'
                    ? pathname === '/' && currentHash.toLowerCase() === '#faq'
                    : pathname === item.href

                return (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={(event) => {
                      if (item.key === 'faq') {
                        handleFaqClick(event)
                      } else {
                        handleNavClick(item.key)
                      }

                      setMenuOpen(false)
                    }}
                    className={`rounded-xl px-4 py-2.5 font-display text-xs uppercase tracking-[0.18em] transition ${
                      isActive
                        ? 'bg-[#ef2b37]/90 text-white'
                        : 'bg-white/[0.03] text-white/85 hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                )
              })}

              <motion.a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-2.5 font-display text-xs uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/10"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle size={14} />
                Follow on Facebook
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function ContactPage({ phone, facebookUrl }) {
  const [projectType, setProjectType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitFeedback, setSubmitFeedback] = useState({
    type: 'idle',
    message: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    const selectedProjectType = (formData.get('projectType') || '').toString().trim()
    const otherProjectType = (formData.get('projectTypeOther') || '').toString().trim()

    const payload = {
      fullName: (formData.get('fullName') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      projectType:
        selectedProjectType === 'other' && otherProjectType
          ? `Other: ${otherProjectType}`
          : selectedProjectType,
      preferredTimeline: (formData.get('timeline') || '').toString().trim(),
      projectDetails: (formData.get('message') || '').toString().trim(),
    }

    try {
      setIsSubmitting(true)
      setSubmitFeedback({ type: 'idle', message: '' })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Contact form request failed')
      }

      setSubmitFeedback({
        type: 'success',
        message: 'Your request was sent successfully. We will contact you shortly.',
      })
      formElement.reset()
      setProjectType('')
    } catch {
      setSubmitFeedback({
        type: 'error',
        message: `An error occurred while sending the form. Please contact us at ${phone}.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="min-h-screen px-4 pb-10 pt-28 text-white sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-5xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to Home
        </a>

        <motion.section {...sectionMotion} className="mt-6 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.24em] text-[#ef2b37]">
              Contact Royalty Resin
            </p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white md:text-6xl">
              Let&apos;s Build Your Floor
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
              Tell us about your project and we will reach out with the best
              system, timeline, and estimate options for your space.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/85 transition hover:bg-black/45"
              >
                <PhoneCall size={16} className="text-[#ef2b37]" />
                {phone}
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/85 transition hover:bg-black/45"
              >
                <MessageCircle size={16} className="text-[#ef2b37]" />
                Message us on Facebook
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="fullName" className="text-sm uppercase tracking-[0.16em] text-white/70">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#ef2b37]/70 focus:outline-none"
                placeholder="Your full name"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm uppercase tracking-[0.16em] text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#ef2b37]/70 focus:outline-none"
                  placeholder="you@email.com"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm uppercase tracking-[0.16em] text-white/70">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#ef2b37]/70 focus:outline-none"
                  placeholder="(270) 000-0000"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2 md:gap-4">
              <div className="grid gap-2">
                <label htmlFor="projectType" className="text-sm uppercase tracking-[0.16em] text-white/70">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={projectType}
                    onChange={(event) => setProjectType(event.target.value)}
                    className={`w-full appearance-none rounded-xl border bg-black/30 px-4 py-3 pr-11 focus:outline-none ${
                      projectType === ''
                        ? 'border-white/15 text-white/55 focus:border-[#ef2b37]/70'
                        : 'border-[#ef2b37]/70 text-white'
                    }`}
                    required
                  >
                    <option value="" disabled hidden>
                      Select project type
                    </option>
                    <option value="garage" className="bg-[#101010] text-white">Garage floor</option>
                    <option value="basement" className="bg-[#101010] text-white">Basement floor</option>
                    <option value="commercial" className="bg-[#101010] text-white">Commercial floor</option>
                    <option value="custom" className="bg-[#101010] text-white">Custom epoxy design</option>
                    <option value="other" className="bg-[#101010] text-white">Other</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="timeline" className="text-sm uppercase tracking-[0.16em] text-white/70">
                  Preferred Timeline
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  type="text"
                  className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#ef2b37]/70 focus:outline-none"
                  placeholder="e.g. Next 2-4 weeks"
                />
              </div>
            </div>

            {projectType === 'other' && (
              <div className="grid gap-2">
                <label htmlFor="projectTypeOther" className="text-sm uppercase tracking-[0.16em] text-white/70">
                  Other Project Type
                </label>
                <input
                  id="projectTypeOther"
                  name="projectTypeOther"
                  type="text"
                  required
                  className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#ef2b37]/70 focus:outline-none"
                  placeholder="Write your project type"
                />
              </div>
            )}

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm uppercase tracking-[0.16em] text-white/70">
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="resize-none rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/35 focus:border-[#ef2b37]/70 focus:outline-none"
                placeholder="Tell us about your space, style, and goals."
              />
            </div>

            {submitFeedback.type !== 'idle' && (
              <p
                className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                  submitFeedback.type === 'success'
                    ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-100'
                    : 'border-red-400/40 bg-red-500/10 text-red-100'
                }`}
              >
                {submitFeedback.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Submit Request'}
            </button>
          </form>
        </motion.section>
      </div>
    </motion.div>
  )
}

function AboutPage({ phone, facebookUrl }) {
  const pillars = [
    {
      title: 'Craft-Driven Process',
      description: 'Every project follows strict prep, coating, and finishing standards for reliable long-term performance.',
      icon: ShieldCheck,
    },
    {
      title: 'Design and Performance',
      description: 'We blend statement-level aesthetics with systems engineered for daily traffic and easy maintenance.',
      icon: PaintBucket,
    },
    {
      title: 'Local Team, Professional Results',
      description: 'Based in Bowling Green, our crew serves homeowners and businesses with disciplined execution.',
      icon: MapPin,
    },
  ]

  return (
    <motion.div
      className="min-h-screen px-4 pb-12 pt-28 text-white sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.section {...sectionMotion} className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-display text-xs uppercase tracking-[0.24em] text-[#ef2b37]">
              About Us
            </p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white md:text-6xl">
              Built on Craft and Consistency
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Royalty Resin was built to deliver elite resin and epoxy floors for
              homes, garages, and commercial spaces. We focus on surface science,
              clean execution, and finishes that stay impressive over time.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722]"
              >
                <PhoneCall size={15} />
                Call {phone}
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
              >
                <MessageCircle size={15} />
                Message on Facebook
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src="/garage-epoxy-installation-bowling-green-ky.jpg"
              alt="Royalty Resin garage installation"
              className="h-52 w-full rounded-2xl object-cover sm:h-64"
              loading="eager"
            />
            <img
              src="/metallic-epoxy-flooring-design-bowling-green-ky.jpg"
              alt="Royalty Resin metallic floor finish"
              className="h-52 w-full rounded-2xl object-cover sm:h-64"
              loading="lazy"
            />
            <img
              src="/garage-flake-epoxy-finish-bowling-green-ky.jpg"
              alt="Royalty Resin finished flake floor"
              className="col-span-2 h-56 w-full rounded-2xl object-cover sm:h-72"
              loading="lazy"
            />
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-8 grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <motion.article
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                {...cardMotion}
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#ef2b37]/30 bg-[#ef2b37]/10">
                  <Icon size={20} className="text-[#ef2b37]" />
                </div>
                <h2 className="mt-4 font-display text-2xl uppercase leading-[0.94] text-white">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/72 md:text-base">
                  {pillar.description}
                </p>
              </motion.article>
            )
          })}
        </motion.section>

        <motion.section {...sectionMotion} className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-[#ef2b37]/[0.08] p-6 md:p-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-[#ef2b37]">
            Our Promise
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
            Results that look premium and perform daily.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            We do not skip preparation, we do not cut corners, and we do not
            compromise finish quality. Every Royalty Resin floor is built to be
            visually strong and structurally dependable.
          </p>
        </motion.section>
      </div>
    </motion.div>
  )
}

function WorksPage({ phone }) {
  const reelProjects = [
    {
      title: 'Basement Revival Build',
      category: 'Basement Transformation',
      video: '/projects/basement-epoxy-floor-transformation-bowling-green-ky.mp4',
      poster: '/garage-floor-before-epoxy-bowling-green-ky.jpg',
      description:
        'A full basement upgrade with moisture-managed prep and a seamless resin finish built for clean daily performance.',
      highlights: ['Basement Upgrade', 'Moisture-Aware Prep'],
      icon: Layers3,
    },
    {
      title: '700 SQFT Garage Flake System',
      category: 'Garage Flake Makeover',
      video: '/projects/700sqft-garage-flake-epoxy-bowling-green-ky.mp4',
      poster: '/garage-epoxy-installation-bowling-green-ky.jpg',
      description:
        'This 700 sq ft garage moved from plain slab to a premium flake blend, executed with strict prep and precision topcoating.',
      highlights: ['Flake Blend Finish', 'Prep-to-Perfection'],
      icon: Hammer,
    },
    {
      title: 'Royalty Signature Finish',
      category: 'Royalty Signature Coating',
      video: '/projects/royalty-signature-epoxy-floor-bowling-green-ky.mp4',
      poster: '/garage-flake-epoxy-finish-bowling-green-ky.jpg',
      description:
        'Your floor deserves the Royalty treatment: elevated style, durable protection, and a finish designed to stand out long-term.',
      highlights: ['Luxury Look', 'High-Traffic Ready'],
      icon: ShieldCheck,
    },
  ]

  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const reelVideoRefs = useRef([])

  const handleReelEnded = (index) => {
    const nextIndex = (index + 1) % reelProjects.length
    setActiveReelIndex(nextIndex)
  }

  useEffect(() => {
    const currentVideo = reelVideoRefs.current[activeReelIndex]
    if (!currentVideo) {
      return
    }

    reelVideoRefs.current.forEach((video, index) => {
      if (!video || index === activeReelIndex) {
        return
      }

      video.pause()
    })

    currentVideo.currentTime = 0
    currentVideo.defaultMuted = true
    currentVideo.muted = true
    const playAttempt = currentVideo.play()
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {})
    }
  }, [activeReelIndex, reelProjects.length])

  const trustPills = [
    {
      label: 'Precision Prep Standards',
      icon: CheckCircle2,
    },
    {
      label: 'Premium Materials',
      icon: Droplets,
    },
    {
      label: 'Bowling Green, KY',
      icon: MapPin,
    },
  ]

  return (
    <motion.div
      className="min-h-screen px-4 pb-10 pt-28 text-white sm:px-6 md:px-10"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
        >
          <ArrowRight size={14} className="rotate-180" />
          Back to Home
        </a>

        <motion.section {...sectionMotion} className="reveal-up mt-6 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-[#ef2b37]/[0.08] p-6 md:p-10">
          <p className="font-display text-xs uppercase tracking-[0.24em] text-[#ef2b37]">
            Reel Projects
          </p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white md:text-6xl">
            High-Impact Floor Transformations
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            A curated showcase of real Royalty Resin installs. Vertical reels,
            real jobsite execution, and finish quality you can see in motion.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722]"
            >
              <PhoneCall size={15} />
              Call for an Estimate
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
            >
              Contact Us
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {trustPills.map((pill) => {
              const Icon = pill.icon

              return (
                <div
                  key={pill.label}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2"
                >
                  <Icon size={15} className="text-[#ef2b37]" />
                  <span className="font-display text-xs uppercase tracking-[0.12em] text-white/80">
                    {pill.label}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reelProjects.map((project, index) => {
            const Icon = project.icon
            const revealClass =
              index === 0
                ? 'reveal-up'
                : index === 1
                  ? 'reveal-up-delay-1'
                  : 'reveal-up-delay-2'

            return (
              <motion.article
                key={project.title}
                className={`works-reel-card group mx-auto w-full max-w-[280px] p-4 sm:max-w-[305px] md:max-w-none ${revealClass}`}
                {...cardMotion}
                transition={{ ...cardMotion.transition, delay: index * 0.08 }}
              >
                <div
                  className="works-reel-media relative mx-auto h-[46svh] min-h-[285px] max-h-[400px] w-auto overflow-hidden rounded-2xl border border-white/10 bg-black sm:h-[50svh] sm:max-h-[440px] md:h-[52svh] md:min-h-[320px] md:max-h-[500px]"
                  style={{ aspectRatio: '9 / 16' }}
                >
                  <video
                    src={project.video}
                    poster={project.poster}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    ref={(element) => {
                      reelVideoRefs.current[index] = element
                    }}
                    onLoadedData={() => {
                      const currentVideo = reelVideoRefs.current[index]
                      if (!currentVideo) {
                        return
                      }

                      if (activeReelIndex === index) {
                        currentVideo.defaultMuted = true
                        currentVideo.muted = true
                        const playAttempt = currentVideo.play()
                        if (playAttempt && typeof playAttempt.catch === 'function') {
                          playAttempt.catch(() => {})
                        }
                      }
                    }}
                    onPlay={() => {
                      if (activeReelIndex !== index) {
                        setActiveReelIndex(index)
                      }
                    }}
                    onEnded={() => handleReelEnded(index)}
                    muted
                    loop={false}
                    controls
                    playsInline
                    autoPlay={index === 0}
                    preload="metadata"
                  />

                  <div className="absolute inset-x-3 top-3 flex items-center justify-between rounded-xl border border-white/15 bg-black/45 px-3 py-2 backdrop-blur-sm">
                    <span className="font-display text-[11px] uppercase tracking-[0.2em] text-white/85">
                      {project.category}
                    </span>
                    <Icon size={14} className="text-[#ef2b37]" />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="font-display text-3xl uppercase leading-[0.94] text-white">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/72 md:text-base">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-[#ef2b37]/30 bg-[#ef2b37]/10 px-3 py-1 font-display text-[10px] uppercase tracking-[0.15em] text-white/85"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.section>

        <motion.section {...sectionMotion} className="reveal-up-delay-3 mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 md:p-8">
          <div className="before-after-heading-wrap rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
            <p className="font-display text-xs uppercase tracking-[0.22em] text-[#ef2b37]">
              Before and After
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
              From Plain Concrete to Royalty Metallic
            </h2>
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-white/72 md:text-lg">
              We transformed this garage from plain concrete into a custom metallic floor that reflects the power and style of this supercar. When the vehicle is legendary, the floor beneath it should be equally iconic.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/80">
                <PaintBucket size={13} className="text-[#ef2b37]" />
                Custom Metallic System
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/80">
                <ShieldCheck size={13} className="text-[#ef2b37]" />
                Built for Daily Use
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/80">
                <Star size={13} className="text-[#ef2b37]" />
                Signature Showroom Look
              </span>
            </div>
          </div>

          <div className="mt-6 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            <article className="before-after-image-card group">
              <div className="before-after-image-wrap">
                <img
                  src="/garage-floor-before-epoxy-bowling-green-ky.jpg"
                  alt="Garage floor before metallic resin installation"
                  className="before-after-image"
                  loading="lazy"
                />
                <span className="before-after-badge">Before</span>
              </div>
            </article>

            <div className="hidden md:flex">
              <span className="before-after-divider inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ef2b37]/45 bg-[#ef2b37]/20 text-[#ef2b37]">
                <ArrowRight size={20} />
              </span>
            </div>

            <article className="before-after-image-card group">
              <div className="before-after-image-wrap">
                <img
                  src="/garage-flake-epoxy-finish-bowling-green-ky.jpg"
                  alt="Garage floor after custom metallic resin transformation"
                  className="before-after-image"
                  loading="lazy"
                />
                <span className="before-after-badge">After</span>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section {...sectionMotion} className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-[#ef2b37]">
            Plan Your Project
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] text-white md:text-5xl">
            Ready for your own Royalty finish?
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Share your space details and we will recommend the right resin system,
            timeline, and finish direction for your home or business.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef2b37] px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722]"
            >
              <PhoneCall size={15} />
              Call {phone}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
            >
              Request a Quote
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}

function App() {
  const phone = '270-779-9436'
  const facebookUrl = 'https://www.facebook.com/share/1CKSBtQhmn/?mibextid=wwXIfr'
  const reelShareUrl = 'https://www.facebook.com/share/r/1D1K5u1uMs/'
  const reelDirectUrl = 'https://www.facebook.com/reel/2086956575373191/'
  const timeLapseVideoUrl = '/epoxy-floor-installation-timelapse-bowling-green-ky.mp4'
  const autoSlideDelay = 6500
  const manualPauseDelay = 9000
  const normalizedPathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (normalizedPathname === '/contact') {
    return (
      <div className="min-h-screen text-white">
        <GlobalHeader facebookUrl={facebookUrl} pathname={normalizedPathname} />
        <main>
          <ContactPage phone={phone} facebookUrl={facebookUrl} />
        </main>
      </div>
    )
  }

  if (normalizedPathname === '/works') {
    return (
      <div className="min-h-screen text-white">
        <GlobalHeader facebookUrl={facebookUrl} pathname={normalizedPathname} />
        <main>
          <WorksPage phone={phone} />
        </main>
      </div>
    )
  }

  if (normalizedPathname === '/about') {
    return (
      <div className="min-h-screen text-white">
        <GlobalHeader facebookUrl={facebookUrl} pathname={normalizedPathname} />
        <main>
          <AboutPage phone={phone} facebookUrl={facebookUrl} />
        </main>
      </div>
    )
  }

  const banners = [
    {
      image: '/epoxy-flooring-hero-bowling-green-ky.png',
      title: 'Elite Resin Flooring',
      subtitle: 'Built for homes, garages, and business spaces in Kentucky.',
      position: 'center center',
    },
    {
      image: '/custom-resin-flooring-hero-bowling-green-ky.png',
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
      image: '/garage-flake-epoxy-finish-bowling-green-ky.jpg',
      tag: 'Clean. Tough. Timeless.',
    },
    {
      title: 'Metallic Resin Flow',
      image: '/metallic-epoxy-flooring-design-bowling-green-ky.jpg',
      tag: 'Art-level custom movement.',
    },
    {
      title: 'Commercial Durability',
      image: '/commercial-epoxy-flooring-bowling-green-ky.jpg',
      tag: 'Built for daily traffic.',
    },
  ]

  const faqs = [
    {
      question: 'How long does an epoxy floor installation take?',
      answer:
        'Most residential projects are completed in 1 to 3 days depending on surface condition, prep requirements, and system complexity. We provide a clear timeline before starting.',
    },
    {
      question: 'How long before I can walk or park on the floor?',
      answer:
        'Light foot traffic is typically possible within 24 hours. Vehicle traffic usually requires 48 to 72 hours, depending on temperature and the selected topcoat.',
    },
    {
      question: 'Do epoxy floors crack or peel over time?',
      answer:
        'When the concrete is prepared correctly and moisture is addressed, epoxy systems hold up extremely well. Proper prep is the key factor for long-term adhesion and durability.',
    },
    {
      question: 'Can you customize colors and design style?',
      answer:
        'Yes. We offer flake blends, metallic effects, and custom color options. During consultation, we match finish style to your space and usage goals.',
    },
    {
      question: 'Do you handle residential and commercial jobs?',
      answer:
        'Absolutely. We install systems for garages, basements, workshops, storefronts, and other commercial areas across Bowling Green and nearby cities.',
    },
  ]

  const [activeBanner, setActiveBanner] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const [playTimeLapse, setPlayTimeLapse] = useState(false)
  const resumeAutoplayTimeoutRef = useRef(null)
  const timeLapseSectionRef = useRef(null)
  const timeLapseVideoRef = useRef(null)

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

  useEffect(() => {
    if (!timeLapseSectionRef.current || playTimeLapse) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayTimeLapse(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(timeLapseSectionRef.current)

    return () => observer.disconnect()
  }, [playTimeLapse])

  useEffect(() => {
    if (!playTimeLapse || !timeLapseVideoRef.current) {
      return
    }

    const playAttempt = timeLapseVideoRef.current.play()
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {})
    }
  }, [playTimeLapse])

  return (
    <div className="min-h-screen text-white">
      <GlobalHeader facebookUrl={facebookUrl} pathname={normalizedPathname} />

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
              Built for impact. Engineered for daily wear.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              We combine expert surface preparation, premium resin systems, and
              precision finishing to deliver floors that resist stains,
              scratching, and heavy traffic while still looking high-end.
            </p>

            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#ef2b37]/70 bg-[#ef2b37] px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition hover:bg-[#c41722]"
              >
                Contact Us
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
                  src="/garage-epoxy-installation-bowling-green-ky.jpg"
                  alt="Garage epoxy flooring"
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
                  src="/epoxy-floor-edge-detail-bowling-green-ky.jpg"
                  alt="Epoxy door detail"
                  className="h-36 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </article>

              <article className="absolute -right-8 bottom-10 hidden w-32 rotate-[8deg] overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-2 backdrop-blur-sm md:block">
                <img
                  src="/metallic-epoxy-flooring-design-bowling-green-ky.jpg"
                  alt="Epoxy floor detail"
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
                className="relative overflow-visible rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1"
              >
                <svg
                  className="service-image-worm-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <rect
                    className="service-image-worm-track"
                    x="1"
                    y="1"
                    width="98"
                    height="98"
                    rx="8"
                    ry="8"
                    pathLength="100"
                  />
                  <rect
                    className="service-image-worm-glow"
                    x="1"
                    y="1"
                    width="98"
                    height="98"
                    rx="8"
                    ry="8"
                    pathLength="100"
                  />
                  <rect
                    className="service-image-worm-core"
                    x="1"
                    y="1"
                    width="98"
                    height="98"
                    rx="8"
                    ry="8"
                    pathLength="100"
                  />
                </svg>
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

          <div className="mb-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2 md:hidden">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/garage-flake-epoxy-finish-bowling-green-ky.jpg"
                alt="Professional epoxy installation process"
                className="h-56 w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <p className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-display text-[10px] uppercase tracking-[0.16em] text-white/85">
                Precision in every layer
              </p>
            </div>
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

        <section
          ref={timeLapseSectionRef}
          className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-10 md:pb-20"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-[#ef2b37]">
                Our Work
              </p>
              <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
                Real project time-lapse
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:hidden">
                Watch our crew prep, coat, and finish a real floor project with
                professional detail from start to final shine.
              </p>
              <p className="mt-4 hidden max-w-3xl text-base leading-relaxed text-white/75 md:block md:text-lg">
                Every floor begins with disciplined preparation: moisture checks,
                crack treatment, and profile grinding. That foundation is what
                allows the coating system to hold up under daily use.
              </p>
              <p className="mt-4 hidden max-w-3xl text-base leading-relaxed text-white/70 md:block md:text-lg">
                In this time-lapse you can see our process in real conditions,
                from first pass to final finish. We do not rush steps, we do not
                cut corners, and we deliver the same professional standard on
                every garage, basement, and commercial project.
              </p>

              <ul className="mt-6 hidden gap-2 text-sm uppercase tracking-[0.15em] text-white/65 md:grid md:grid-cols-2">
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">Surface Prep First</li>
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">Clean Jobsite Workflow</li>
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">Coating System Accuracy</li>
                <li className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">Consistent Finish Quality</li>
              </ul>

              <div className="mt-5">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-black/35 via-[#1a1012]/55 to-black/35 p-4 md:p-5">
                  <p className="font-display text-xs uppercase tracking-[0.16em] text-white/65 md:text-sm">
                    Want to explore more transformations?
                  </p>
                  <a
                    href="/works"
                    className="group mt-3 inline-flex items-center gap-2 rounded-full border border-[#ef2b37]/55 bg-[#ef2b37]/90 px-5 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_10px_30px_rgba(239,43,55,0.3)] transition hover:-translate-y-0.5 hover:bg-[#d8202c] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_14px_34px_rgba(239,43,55,0.38)]"
                  >
                    Explore More Projects
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-3 shadow-2xl shadow-black/35 sm:max-w-[340px] lg:mx-0 lg:w-[340px] lg:max-w-none">
              <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: '9 / 16' }}>
                <video
                  ref={timeLapseVideoRef}
                  src={timeLapseVideoUrl}
                  className="absolute inset-0 h-full w-full object-cover"
                  poster="/garage-epoxy-installation-bowling-green-ky.jpg"
                  muted
                  loop
                  controls
                  playsInline
                  autoPlay={playTimeLapse}
                  preload="metadata"
                />
              </div>

              <div className="pt-3 text-center">
                <a
                  href={reelDirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[0.16em] text-white/60 transition hover:text-white/90"
                >
                  Open Full Reel on Facebook
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:px-10 md:pb-20">
          <div className="mb-8">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-[#ef2b37]">
              Client Recommendations
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
              Real feedback from local projects
            </h2>
            <p className="mt-3 max-w-3xl text-base text-white/65 md:text-lg">
              Reviews from homeowners and business owners in Bowling Green and
              nearby areas after full installation and daily use.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-1 text-[#ef2b37]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-base leading-relaxed text-white/80">
                The crew showed up on schedule, prepped every crack correctly,
                and finished our garage in two days. Cleanup was excellent and
                the floor still looks brand new months later.
              </p>
              <p className="mt-5 font-display text-sm uppercase tracking-[0.18em] text-white/60">
                Jason M. | 2-Car Garage | Bowling Green
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-1 text-[#ef2b37]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-base leading-relaxed text-white/80">
                We needed a durable floor for our small retail backroom and they
                nailed it. They explained cure time clearly, stayed on timeline,
                and the finish handles carts and daily traffic perfectly.
              </p>
              <p className="mt-5 font-display text-sm uppercase tracking-[0.18em] text-white/60">
                Maria L. | Commercial Space | Scottsville
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex items-center gap-1 text-[#ef2b37]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-base leading-relaxed text-white/80">
                We went with a metallic design in the basement and the detail is
                unreal. They helped us choose colors, sent progress updates, and
                delivered exactly what we discussed in the consultation.
              </p>
              <p className="mt-5 font-display text-sm uppercase tracking-[0.18em] text-white/60">
                Andrew & Beth K. | Basement Epoxy | Franklin
              </p>
            </article>
          </div>
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
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
              >
                <ArrowRight size={17} />
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-6 md:px-10 md:pb-20"
        >
          <div className="mb-8">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-[#ef2b37]">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 max-w-3xl text-base text-white/65 md:text-lg">
              Quick answers to the most common questions before you start your flooring project.
            </p>
          </div>

          <div className="grid gap-3">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl uppercase tracking-[0.08em] text-white marker:content-none md:text-2xl">
                  <span>{item.question}</span>
                  <span className="text-[#ef2b37] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 pr-8 text-base leading-relaxed text-white/75">
                  {item.answer}
                </p>
              </details>
            ))}
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
