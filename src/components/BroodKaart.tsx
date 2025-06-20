'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface BroodKaartProps {
  brood: {
    id: string
    naam: string
    prijs: string
    emoji: string
  }
  aantal: number
  onAantalChange: (aantal: number) => void
}

export function BroodKaart({ brood, aantal, onAantalChange }: BroodKaartProps) {
  return (
    <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div className="text-center mb-3">
        <div className="text-3xl sm:text-4xl mb-2">{brood.emoji}</div>
        <h3 className="font-semibold text-sm sm:text-base leading-tight">{brood.naam}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{brood.prijs}</p>
      </div>
      
      <div className="flex items-center justify-center gap-2 mt-auto">
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => onAantalChange(Math.max(0, aantal - 1))}
          disabled={aantal === 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-10 sm:w-12 text-center font-semibold text-sm sm:text-base">{aantal}</span>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 sm:h-8 sm:w-8"
          onClick={() => onAantalChange(aantal + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
} 