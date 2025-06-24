export interface BroodSelectie {
  broodType: string
  aantal: number
}

export interface InteresseFormulier {
  naam: string
  adres: string
  email: string
  telefoon?: string
  broodSelectie: BroodSelectie[]
  bezorgTijd: string
  bezorgDagen: string[]
  opmerkingen?: string
} 