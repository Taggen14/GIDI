import { getMeUser } from '@/utilities/getMeUser'
import { LoginForm } from './LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logga in | GIDI',
  description: 'Logga in på ditt GIDI-konto.',
}

export default async function LoginPage() {
  await getMeUser({ validUserRedirect: '/' })

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Logga in</h1>
          <p className="text-muted-foreground">
            Inget konto?{' '}
            <a href="/registrera" className="underline hover:text-foreground">
              Skapa konto
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
