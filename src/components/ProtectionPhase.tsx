import type { ProtectionType, Team } from '../types/game'

type ProtectionPhaseProps = {
  teams: Team[]
  participantTeamIds: string[]
  selectedProtections: Record<string, ProtectionType[]>
  onToggleProtection: (teamId: string, protection: ProtectionType) => void
  onConfirm: () => void
}

const protectionOptions = [
  {
    id: 'SCUDO' as ProtectionType,
    label: 'BASTIONE',
  },
  {
    id: 'SCUDO_TOTALE' as ProtectionType,
    label: 'ROCCAFORTE',
  },
]

export function ProtectionPhase({
  teams,
  participantTeamIds,
  selectedProtections,
  onToggleProtection,
  onConfirm,
}: ProtectionPhaseProps) {
  const participantTeams = teams.filter((team) => participantTeamIds.includes(team.id))

  return (
    <section className="flex flex-1 flex-col">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Fase 3</p>

        <h2 className="mt-2 text-5xl font-black tracking-tight text-white">FORTIFICAZIONE</h2>

        <p className="mt-3 text-lg text-zinc-400">Le squadre scelgono come fortificare la propria posizione.</p>
      </div>

      <div className="mt-10 flex flex-col">
        {participantTeams.map((team) => {
          const teamProtections = selectedProtections[team.id] ?? []

          return (
            <div key={team.id} className="flex items-center justify-between border-y border-white/10 py-6">
              <div className="min-w-48">
                <p className="text-3xl font-black text-white">{team.name}</p>
              </div>

              <div className="flex items-center gap-3">
                {protectionOptions.map((option) => {
                  const selected = teamProtections.includes(option.id)

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onToggleProtection(team.id, option.id)}
                      className={[
                        'rounded-2xl border px-6 py-4 text-sm font-black transition-all duration-200',
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
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500"
        >
          CONFERMA FORTIFICAZIONE
        </button>
      </div>
    </section>
  )
}
