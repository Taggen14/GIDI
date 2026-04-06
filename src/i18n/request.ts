import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value ?? 'sv'
  const validLocales = ['sv', 'en']
  const resolvedLocale = validLocales.includes(locale) ? locale : 'sv'

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
  }
})
