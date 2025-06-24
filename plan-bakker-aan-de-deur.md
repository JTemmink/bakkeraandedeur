# Bakker aan de Deur - Website Plan

## Doel
Een aantrekkelijke landingspagina om animo te peilen voor een brood bezorgdienst.

## Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **Database**: Supabase
- **Styling**: Tailwind CSS + shadcn/ui componenten
- **Formulier**: React Hook Form + Zod validatie

## Database Schema (Supabase)
### Tabel: interesse_formulieren
- id (uuid, primary key)
- naam (text, required)
- adres (text, required)
- email (text, required)
- telefoon (text, optional)
- brood_selectie (jsonb) - array van {brood_type, aantal}
- bezorg_tijd (text)
- bezorg_dagen (text[]) - bijv. ['dinsdag', 'vrijdag']
- opmerkingen (text, optional)
- created_at (timestamp)

## Pagina Structuur
1. **Hero sectie**: 
   - Aantrekkelijke header met bakkerij thema
   - Korte uitleg over de service
   
2. **Interesse formulier**:
   - Persoonlijke gegevens sectie
   - Brood selectie met visuele kaarten
   - Bezorg voorkeuren
   - Opmerkingen veld
   
3. **Footer**: 
   - Contact informatie
   - Privacy vermelding

## Design Keuzes
- Warme kleuren (bruin, goud, crème)
- Moderne maar huiselijke uitstraling
- Responsive design
- Toegankelijk (WCAG compliant)

## Brood Opties
- Wit brood
- Bruin brood
- Volkoren brood
- Speltbrood
- Roggebrood
- Meergranen brood
- Tijgerbrood
- Stokbrood
- Croissants
- Krentenbollen

## Features
- Real-time validatie
- Succesmelding na verzenden
- Foutafhandeling
- Loading states
- Responsive design 