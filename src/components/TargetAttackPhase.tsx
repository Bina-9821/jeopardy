import type { Team } from '../types/game'

type TargetAttackPhaseProps = {
  defender: Team
  availableTeams: Team[]
  targetTeamId: string | null
  onSelectTarget: (teamId: string) => void
  onConfirm: () => void
  onSkip: () => void
}

export function TargetAttackPhase({
  defender,
  availableTeams,
  targetTeamId,
  onSelectTarget,
  onConfirm,
  onSkip,
}: TargetAttackPhaseProps) {
  return (
    <section className="flex flex-1 flex-col">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">Fase 4</p>

        <h2 className="mt-2 text-5xl font-black tracking-tight text-white">OFFENSIVA</h2>

        <p className="mt-3 text-lg text-zinc-400">{defender.name} decide quale squadra attaccare..</p>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        {availableTeams.map((team) => {
          const selected = targetTeamId === team.id

          return (
            <button
              key={team.id}
              type="button"
              onClick={() => onSelectTarget(team.id)}
              className={[
                'flex items-center justify-between rounded-2xl border px-6 py-5 text-left transition-all duration-200',
                selected
                  ? 'border-orange-300/50 bg-orange-500/20 text-white shadow-xl shadow-orange-950/30'
                  : 'border-white/10 bg-zinc-900/70 text-zinc-300 hover:border-orange-400/30 hover:bg-zinc-800 hover:text-white',
              ].join(' ')}
            >
              <span className="text-2xl font-black">{team.name}</span>

              <span
                className={[
                  'rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider',
                  selected ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-500',
                ].join(' ')}
              >
                {selected ? 'Bersaglio' : 'Scegli'}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onSkip}
          className="flex-1 rounded-2xl border border-white/10 bg-zinc-800 px-8 py-5 text-xl font-black text-zinc-300 transition-all duration-200 hover:bg-zinc-700 hover:text-white"
        >
          NON ATTACCARE
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={targetTeamId === null}
          className="flex-1 rounded-2xl bg-linear-to-r from-orange-600 to-red-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-orange-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-orange-500 hover:to-red-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          CONFERMA BERSAGLIO
        </button>
      </div>
    </section>
  )
}
