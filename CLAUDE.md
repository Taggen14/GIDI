# GIDI – Gemenskap i det Individuella

Webbapp för individuella träningssporter (löpning, cykling, simning) med social dimension.
Solo-utvecklarprojekt. Svenska användare. Målgrupp: amatöridrottare.

---

# Motivera ALLTID edits eller terminal commando inna du fråga mig "yes" eller "no"

## Tech stack

| Del            | Teknologi                   | Notering                             |
| -------------- | --------------------------- | ------------------------------------ |
| Frontend       | Next.js 15, App Router      | SSR/SSG, Server Components           |
| Backend/CMS    | Payload CMS v3              | Körs inuti Next.js, TypeScript-first |
| Databas        | PostgreSQL                  | Via Railway lokalt och i produktion  |
| Auth           | Payload inbyggd auth        | Email/lösenord nu → BankID senare    |
| Betalning      | Klarna Payments API         | Swish ingår, ingen månadsavgift      |
| Realtid/GPS    | Ably                        | WebSockets, live GPS under event     |
| Kartor         | Mapbox GL JS                | react-map-gl, GeoJSON för rutter     |
| Hosting        | Vercel (app) + Railway (DB) |                                      |
| Pakethanterare | pnpm                        | Använd alltid pnpm, aldrig npm/yarn  |
| Språk          | TypeScript                  | Strikt, inga any-typer               |

---

## Projektstruktur

```
src/
├── app/
│   ├── (frontend)/        # Alla användarsidor
│   │   ├── page.tsx       # Startsida
│   │   ├── events/        # Event-sidor
│   │   ├── calendar/      # Träningskalender
│   │   └── profile/       # Profilsida
│   └── (payload)/         # Payload admin-panel
├── collections/           # Payload collections
│   ├── Users.ts
│   ├── Events.ts
│   ├── Registrations.ts
│   ├── TrainingSessions.ts
│   └── Media.ts
├── globals/               # Payload globals
├── components/            # Delade React-komponenter
└── lib/                   # Hjälpfunktioner, API-anrop
```

---

## Collections (datamodell)

### Users

Fält: email, password, firstName, lastName, personnummer (platshållare för BankID),
phone, address, role (user | admin), profileImage, createdAt

### Events (triathlon)

Fält: title, description, date, location (koordinater + adress), maxParticipants,
startFee, status (draft | published | completed), route (GeoJSON), segments (swim/bike/run)

### Registrations

Fält: user (rel → Users), event (rel → Events), status (pending | paid | cancelled),
klarnaOrderId, paidAt, bibNumber, createdAt

### TrainingSessions (träningskalender)

Fält: user (rel → Users), activityType (running | cycling | swimming),
date, time, startLocation (koordinater + adress), description,
isPublic (bool), participants (rel → Users[])

### Media

Standard Payload media collection med bildoptimering.

---

## Auth & säkerhet

- Payload inbyggd JWT-auth med HTTP-only cookies
- Alla routes under /calendar, /profile, /events/register kräver inloggning
- Middleware i src/access/ skyddar dessa routes
- TrainingSession startplats/tid visas ALDRIG för ej inloggade användare
- BankID-integration planeras i fas 2 – personnummer-fält redan på Users nu
- Admin-roll krävs för att skapa/redigera Events

---

## GPS & realtid

- Ably hanterar live GPS under event – INTE Payload
- Payload hanterar bara auth (vem får skicka position)
- Mobilens Geolocation API → Ably kanal → Mapbox karta
- GPS-historik (GpsTrack) sparas i PostgreSQL för replay-funktionalitet
- En Ably-kanal per event: `event:{eventId}:gps`

---

## Kodriktlinjer

- **TypeScript**: Alltid explicita typer, inga `any`. Använd Payload genererade typer.
- **Namngivning**: camelCase för variabler/funktioner, PascalCase för komponenter/typer
- **Komponenter**: Server Components som default, Client Components endast när nödvändigt (state, events, Mapbox)
- **API-anrop**: Använd Payload Local API i Server Components, REST API från Client Components
- **Fel**: Alltid try/catch på async operationer, returnera meningsfulla felmeddelanden
- **Env-variabler**: Aldrig hårdkoda nycklar. Alla hemligheter i .env.local
- **Kommentarer**: Svenska kommentarer är OK, engelska i kod

---

## Roadmap & nuvarande fas

### ✅ Fas 1 – Grund & infrastruktur (klar)

- Next.js + Payload CMS uppsatt
- PostgreSQL via Railway
- Vercel + Railway hosting konfigurerat

### 🔄 Fas 2 – Användare & auth (pågår)

- [ ] Radera onödig kod från payloads website template (post, category, ev något mer)
- [ ] Users collection med alla fält
- [ ] Registrering & inloggning
- [ ] Skyddade routes
- [ ] Profilsida

### ⏳ Fas 3 – Träningskalender

- [ ] TrainingSession collection
- [ ] Kalender-UI (7 dagar)
- [ ] Mapbox för startplatser
- [ ] Häng-på funktionalitet

### ⏳ Fas 4 – Event & betalning

- [ ] Event & Registration collections
- [ ] Event-sidor & anmälningsflöde
- [ ] Klarna-integration

### ⏳ Fas 5 – Live GPS-tracking

- [ ] Ably realtidskanal
- [ ] GPS-sändare via PWA
- [ ] Live-karta för åskådare

---

## Viktiga beslut & bakgrund

- **Payload vs Clerk**: Payload inbyggd auth räcker, Clerk behövs inte
- **PostgreSQL vs MongoDB**: PostgreSQL valdes – relationell data, GPS-replay via tabell
- **Ably vs Supabase Realtime**: Ably valdes – dedikerad realtid, enklare setup
- **Mapbox vs Google Maps**: Mapbox valdes – bättre rörliga markörer, PWA-stöd, gratis tier
- **Vercel + Railway vs svensk VPS**: Vercel + Railway under utveckling, flytta DB till GleSYS vid produktion om GDPR kräver det
- **Klarna vs Swish direkt**: Klarna valdes – ingen månadsavgift, Swish ingår automatiskt
- **BankID**: Implementeras i fas 2 efter bolagsregistrering. Auth-logiken är byggd för att göra bytet enkelt – byt bara login-steget, resten av appen rörs inte

---

## Windows-specifikt (utvecklingsmiljö)

- Node.js v20 (v24 stöds ej av Payload ännu)
- Kör i Git Bash eller WSL2 – undvik PowerShell för pnpm-kommandon
- SCSS-sökvägar kan krångla på Windows – använd alltid forward slash i imports
