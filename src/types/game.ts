export type Team = {
  id: string
  name: string
  score: number
  position: number
}

export type Question = {
  id: string
  categoryId: string
  value: number
  question: string
  answer: string
  image?: string
  audio?: string
}

export type Category = {
  id: string
  name: string
  defenderTeamId: string | null
  questions: Question[]
}

export type CardType = 'PAGAMENTO' | 'INTRUSIONE' | 'SOLO_TU' | 'NIENTE_DIFESA'

export type ProtectionType = 'SCUDO' | 'SCUDO_TOTALE'

export type GamePhase =
  | 'START'
  | 'AUCTION'
  | 'BOARD'
  | 'DEFENSE'
  | 'CARDS'
  | 'PROTECTION'
  | 'TARGET_ATTACK'
  | 'QUESTION'

export type GameState = {
  phase: GamePhase
  teams: Team[]
  categories: Category[]
  currentTurnTeamId: string
  playedQuestionIds: string[]

  // Domanda attualmente in corso
  currentQuestionId: string | null

  // Se la risposta è stata rivelata
  answerRevealed: boolean

  // Squadra che ha scelto la domanda
  currentAttackerTeamId: string | null

  // Se il difensore ha scelto di difendere
  defenderIsDefending: boolean

  // Squadre che partecipano effettivamente alla domanda
  participantsTeamIds: string[]

  // Squadra scelta dal difensore con ATTACCO MIRATO
  targetAttackTeamId: string | null

  // Carte selezionate dal Game Master
  selectedCards: Record<string, CardType[]>

  // Pagamenti già applicati per la domanda corrente
  paymentAppliedTeamIds: string[]

  // Protesioni selezionate dal Game Master
  selectedProtections: Record<string, ProtectionType[]>
  // Esito delle risposte
  answerResults: Record<string, 'CORRETTO' | 'ERRATO'>
}
