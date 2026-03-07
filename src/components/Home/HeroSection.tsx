'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '../ui/animated-group'
import { TextEffect } from '../ui/text-effect'
import { AnimatedButton } from '../ui/AnimatedButton'

const transitionVariants: { item: Variants } = {
    item: {
        hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
        },
    },
}

export default function HeroSection() {
    const mainRef = useRef<HTMLElement | null>(null)
    const videoRef = useRef<HTMLDivElement | null>(null)
    const [fadeStart, setFadeStart] = useState(900)

    useEffect(() => {
        const measure = () => {
            const main = mainRef.current
            const video = videoRef.current
            if (!main || !video) return
            const mainRect = main.getBoundingClientRect()
            const videoRect = video.getBoundingClientRect()
            const start = videoRect.top - mainRect.top + videoRect.height / 2
            setFadeStart(Math.max(0, Math.round(start)))
        }

        const raf = requestAnimationFrame(measure)
        const t = window.setTimeout(measure, 250)
        window.addEventListener('resize', measure)

        return () => {
            cancelAnimationFrame(raf)
            clearTimeout(t)
            window.removeEventListener('resize', measure)
        }
    }, [])

    const clientLogos = [
        { name: 'Nvidia', src: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'GitHub', src: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Nike', src: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'OpenAI', src: 'https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ]

    return (
        <main ref={mainRef} className="relative overflow-hidden text-[#E9F3E6]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 -z-20 overflow-hidden"
                style={{ height: fadeStart }}
            >
                <div className="absolute inset-0 bg-[#0A211F]" />
                <div className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(138,247,183,.14)_0,rgba(94,163,131,.06)_50%,rgba(10,33,31,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(216,247,130,.10)_0,rgba(94,163,131,.06)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(138,247,183,.08)_0,rgba(94,163,131,.05)_80%,transparent_100%)]" />
                </div>
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 flex flex-col"
                style={{ top: fadeStart }}
            >
                <div className="flex-1 bg-[#0A211F]" />
                <div className="flex-1 bg-[#f7f9f2]" />
            </div>

            <section>
                <div className="relative pt-32 md:pt-36">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center w-full sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                <Link
                                    href="/portfolio"
                                    className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pl-4 shadow-md shadow-black/20 backdrop-blur py-1 md:py-0 transition-colors duration-300 hover:bg-white/8"
                                >

                                    We delivers quality.<span className="italic md:inline hidden text-[#8AF7B7]">Built to perform.</span>
                                    <span className="md:inline hidden">Explore work</span>

                                    <span className="block h-4 w-0.5 bg-white/20" />
                                    <div className="shrink-0  w-6 h-6 flex items-center justify-center overflow-hidden rounded-full bg-[#D8F782]">
                                        <ArrowRight className="m-auto size-3 text-[#0A211F]" />
                                    </div>
                                </Link>
                            </AnimatedGroup>

                            <h1 className="mx-auto mt-10 max-w-4xl text-balance font-medium text-4xl leading-[1.15] text-[#8AF7B7] md:text-7xl">
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="span"
                                    className="inline"
                                >
                                    Building a better web, Together
                                </TextEffect>

                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.08}
                                    as="span"
                                    className="inline font-accent"
                                >
                                    &nbsp;fast and secure
                                </TextEffect>
                            </h1>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.45}
                                as="p"
                                className="mx-auto mt-8 max-w-2xl text-lg text-[#E9F3E6]/80"
                            >
                                We help you build beautiful, accessible, fast, and secure websites that work
                                cross-browser—and for all of your users.
                            </TextEffect>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-center justify-center gap-6 md:flex-row"
                            >
                                <AnimatedButton href="/portfolio" color="light">
                                    View portfolio
                                </AnimatedButton>

                                <div className="flex items-center gap-4">
                                    <ul className="flex items-center">
                                        {clientLogos.slice(0, 5).map((c) => (
                                            <li key={c.name} className="-mr-2">
                                                <div className="flex h-9 w-9 overflow-hidden items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur">
                                                    <img
                                                        src={c.src}
                                                        alt={c.name}
                                                        width={18}
                                                        height={18}
                                                        className="opacity-90 w-full h-full object-cover"
                                                    />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-col items-start gap-1">
                                        <div className="flex items-center gap-1 text-[#D8F782]">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                        <p className="text-xs sm:text-sm text-[#E9F3E6]/70">
                                            Trusted by clients & teams
                                        </p>
                                    </div>
                                </div>
                            </AnimatedGroup>
                        </div>
                    </div>

                    <AnimatedGroup
                        variants={{
                            container: {
                                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.9 } },
                            },
                            ...transitionVariants,
                        }}
                    >
                        <div className="relative mt-12 overflow-hidden px-6 md:mt-16">
                            <div
                                ref={videoRef}
                                className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10"
                            >
                                <video
                                    className="relative aspect-[16/9] w-full overflow-hidden"
                                    src="https://www.pexels.com/download/video/6192775/"
                                    autoPlay
                                    poster="https://res.cloudinary.com/dpkp4hymz/image/upload/v1770115231/Screenshot_2026-02-03_154010_jm7cos.png"
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                />
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>
        </main>
    )
}