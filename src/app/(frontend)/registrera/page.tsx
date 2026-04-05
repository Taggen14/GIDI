import { getMeUser } from '@/utilities/getMeUser'
import { RegisterForm } from './RegisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skapa konto | GIDI',
  description: 'Skapa ett konto för att börja träna och tävla med GIDI.',
}

export default async function RegisterPage() {
  await getMeUser({ validUserRedirect: '/' })

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Skapa konto</h1>
          <p className="text-muted-foreground">
            Redan medlem?{' '}
            <a href="/logga-in" className="underline hover:text-foreground">
              Logga in
            </a>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
