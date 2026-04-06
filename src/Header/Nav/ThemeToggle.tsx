'use client'

import React, { useState, useEffect } from 'react'
import { Sun, Moon, SunMoon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/providers/Theme'
import { themeLocalStorageKey } from '@/providers/Theme/ThemeSelector/types'

export const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme()
  const [themeValue, setThemeValue] = useState<'auto' | 'light' | 'dark'>('auto')

  useEffect(() => {
    const stored = window.localStorage.getItem(themeLocalStorageKey)
    setThemeValue((stored as 'light' | 'dark') ?? 'auto')
  }, [])

  const handleChange = (value: 'auto' | 'light' | 'dark') => {
    setThemeValue(value)
    setTheme(value === 'auto' ? null : value)
  }

  const icon = themeValue === 'light' ? <Sun /> : themeValue === 'dark' ? <Moon /> : <SunMoon />

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Välj tema">
          {icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange('light')}>
          <Sun className="mr-2 h-4 w-4" /> Ljust
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('dark')}>
          <Moon className="mr-2 h-4 w-4" /> Mörkt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('auto')}>
          <SunMoon className="mr-2 h-4 w-4" /> Auto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
