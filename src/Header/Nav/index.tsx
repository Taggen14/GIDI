'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import type { Header as HeaderType, User } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'

export const HeaderNav: React.FC<{ data: HeaderType; user: User | null }> = ({ data, user }) => {
  const navItems = data?.navItems || []
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch(`${getClientSideURL()}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="link" />
      ))}

      {user ? (
        <>
          <Link href="/profil">
            <Button variant="ghost" size="sm">
              {user.firstName}
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Loggar ut...' : 'Logga ut'}
          </Button>
        </>
      ) : (
        <>
          <Link href="/logga-in">
            <Button variant="ghost" size="sm">Logga in</Button>
          </Link>
          <Link href="/registrera">
            <Button size="sm">Skapa konto</Button>
          </Link>
        </>
      )}
    </nav>
  )
}
