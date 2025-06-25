'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2, CheckCircle, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { frequentieOpties, straatOpties, bezorgTijden } from "@/data/broden"
// import { supabase } from "@/lib/supabase"

type FormData = {
  bezorgTijd?: string
  frequentie?: string
  aantalHeleBroden?: number
  aantalHalveBroden?: number
  aantalOverige?: number
  straat?: string
  huisnummer?: string
  opmerkingen?: string
  email?: string
  telefoonnummer?: string
}

const StokbroodButton = ({ onClick, children, variant = 'large', disabled = false }: { onClick: () => void; children: React.ReactNode; variant?: 'small' | 'large'; disabled?: boolean }) => {
  const isSmall = variant === 'small';
  // Altijd 6 lijnen, diagonaal, gelijkmatig verdeeld
  const baguetteLines = [8, 24, 40, 56, 72, 88]; // percentages van de breedte
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full ${isSmall ? 'h-10' : 'h-16'} border-2 border-amber-800/80 rounded-full bg-[#f2d5a3] hover:bg-[#eac88a] transition-all duration-200 flex items-center justify-center group shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
      style={{
        boxShadow: '0 4px 6px -1px rgba(101, 59, 12, 0.2), 0 2px 4px -1px rgba(101, 59, 12, 0.15), inset 0 -4px 5px rgba(101, 59, 12, 0.3)'
      }}
    >
      {/* Diagonal lines to simulate baguette scores */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full pointer-events-none">
        {baguetteLines.map((left, i) => (
          <div
            key={i}
            className={`absolute ${isSmall ? 'w-1 h-8' : 'w-2 h-24'} bg-amber-900/20 transform -rotate-45`}
            style={{ left: `${left}%`, top: isSmall ? '-0.5rem' : '-1rem' }}
          />
        ))}
      </div>
      <span className={`relative z-10 font-bold ${isSmall ? 'text-base' : 'text-xl'} text-stone-800 group-hover:text-stone-900 transition-colors`} style={{ textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }}>
        {children}
      </span>
    </button>
  );
};

export default function Home() {
  const [step, setStep] = useState(0) // 0: Landing, 1: Tijd, 2: Frequentie, 3: Brood, 4: Straat, 5: Huisnummer, 6: Contactgegevens, 7: Succes
  const [formData, setFormData] = useState<FormData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State voor de stappen
  const [aantalHeleBroden, setAantalHeleBroden] = useState(0)
  const [aantalHalveBroden, setAantalHalveBroden] = useState(0)
  const [aantalOverige, setAantalOverige] = useState(0)
  const [huisnummer, setHuisnummer] = useState('')
  const [opmerkingen, setOpmerkingen] = useState('')
  const [email, setEmail] = useState('')
  const [telefoonnummer, setTelefoonnummer] = useState('')

  const handleNextStep = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    setStep(prev => prev + 1)
  }
  
  const renderStep = () => {
    switch (step) {
      case 0: // Landing
        return (
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)'}}>Interesse in brood aan de deur?</h1>
            <p className="text-xl text-stone-700 mb-8">Laat het ons weten!</p>
            <div className="flex justify-center gap-4 flex-row items-center">
              <button onClick={() => setStep(1)} className="transition-transform hover:scale-105">
                <Image src="/croissant%20ja.png" alt="Ja" width={200} height={200} />
              </button>
              <button onClick={() => window.location.href='https://www.google.com'} className="transition-transform hover:scale-105">
                <Image src="/croissant%20nee.png" alt="Nee" width={200} height={200} />
              </button>
            </div>
          </div>
        )
      
      case 1: // Bedankt & Tijd
        return (
          <Card className="w-full max-w-lg" style={{ backgroundColor: '#f4ead6' }}>
            <CardHeader>
              <CardTitle>Leuk! Wanneer komt het u uit?</CardTitle>
              <CardDescription>
                Geef aan hoe laat we het brood uiterlijk moeten bezorgen voor een vers ontbijt.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {bezorgTijden.map((tijd) => (
                <StokbroodButton key={tijd} onClick={() => handleNextStep({ bezorgTijd: tijd })} variant="small">
                  <span className="text-base font-semibold">{tijd}</span>
                </StokbroodButton>
              ))}
            </CardContent>
          </Card>
        )

      case 2: // Frequentie
        return (
          <Card className="w-full max-w-lg" style={{ backgroundColor: '#f4ead6' }}>
            <CardHeader>
              <CardTitle>Hoe vaak zou u willen bestellen?</CardTitle>
              <CardDescription>
                In het begin bezorgen we maximaal 2 keer per week. Dit helpt ons een inschatting te maken.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {frequentieOpties.map(optie => (
                <StokbroodButton key={optie} onClick={() => handleNextStep({ frequentie: optie })} variant="large">
                  {optie}
                </StokbroodButton>
              ))}
            </CardContent>
          </Card>
        )
        
      case 3: // Broodkeuze
        return (
          <Card className="w-full max-w-lg" style={{ backgroundColor: '#f4ead6' }}>
            <CardHeader>
              <CardTitle>Waar heeft u interesse in?</CardTitle>
              <CardDescription>
                Geef een schatting van het aantal producten dat u per keer verwacht te bestellen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Teller voor Hele Broden */}
              <div className="flex items-center justify-between">
                <Label htmlFor="aantal-hele-broden" className="text-lg">Aantal hele broden</Label>
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setAantalHeleBroden(prev => Math.max(0, prev - 1))} disabled={aantalHeleBroden === 0}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{aantalHeleBroden}</span>
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setAantalHeleBroden(prev => prev + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Teller voor Halve Broden */}
              <div className="flex items-center justify-between">
                <Label htmlFor="aantal-broden" className="text-lg">Aantal halve broden</Label>
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setAantalHalveBroden(prev => Math.max(0, prev - 1))} disabled={aantalHalveBroden === 0}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{aantalHalveBroden}</span>
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setAantalHalveBroden(prev => prev + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Teller voor Overige Producten */}
              <div className="flex items-center justify-between">
                <Label htmlFor="aantal-overige" className="text-lg">Overige (krentenbollen, etc.)</Label>
                <div className="flex items-center justify-center gap-2">
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setAantalOverige(prev => Math.max(0, prev - 1))} disabled={aantalOverige === 0}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{aantalOverige}</span>
                  <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setAantalOverige(prev => prev + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <StokbroodButton onClick={() => handleNextStep({ aantalHeleBroden, aantalHalveBroden, aantalOverige })} variant="large">
                Volgende
              </StokbroodButton>
            </CardContent>
          </Card>
        )

      case 4: // Straatkeuze
        return (
          <Card className="w-full max-w-lg" style={{ backgroundColor: '#f4ead6' }}>
            <CardHeader>
              <CardTitle>In welke straat woont u?</CardTitle>
              <CardDescription>
                Selecteer uw straat. We bezorgen alleen in deze vier straten.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 pt-2">
              {straatOpties.map((straat) => (
                <StokbroodButton key={straat.value} onClick={() => handleNextStep({ straat: straat.value })}>
                  {straat.label}
                </StokbroodButton>
              ))}
            </CardContent>
          </Card>
        );

      case 5: // Huisnummer
        const handleHuisnummerSubmit = () => {
          if (huisnummer) {
            handleNextStep({ huisnummer });
          }
        };
        return (
          <Card className="w-full max-w-lg" style={{ backgroundColor: '#f4ead6' }}>
            <CardHeader>
              <CardTitle>Wat is uw huisnummer?</CardTitle>
              <CardDescription>
                Vul hieronder uw huisnummer en eventuele toevoeging in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="huisnummer" className="text-lg">Huisnummer</Label>
                <Input
                  id="huisnummer"
                  placeholder="bv. 12a"
                  value={huisnummer}
                  onChange={(e) => setHuisnummer(e.target.value)}
                  className="text-base"
                />
              </div>
              <StokbroodButton onClick={handleHuisnummerSubmit} disabled={!huisnummer} variant="large">
                Volgende
              </StokbroodButton>
            </CardContent>
          </Card>
        )

      case 6: // Contactgegevens
        const handleFinalSubmit = async () => {
          setIsSubmitting(true)
          const finalData = { ...formData, huisnummer, email, telefoonnummer, opmerkingen }
          console.log("Submitting:", finalData)

          // Tijdelijk uitgeschakeld voor testen
          // const { error } = await supabase.from('interesse').insert([finalData])
          const error = null // Simuleer succes

          await new Promise(resolve => setTimeout(resolve, 1500)) // Simuleer netwerkvertraging

          if (error) {
            console.error("Fout bij opslaan:", error)
            alert("Er is iets misgegaan. Probeer het opnieuw.")
            setIsSubmitting(false)
          } else {
            console.log("Succesvol opgeslagen")
            setStep(prev => prev + 1)
          }
        }
        return (
          <Card className="w-full max-w-lg" style={{ backgroundColor: '#f4ead6' }}>
            <CardHeader>
              <CardTitle>Contactgegevens</CardTitle>
              <CardDescription>
                Vul hieronder je e-mailadres, telefoonnummer en eventuele opmerkingen in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg">E-mailadres</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jouw@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefoonnummer" className="text-lg">Telefoonnummer (optioneel)</Label>
                <Input
                  id="telefoonnummer"
                  placeholder="0612345678"
                  value={telefoonnummer}
                  onChange={(e) => setTelefoonnummer(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opmerkingen" className="text-lg">Nog opmerkingen?</Label>
                <Input
                  id="opmerkingen"
                  placeholder="(Optioneel)"
                  value={opmerkingen}
                  onChange={(e) => setOpmerkingen(e.target.value)}
                  className="text-base"
                />
              </div>
              <StokbroodButton onClick={handleFinalSubmit} disabled={isSubmitting || !email} variant="large">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Verzenden
              </StokbroodButton>
            </CardContent>
          </Card>
        )

      case 7: // Succes
        return (
          <Card className="w-full max-w-lg text-center" style={{ backgroundColor: '#f4ead6' }}>
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Bedankt voor het invullen!</h2>
              <p className="text-muted-foreground">We hebben al uw antwoorden ontvangen. We houden u op de hoogte!</p>
            </CardContent>
          </Card>
        )
        
      case 99: // Nee-pad
         return (
          <Card className="w-full max-w-lg text-center" style={{ backgroundColor: '#f4ead6' }}>
             <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-2">Jammer!</h2>
              <p className="text-muted-foreground">Toch bedankt voor uw tijd. Mocht u zich bedenken, dan weet u ons te vinden!</p>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start sm:justify-center p-4 sm:p-8 relative overflow-hidden" style={{paddingTop: 0}}>
      {/* Background image */}
      <Image
        src="/bakkeraandedeurlogo.png"
        alt="Bakker aan de Deur Logo"
        width={150}
        height={150}
        priority
      />
      {renderStep()}
    </main>
  )
}
