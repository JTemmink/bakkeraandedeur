'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BroodKaart } from "@/components/BroodKaart"
import { broodOpties, bezorgTijden, straatOpties, frequentieOpties } from "@/data/broden"
// import { supabase } from "@/lib/supabase"

type FormData = {
  bezorgTijd?: string
  frequentie?: string
  broodSelectie?: Record<string, number>
  naam?: string
  straat?: string
  huisnummer?: string
  email?: string
}

export default function Home() {
  const [step, setStep] = useState(0) // 0: Landing, 1: Tijd, 2: Frequentie, 3: Brood, 4: Adres, 5: Succes
  const [formData, setFormData] = useState<FormData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State voor de stappen
  const [broodAantallen, setBroodAantallen] = useState<Record<string, number>>({})
  const [naam, setNaam] = useState('')
  const [straat, setStraat] = useState('')
  const [huisnummer, setHuisnummer] = useState('')
  const [email, setEmail] = useState('')

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
          <Card className="w-full max-w-4xl bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>Waar heeft u interesse in?</CardTitle>
              <CardDescription>
                Geef aan hoeveel (halve) broden u per keer verwacht te bestellen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
                {broodOpties.map((brood) => (
                  <BroodKaart
                    key={brood.id}
                    brood={brood}
                    aantal={broodAantallen[brood.id] || 0}
                    onAantalChange={(aantal) => setBroodAantallen(prev => ({ ...prev, [brood.id]: aantal }))}
                  />
                ))}
              </div>
              <Button onClick={() => handleNextStep({ broodSelectie: broodAantallen })} className="w-full" size="lg">
                Volgende
              </Button>
            </CardContent>
          </Card>
        )

      case 4: // Adresgegevens
        const handleFinalSubmit = async () => {
          setIsSubmitting(true)
          const finalData = { ...formData, naam, straat, huisnummer, email }
          console.log("FINALE GEGEVENS:", finalData)
          // Hier komt de Supabase code weer terug als we die aanzetten
          await new Promise(resolve => setTimeout(resolve, 1000))
          setIsSubmitting(false)
          setStep(5)
        }
        
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg">
            <CardHeader>
              <CardTitle>Bijna klaar!</CardTitle>
              <CardDescription>
                We hebben alleen nog uw gegevens nodig.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-1">
                <Label htmlFor="naam">Naam</Label>
                <Input id="naam" value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="Jan Bakker" />
              </div>
               <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jan@example.com" />
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4">
                <div className="space-y-1">
                  <Label htmlFor="straat">Straat</Label>
                  <Select onValueChange={setStraat}>
                    <SelectTrigger><SelectValue placeholder="Kies uw straat" /></SelectTrigger>
                    <SelectContent>
                      {straatOpties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="huisnummer">Huisnummer</Label>
                  <Input id="huisnummer" value={huisnummer} onChange={(e) => setHuisnummer(e.target.value)} placeholder="123" className="w-28"/>
                </div>
              </div>
              <Button onClick={handleFinalSubmit} disabled={isSubmitting || !naam || !email || !straat || !huisnummer} className="w-full" size="lg">
                 {isSubmitting ? <Loader2 className="animate-spin" /> : 'Verstuur mijn interesse'}
              </Button>
            </CardContent>
          </Card>
        )

      case 5: // Succes
        return (
          <Card className="w-full max-w-lg bg-white/90 shadow-lg text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
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
    <main className="min-h-screen bg-gradient-to-br from-bakker-cream to-bakker-beige flex flex-col items-center justify-center p-4">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <Image
          src="/bakkeraandedeurlogo.png"
          alt="Bakker aan de Deur Logo"
          width={150}
          height={150}
          priority
        />
      </div>
      {renderStep()}
    </main>
  )
}
