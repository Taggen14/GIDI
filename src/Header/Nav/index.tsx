'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type { Header as HeaderType, User as UserType } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { LanguagePicker } from './LanguagePicker'
import { ProfileMenu } from './ProfileMenu'

const NAV_LINKS = [
  { href: '/event', key: 'events' },
  { href: '/kalender', key: 'calendar' },
  { href: '/om-oss', key: 'about' },
  { href: '/kontakt', key: 'contact' },
] as const

export const HeaderNav: React.FC<{ data: HeaderType; user: UserType | null }> = ({ user }) => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <>
      {/* Desktop — länkar centrerade, kontroller till höger */}
      <nav className="hidden md:flex flex-1 justify-center gap-6 items-center">
        {NAV_LINKS.map(({ href, key }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
              pathname === href ? 'text-foreground' : 'text-foreground/60'
            }`}
          >
            {t(key)}
          </Link>
        ))}
      </nav>
      <div className="hidden md:flex gap-1 items-center border-l border-border pl-4">
        <ThemeToggle />
        <LanguagePicker />
        <ProfileMenu user={user} />
      </div>

      {/* Mobil */}
      <div className="md:hidden flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <LanguagePicker />
        <ProfileMenu user={user} />
        <Button
          className="flex flex-col gap-0"
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X />
          ) : (
            <>
              <Menu />
              <span className="text-xs">Meny</span>
            </>
          )}
        </Button>
      </div>

      {/* Mobilmeny — glider ned under headern */}
      {menuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full border-b border-t border-border bg-card z-50 shadow-md">
          <div className="fixed inset-0 -z-10" onClick={() => setMenuOpen(false)} />
          <nav className="container flex flex-col py-2">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-end w-full text-base border-b border-border last:border-0 ${
                  pathname === href ? 'font-medium' : ''
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
