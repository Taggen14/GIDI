'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'

import type { Header as HeaderType, User } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { getClientSideURL } from '@/utilities/getURL'

export const HeaderNav: React.FC<{ data: HeaderType; user: User | null }> = ({ data, user }) => {
  const navItems = data?.navItems || []
  const router = useRouter()
const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch(`${getClientSideURL()}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    setOpen(false)
    router.push('/')
    router.refresh()
  }

  const authLinks = user ? (
    <>
      <Link href="/profil" onClick={() => setOpen(false)}>
        <Button variant="ghost" size="sm">{user.firstName}</Button>
      </Link>
      <Button variant="outline" size="sm" onClick={handleLogout} disabled={loggingOut}>
        {loggingOut ? 'Loggar ut...' : 'Logga ut'}
      </Button>
    </>
  ) : (
    <>
      <Link href="/logga-in" onClick={() => setOpen(false)}>
        <Button variant="ghost" size="sm">Logga in</Button>
      </Link>
      <Link href="/registrera" onClick={() => setOpen(false)}>
        <Button size="sm">Skapa konto</Button>
      </Link>
    </>
  )

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex gap-6 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
        <div className="flex gap-2 items-center ml-4 border-l border-border pl-4">
          {authLinks}
        </div>
      </nav>

      {/* Mobil */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Öppna meny">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col pt-12">
            <nav className="flex flex-col gap-4 flex-1">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-lg"
                />
              ))}
            </nav>
            <div className="flex flex-col gap-2 border-t border-border pt-4 pb-4">
              {authLinks}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
