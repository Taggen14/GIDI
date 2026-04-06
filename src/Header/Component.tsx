import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMeUser } from '@/utilities/getMeUser'
import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const { user } = await getMeUser().catch(() => ({ user: null, token: null }))

  return (
    <div className="relative">
      <div className="border-b border-border">
        <HeaderClient data={headerData} user={user} />
      </div>
    </div>
  )
}
