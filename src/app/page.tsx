'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BroodKaart } from "@/components/BroodKaart"
import { broodOpties, bezorgTijden, straatOpties } from "@/data/broden"
// import { supabase } from "@/lib/supabase"

const formSchema = z.object({
  naam: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  straat: z.string().min(1, 'Selecteer een straat'),
  huisnummer: z.string().min(1, 'Vul een huisnummer in'),
  email: z.string().email('Vul een geldig emailadres in'),
  telefoon: z.string().optional(),
  bezorgTijd: z.string().min(1, 'Selecteer een bezorgtijd'),
  bezorgDagen: z.array(z.string()).min(1, 'Selecteer minimaal één bezorgdag'),
  opmerkingen: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

export default function Home() {
  const [broodAantallen, setBroodAantallen] = useState<Record<string, number>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bezorgDagen: []
    }
  })

  const bezorgDagen = watch('bezorgDagen')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    const broodSelectie = Object.entries(broodAantallen)
      .filter(([_, aantal]) => aantal > 0)
      .map(([broodType, aantal]) => ({ broodType, aantal }))

    // Combineer straat en huisnummer tot een volledig adres
    const volledigAdres = `${data.straat} ${data.huisnummer}`;

    // Tijdelijk uitgeschakeld voor debuggen
    console.log("Formuliergegevens:", { ...data, adres: volledigAdres, broodSelectie })

    // Simuleer een netwerkvertraging
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true)
    setIsSubmitting(false)

    /* Oorspronkelijke Supabase code:
    try {
      const { error } = await supabase
        .from('interesse_formulieren')
        .insert({
          ...data,
          adres: `${data.straat} ${data.huisnummer}`,
          brood_selectie: broodSelectie,
          bezorg_tijd: data.bezorgTijd,
          bezorg_dagen: data.bezorgDagen
        })

      if (error) throw error

      setIsSuccess(true)
    } catch (error) {
      console.error('Error:', error)
      alert('Er ging iets mis. Probeer het later opnieuw.')
    } finally {
      setIsSubmitting(false)
    }
    */
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bakker-cream to-bakker-beige flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bedankt voor je interesse!</h2>
            <p className="text-muted-foreground">
              We hebben je aanmelding ontvangen. We nemen snel contact met je op!
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bakker-cream to-bakker-beige">
      {/* Hero sectie */}
      <div className="bg-bakker-bruin text-white py-12 px-4 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            Bakker aan de Deur
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-2">
            Vers brood, thuisbezorgd
          </p>
          <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
            Meld je interesse aan en geniet straks van vers gebakken brood aan huis, elke dinsdag en vrijdag!
          </p>
        </div>
      </div>

      {/* Formulier */}
      <div className="max-w-4xl mx-auto p-4 sm:py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Persoonlijke gegevens */}
          <Card>
            <CardHeader>
              <CardTitle>Persoonlijke gegevens</CardTitle>
              <CardDescription>
                Vul je gegevens in zodat we contact met je kunnen opnemen
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="naam">Naam *</Label>
                  <Input
                    id="naam"
                    {...register('naam')}
                    placeholder="Jan Bakker"
                  />
                  {errors.naam && (
                    <p className="text-sm text-red-600 mt-1">{errors.naam.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="jan@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-[1fr_auto] gap-4">
                <div>
                  <Label htmlFor="straat">Straat *</Label>
                  <Select onValueChange={(value) => setValue('straat', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer uw straat" />
                    </SelectTrigger>
                    <SelectContent>
                      {straatOpties.map((straat) => (
                        <SelectItem key={straat} value={straat}>
                          {straat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.straat && (
                    <p className="text-sm text-red-600 mt-1">{errors.straat.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="huisnummer">Huisnummer *</Label>
                  <Input
                    id="huisnummer"
                    {...register('huisnummer')}
                    placeholder="bv. 123"
                    className="w-32"
                  />
                  {errors.huisnummer && (
                    <p className="text-sm text-red-600 mt-1">{errors.huisnummer.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="telefoon">Telefoon (optioneel)</Label>
                <Input
                  id="telefoon"
                  type="tel"
                  {...register('telefoon')}
                  placeholder="06-12345678"
                />
              </div>
            </CardContent>
          </Card>

          {/* Brood selectie */}
          <Card>
            <CardHeader>
              <CardTitle>Kies je brood</CardTitle>
              <CardDescription>
                Geef aan hoeveel broden je ongeveer per keer zou willen bestellen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {broodOpties.map((brood) => (
                  <BroodKaart
                    key={brood.id}
                    brood={brood}
                    aantal={broodAantallen[brood.id] || 0}
                    onAantalChange={(aantal) => 
                      setBroodAantallen(prev => ({ ...prev, [brood.id]: aantal }))
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bezorg voorkeuren */}
          <Card>
            <CardHeader>
              <CardTitle>Bezorg voorkeuren</CardTitle>
              <CardDescription>
                Wanneer wil je je brood ontvangen?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div>
                <Label>Bezorgdagen *</Label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="dinsdag"
                      checked={bezorgDagen?.includes('dinsdag')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setValue('bezorgDagen', [...(bezorgDagen || []), 'dinsdag'])
                        } else {
                          setValue('bezorgDagen', bezorgDagen?.filter(d => d !== 'dinsdag') || [])
                        }
                      }}
                    />
                    <Label htmlFor="dinsdag">Dinsdag</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="vrijdag"
                      checked={bezorgDagen?.includes('vrijdag')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setValue('bezorgDagen', [...(bezorgDagen || []), 'vrijdag'])
                        } else {
                          setValue('bezorgDagen', bezorgDagen?.filter(d => d !== 'vrijdag') || [])
                        }
                      }}
                    />
                    <Label htmlFor="vrijdag">Vrijdag</Label>
                  </div>
                </div>
                {errors.bezorgDagen && (
                  <p className="text-sm text-red-600 mt-1">{errors.bezorgDagen.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bezorgTijd">Uiterlijke bezorgtijd *</Label>
                <Select onValueChange={(value) => setValue('bezorgTijd', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een tijd" />
                  </SelectTrigger>
                  <SelectContent>
                    {bezorgTijden.map((tijd) => (
                      <SelectItem key={tijd} value={tijd}>
                        {tijd}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.bezorgTijd && (
                  <p className="text-sm text-red-600 mt-1">{errors.bezorgTijd.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Opmerkingen */}
          <Card>
            <CardHeader>
              <CardTitle>Aanvullende informatie</CardTitle>
              <CardDescription>
                Heb je speciale wensen of opmerkingen?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                {...register('opmerkingen')}
                placeholder="Heeft u nog ideeen, tips, vragen of opmerkingen?"
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Submit button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-bakker-bruin hover:bg-bakker-donkerbruin text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Versturen...
              </>
            ) : (
              'Verstuur mijn interesse'
            )}
          </Button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-bakker-donkerbruin text-white py-6 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-2">© 2024 Bakker aan de Deur</p>
          <p className="text-xs sm:text-sm opacity-75">
            Door dit formulier in te vullen ga je akkoord met onze privacy voorwaarden
          </p>
        </div>
      </footer>
    </div>
  )
}
