'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getClientSideURL } from '@/utilities/getURL'

type Props = { user: User }

export const ProfileForm: React.FC<Props> = ({ user }) => {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    phone: user.phone ?? '',
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
    gender: user.gender ?? '',
    nationality: user.nationality ?? '',
    club: user.club ?? '',
    emergencyContact: user.emergencyContact ?? '',
    emergencyPhone: user.emergencyPhone ?? '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const res = await fetch(`${getClientSideURL()}/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone || null,
          dateOfBirth: form.dateOfBirth || null,
          gender: form.gender || null,
          nationality: form.nationality || null,
          club: form.club || null,
          emergencyContact: form.emergencyContact || null,
          emergencyPhone: form.emergencyPhone || null,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message ?? 'Något gick fel.')
        return
      }

      setSuccess(true)
      router.refresh()
    } catch {
      setError('Kunde inte ansluta till servern.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Konto */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border pb-2">Konto</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Förnamn</Label>
            <Input id="firstName" name="firstName" required value={form.firstName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Efternamn</Label>
            <Input id="lastName" name="lastName" required value={form.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        </div>
      </section>

      {/* Idrottsprofil */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold border-b border-border pb-2">Idrottsprofil</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fyll i nedan för att kunna anmäla dig till event. Rollen uppgraderas automatiskt till
            idrottsutövare när datum, kön och nationalitet är ifyllda.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Födelsedatum</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Kön</Label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
            >
              <option value="">Välj...</option>
              <option value="male">Man</option>
              <option value="female">Kvinna</option>
              <option value="other">Annat</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationalitet</Label>
          <Input id="nationality" name="nationality" placeholder="T.ex. Sverige" value={form.nationality} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="club">Klubb / förening</Label>
          <Input id="club" name="club" placeholder="Frivilligt" value={form.club} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Anhörigs namn</Label>
            <Input id="emergencyContact" name="emergencyContact" value={form.emergencyContact} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Anhörigs telefon</Label>
            <Input id="emergencyPhone" name="emergencyPhone" type="tel" value={form.emergencyPhone} onChange={handleChange} />
          </div>
        </div>
      </section>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-green-600">Profilen sparades!</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Sparar...' : 'Spara ändringar'}
      </Button>
    </form>
  )
}
