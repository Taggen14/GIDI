'use client'

import React from 'react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const LANGUAGES = [
  { code: 'sv', label: 'Svenska', flag: '/flags/sv.svg' },
  { code: 'en', label: 'English', flag: '/flags/en.svg' },
]

export const LanguagePicker: React.FC = () => {
  const locale = useLocale()
  const router = useRouter()
  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  const handleChange = (code: string) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Välj språk">
          <Image
            src={current.flag}
            alt={current.label}
            width={24}
            height={24}
            className="rounded-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => handleChange(l.code)}
            className={locale === l.code ? 'font-medium' : ''}
          >
            <Image src={l.flag} alt={l.label} width={20} height={20} className="mr-2 rounded-sm" />
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
