import type { CardType, Team } from '../types/game'

type CardsPhaseProps = {
  teams: Team[]
  eligibleTeamIds: string[]
  attackerTeamId: string | null
  defenderTeamId: string | null
  selectedCards: Record<string, CardType[]>
  onToggleCard: (teamId: string, card: CardType) => void
  onConfirm: () => void
}
const entryOptions = [
  {
    id: 'PAGAMENTO' as CardType,
    label: 'TRIBUTO',
  },
  {
    id: 'INTRUSIONE' as CardType,
    label: 'INFILTRAZIONE',
  },
]

const actionCards = [
  {
    id: 'SOLO_TU' as CardType,
    label: 'DUELLO',
  },
  {
    id: 'NIENTE_DIFESA' as CardType,
    label: 'SABOTAGGIO',
  },
]

export function CardsPhase({
  teams,
  eligibleTeamIds,
  attackerTeamId,
  defenderTeamId,
  selectedCards,
  onToggleCard,
  onConfirm,
}: CardsPhaseProps) {
  const eligibleTeams = teams.filter((team) => eligibleTeamIds.includes(team.id))

  return (
    <section className="flex flex-1 flex-col">
      {/* Titolo fase */}
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Fase 2</p>

        <h2 className="mt-2 text-5xl font-black tracking-tight text-white">MANOVRE</h2>

        <p className="mt-3 text-lg text-zinc-400">Il Game Master decide le manovre delle squadre.</p>
      </div>

      {/* Squadre */}
      <div className="mt-10 flex flex-col">
        {eligibleTeams.map((team) => {
          const teamCards = selectedCards[team.id] ?? []

          return (
            <div key={team.id} className="flex items-center justify-between border-y border-white/10 py-6">
              {/* Squadra */}
              <div className="min-w-56">
                <p className="text-3xl font-black text-white">{team.name}</p>

                {team.id === attackerTeamId && (
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-blue-400">Attaccante</p>
                )}

                {team.id === defenderTeamId && (
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.2em] text-orange-400">Difensore</p>
                )}
              </div>

              {/* Controlli */}
              <div className="flex items-center gap-6">
                {/* Modalità di ingresso */}
                <div className="flex items-center gap-3">
                  {entryOptions.map((option) => {
                    const selected = teamCards.includes(option.id)

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => onToggleCard(team.id, option.id)}
                        className={[
                          'rounded-2xl border px-5 py-4 text-sm font-black transition-all duration-200',
                          selected
                            ? 'border-blue-300/40 bg-blue-500 text-white shadow-xl shadow-blue-900/40'
                            : 'border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white',
                        ].join(' ')}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>

                {/* Separatore */}
                <div className="h-12 w-px bg-white/10" />

                {/* Altre carte */}
                <div className="flex items-center gap-3">
                  {actionCards.map((card) => {
                    const selected = teamCards.includes(card.id)

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => onToggleCard(team.id, card.id)}
                        className={[
                          'rounded-2xl border px-5 py-4 text-sm font-black transition-all duration-200',
                          selected
                            ? 'border-blue-300/40 bg-blue-500 text-white shadow-xl shadow-blue-900/40'
                            : 'border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white',
                        ].join(' ')}
                      >
                        {card.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Conferma */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500"
        >
          CONFERMA MANOVRE
        </button>
      </div>
    </section>
  )
}
