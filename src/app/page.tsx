'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2, CheckCircle, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

const StokbroodButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="relative w-full h-16 border-2 border-amber-800/80 rounded-full bg-[#f2d5a3] hover:bg-[#eac88a] transition-all duration-200 flex items-center justify-center group shadow-lg"
    style={{
      boxShadow: '0 4px 6px -1px rgba(101, 59, 12, 0.2), 0 2px 4px -1px rgba(101, 59, 12, 0.15), inset 0 -4px 5px rgba(101, 59, 12, 0.3)'
    }}
  >
    {/* Diagonal lines to simulate baguette scores */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
        <div className="absolute w-2 h-24 bg-amber-900/20 transform -rotate-45 -translate-x-12 -translate-y-4"></div>
        <div className="absolute w-2 h-24 bg-amber-900/20 transform -rotate-45 -translate-x-4 -translate-y-4"></div>
        <div className="absolute w-2 h-24 bg-amber-900/20 transform -rotate-45 translate-x-4 -translate-y-4"></div>
        <div className="absolute w-2 h-24 bg-amber-900/20 transform -rotate-45 translate-x-12 -translate-y-4"></div>
        <div className="absolute w-2 h-24 bg-amber-900/20 transform -rotate-45 translate-x-20 -translate-y-4"></div>
        <div className="absolute w-2 h-24 bg-amber-900/20 transform -rotate-45 translate-x-28 -translate-y-4"></div>
    </div>

    <span className="relative z-10 font-bold text-xl text-stone-800 group-hover:text-stone-900 transition-colors" style={{ textShadow: '1px 1px 1px rgba(255,255,255,0.5)' }}>
      {children}
    </span>
  </button>
);

export default function Home() {
  const [step, setStep] = useState(0) // 0: Landing, 1: Tijd, 2: Frequentie, 3: Brood, 4: Straat, 5: Huisnummer, 6: Succes
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
            <h2 className="text-2xl sm:text-3xl font-bold text-bakker-donkerbruin mb-8">
              Lijkt het u wat om vers brood aan de deur te ontvangen?
            </h2>
            <div className="flex justify-center items-center gap-8">
              <button onClick={() => setStep(1)} className="btn-brood">Ja!</button>
              <button onClick={() => setStep(99)} className="btn-brood">Nee</button>
            </div>
          </div>
        )
      
      case 1: // Bedankt & Tijd
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>Leuk! Wanneer komt het u uit?</CardTitle>
              <CardDescription>
                Geef aan hoe laat we het brood uiterlijk moeten bezorgen voor een vers ontbijt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={(value) => handleNextStep({ bezorgTijd: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Kies een uiterlijke bezorgtijd" />
                </SelectTrigger>
                <SelectContent>
                  {bezorgTijden.map((tijd) => <SelectItem key={tijd} value={tijd}>{tijd}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )

      case 2: // Frequentie
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>Hoe vaak zou u willen bestellen?</CardTitle>
              <CardDescription>
                In het begin bezorgen we maximaal 2 keer per week. Dit helpt ons een inschatting te maken.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {frequentieOpties.map(optie => (
                <Button key={optie} onClick={() => handleNextStep({ frequentie: optie })} size="lg">
                  {optie}
                </Button>
              ))}
            </CardContent>
          </Card>
        )
        
      case 3: // Broodkeuze
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg">
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
              
              <Button onClick={() => handleNextStep({ aantalHeleBroden, aantalHalveBroden, aantalOverige })} className="w-full !mt-8" size="lg">
                Volgende
              </Button>
            </CardContent>
          </Card>
        )

      case 4: // Straatkeuze
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg">
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
          <Card className="w-full max-w-lg bg-white/90 shadow-lg">
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
              <Button onClick={handleFinalSubmit} disabled={isSubmitting || !huisnummer || !email} className="w-full !mt-8" size="lg">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Verzenden
              </Button>
            </CardContent>
          </Card>
        )

      case 6: // Succes
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg text-center">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Bedankt voor het invullen!</h2>
              <p className="text-muted-foreground">We hebben al uw antwoorden ontvangen. We houden u op de hoogte!</p>
            </CardContent>
          </Card>
        )
        
      case 99: // Nee-pad
         return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg text-center">
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
    <main className="flex min-h-screen flex-col items-center justify-start sm:justify-center p-4 pt-28 sm:p-8 relative overflow-hidden">
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
