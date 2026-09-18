import type { Team } from '../types/game'

type DefensePhaseProps = {
  defender: Team
  isDefending: boolean
  onToggleDefense: () => void
  onConfirm: () => void
}

export function DefensePhase({ defender, isDefending, onToggleDefense, onConfirm }: DefensePhaseProps) {
  return (
    <section className="flex flex-1 flex-col">
      {/* Titolo fase */}
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Fase 1</p>

        <h2 className="mt-2 text-5xl font-black tracking-tight text-white">PRESIDIO</h2>

        <p className="mt-3 text-lg text-zinc-400">Il difensore decide se presidiare il territorio.</p>
      </div>

      {/* Riga difensore */}
      <div className="mt-12 flex items-center justify-between border-y border-white/10 py-7">
        <div>
          <p className="text-3xl font-black text-white">{defender.name}</p>

          <p className="mt-1 text-sm font-medium text-zinc-500">Presidio</p>
        </div>

        <button
          type="button"
          onClick={onToggleDefense}
          className={[
            'min-w-48 rounded-2xl px-8 py-5 text-xl font-black transition-all duration-200',
            isDefending
              ? 'border border-blue-300/40 bg-blue-500 text-white shadow-xl shadow-blue-900/40'
              : 'border border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white',
          ].join(' ')}
        >
          {isDefending ? 'DIFENDE' : 'DIFENDI'}
        </button>
      </div>

      {/* Conferma */}
      <div className="mt-8">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500"
        >
          CONFERMA PRESIDIO
        </button>
      </div>
    </section>
  )
}
