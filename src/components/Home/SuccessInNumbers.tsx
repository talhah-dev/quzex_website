'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type StatItem = {
    value: string
    label: string
    href?: string
    linkText?: string
}

export default function SuccessInNumbers() {
    const stats: StatItem[] = [
        {
            value: '300+',
            label: 'Projects completed across websites, apps, and custom digital solutions.',
        },
        {
            value: '120+',
            label: 'Happy clients served with a focus on long-term trust and satisfaction.',
        },
        {
            value: '100%',
            label: 'Clean code, clear communication, reliable delivery.',
            href: '/portfolio',
            linkText: 'View selected work',
        },
        {
            value: '99%',
            label: 'Projects delivered on time with transparent updates at every step.',
            href: '/contact',
            linkText: 'Get a quote',
        },
    ]

    return (
        <section className="bg-[#0A211F] text-[#E9F3E6]">
            <div className="mx-auto max-w-7xl px-6 py-10 pb-20 md:py-28">
                <div className="text-center">
                    <p className="text-sm tracking-[0.28em] uppercase text-[#E9F3E6]">
                        Success in numbers
                    </p>

                    <h2 className="mt-6 text-balance text-4xl leading-tight text-[#E9F3E6] md:text-6xl">
                        The best return on{' '}
                        <span className="font-accent">your investment</span>
                    </h2>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-y-12 pt-12 md:mt-20 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
                    {stats.map((s) => (
                        <div key={s.value} className="flex flex-col gap-6">
                            <div className="flex items-end justify-between gap-8">
                                <div className="max-w-xs text-sm leading-relaxed text-[#E9F3E6] md:text-base">
                                    {s.label}
                                </div>
                                <div className="text-5xl lg:text-7xl text-nowrap tracking-tight text-[#E9F3E6] md:text-5xl">
                                    {s.value}
                                </div>
                            </div>

                            <div className="h-px w-full bg-white/10" />

                            {s.href && s.linkText ? (
                                <Link
                                    href={s.href}
                                    className="group inline-flex w-fit items-center gap-2 text-sm text-[#E9F3E6]/80 hover:text-[#E9F3E6]"
                                >
                                    <span>{s.linkText}</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            ) : (
                                <div className="h-6" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
