'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Pause, Play, Star } from 'lucide-react'
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
    const videoWrapperRef = useRef<HTMLDivElement | null>(null)
    const videoElRef = useRef<HTMLVideoElement | null>(null)
    const [fadeStart, setFadeStart] = useState(900)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const measure = () => {
            const main = mainRef.current
            const video = videoWrapperRef.current
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
        { name: 'Satisfied Client Profile', src: '/clients/client3.jpeg' },
        { name: 'Verified Partner Profile', src: '/clients/client1.jpeg' },
        { name: 'Enterprise Client Profile', src: '/clients/client4.jpeg' },
        { name: 'Business Owner Profile', src: '/clients/client2.jpeg' },
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

                            <h1 className="mx-auto mt-10 max-w-4xl text-balance font-medium text-4xl leading-[1.3] text-[#8AF7B7] md:text-6xl">
                                We&apos;re here to transform your vision into a{" "}
                                <span className="font-accent">powerful digital brand.</span>
                            </h1>
                            <p className="mx-auto mt-8 max-w-2xl text-lg text-[#E9F3E6]/80">
                                Think us as your own personal digital team. From the first line of code to your launch strategy, we&apos;ve got your back every step of the way.
                            </p>

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
                                                <Image
                                                        src={c.src}
                                                        alt={c.name}
                                                        width={36}
                                                        height={36}
                                                        priority
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
                                ref={videoWrapperRef}
                                className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/10"
                            >
                                <video
                                    ref={videoElRef}
                                    className="aspect-[16/9] w-full"
                                    src="https://px5rxm1szlmbgpc7.public.blob.vercel-storage.com/assets/home/Quzex%20Intro_gwr_video_mvp.mp4"
                                    loop
                                    playsInline
                                    preload="metadata"
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                />

                                {/* Centered play / pause overlay */}
                                <button
                                    type="button"
                                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                    onClick={() => {
                                        const vid = videoElRef.current
                                        if (!vid) return
                                        if (vid.paused) {
                                            vid.play()
                                        } else {
                                            vid.pause()
                                        }
                                    }}
                                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                                >
                                    <span
                                        className={`flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-110 ${
                                            isPlaying ? 'size-14 opacity-0 hover:opacity-100' : 'size-18 opacity-100'
                                        }`}
                                    >
                                        {isPlaying ? (
                                            <Pause className="size-6 fill-white text-white" />
                                        ) : (
                                            <Play className="size-7 fill-white text-white translate-x-0.5" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </AnimatedGroup>
                </div>
            </section>
        </main> 
    )
}