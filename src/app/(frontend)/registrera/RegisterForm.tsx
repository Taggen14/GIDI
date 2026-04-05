'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getClientSideURL } from '@/utilities/getURL'

type FormState = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm: React.FC = () => {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Lösenorden matchar inte.')
      return
    }

    if (form.password.length < 8) {
      setError('Lösenordet måste vara minst 8 tecken.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${getClientSideURL()}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const message = data?.errors?.[0]?.message ?? data?.message ?? 'Något gick fel.'
        setError(message)
        return
      }

      // Logga in direkt efter registrering
      const loginRes = await fetch(`${getClientSideURL()}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      if (loginRes.ok) {
        router.push('/')
        router.refresh()
      } else {
        router.push('/logga-in')
      }
    } catch {
      setError('Kunde inte ansluta till servern. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Förnamn</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Efternamn</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-post</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Lösenord</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Bekräfta lösenord</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Skapar konto...' : 'Skapa konto'}
      </Button>
    </form>
  )
}
