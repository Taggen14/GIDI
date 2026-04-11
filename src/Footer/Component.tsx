import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { Mail } from 'lucide-react'

import type { Footer } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-4 flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <Button asChild variant="nav" size="xl">
          <a href="mailto:gidi@info.se">
            <Mail />
            gidi@info.se
          </a>
        </Button>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 flex justify-center items-center">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} GIDI – Gemenskap i det Individuella. Alla rättigheter
            förbehållna.
          </p>
        </div>
      </div>
    </footer>
  )
}
