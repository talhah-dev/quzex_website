'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site'

const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Work', href: '/work' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!open) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [open])

    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : ''
        return () => {
            document.documentElement.style.overflow = ''
        }
    }, [open])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-5">
            <div className={`mx-auto transition-all duration-300 ${scrolled ? 'max-w-6xl' : 'max-w-7xl'}`}>
                <div
                    className={`rounded-2xl transition-all duration-300 ${scrolled
                        ? 'bg-[#0A211F]/65 backdrop-blur border border-white/10 shadow-[0_20px_60px_-40px_rgba(0,0,0,.8)]'
                        : 'bg-transparent border border-transparent'
                        }`}
                >
                    <div
                        className={`flex items-center justify-between gap-3 transition-all duration-300 ${scrolled ? 'px-4 py-3 md:px-5' : 'px-3 py-3.5 md:px-4'
                            }`}
                    >
                        <Link href="/" className="flex text-white font-medium italic text-3xl items-center gap-2">
                            {SITE_CONFIG.name}
                        </Link>

                        <nav className="hidden md:flex items-center gap-7">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="text-sm text-[#E9F3E6] hover:text-[#fff] transition-colors"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex h-11 items-center rounded-full bg-[#D8F782] px-5 text-sm font-medium text-[#0A211F] transition-colors hover:bg-[#CFF06F]"
                            >
                                Get a quote
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-[#E9F3E6] backdrop-blur transition-colors hover:bg-white/10"
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                aria-hidden={!open}
            >
                <button
                    type="button"
                    aria-label="Close menu overlay"
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 bg-black/55"
                />

                <div
                    className={`absolute left-0 right-0 top-0 origin-top transition-transform duration-300 ${open ? 'scale-y-100' : 'scale-y-95'
                        }`}
                >
                    <div className="mx-auto max-w-7xl px-4 pt-5">
                        <div className="rounded-3xl bg-[#D8F782] text-[#0A211F] shadow-[0_30px_80px_-50px_rgba(0,0,0,.85)]">
                            <div className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-9 w-9 rounded-xl bg-[#0A211F] text-[#E9F3E6] grid place-items-center font-semibold">
                                        {SITE_CONFIG.name.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="font-semibold tracking-tight">{SITE_CONFIG.name}</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black/10 hover:bg-black/15 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="px-4 pb-5">
                                <nav className="mt-2 flex flex-col">
                                    {links.map((l) => (
                                        <Link
                                            key={l.href}
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            className="rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-black/10"
                                        >
                                            {l.label}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-4">
                                    <Link
                                        href="/contact"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#0A211F] px-5 text-sm font-medium text-[#E9F3E6] transition-colors hover:bg-[#0F2D2A]"
                                    >
                                        Get a quote
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="h-4" />
                    </div>
                </div>
            </div>
        </header>
    )
}
