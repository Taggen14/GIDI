import { getMeUser } from '@/utilities/getMeUser'
import { ProfileForm } from './ProfileForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Min profil | GIDI',
}

export default async function ProfilePage() {
  const { user } = await getMeUser({ nullUserRedirect: '/logga-in?redirect=/profil' })

  return (
    <div className="container py-16 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Min profil</h1>
        <p className="text-muted-foreground">
          Roll:{' '}
          <span className="capitalize">
            {user.role === 'user' ? 'Användare' : user.role === 'athlete' ? 'Idrottsutövare' : 'Admin'}
          </span>
          {user.role === 'user' && (
            <span className="ml-2 text-sm">
              — fyll i idrottsprofilen nedan för att bli idrottsutövare
            </span>
          )}
        </p>
      </div>
      <ProfileForm user={user} />
    </div>
  )
}
