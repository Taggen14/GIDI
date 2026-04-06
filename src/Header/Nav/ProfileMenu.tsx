'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogIn, UserPlus, LogOut, UserCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { User as UserType } from '@/payload-types'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getClientSideURL } from '@/utilities/getURL'

type Props = {
  user: UserType | null
  onNavigate?: () => void
}

export const ProfileMenu: React.FC<Props> = ({ user, onNavigate }) => {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const t = useTranslations('auth')

  const handleLogout = async () => {
    setLoggingOut(true)
    await fetch(`${getClientSideURL()}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    setLoggingOut(false)
    onNavigate?.()
    router.push('/')
    router.refresh()
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex flex-col gap-0 items-center"
          variant="ghost"
          size="icon"
          aria-label="Profil"
        >
          {user ? (
            <>
              <UserCheck />
              <span className="text-xs">{user.firstName}</span>
            </>
          ) : (
            <User />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profil" onClick={onNavigate}>
                <User className="mr-2 h-4 w-4" />
                {t('myProfile')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={loggingOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {loggingOut ? t('loggingOut') : t('logout')}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/logga-in" onClick={onNavigate}>
                <LogIn className="mr-2 h-4 w-4" />
                {t('login')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/registrera" onClick={onNavigate}>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('register')}
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
