import { useState } from 'react'
import type { Team } from '../types/game'

type StartScreenProps = {
  teams: Team[]
  onUpdateTeamName: (teamId: string, name: string) => void
  onStartGame: () => void
}

export function StartScreen({ teams, onUpdateTeamName, onStartGame }: StartScreenProps) {
  const [names, setNames] = useState<Record<string, string>>(
    Object.fromEntries(teams.map((team) => [team.id, team.name]))
  )

  const handleNameChange = (teamId: string, value: string) => {
    setNames((current) => ({
      ...current,
      [teamId]: value,
    }))
  }

  const handleStart = () => {
    teams.forEach((team) => {
      const name = names[team.id]?.trim() || `Squadra ${team.position + 1}`

      onUpdateTeamName(team.id, name)
    })

    onStartGame()
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Game Master</p>

          <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">GIOCO JEOPARDY</h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Configura le squadre prima di iniziare la partita.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {teams.map((team) => (
            <div
              key={team.id}
              className="group rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Squadra {team.position + 1}
                </span>

                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white">1000</span>
              </div>

              <input
                type="text"
                value={names[team.id] ?? ''}
                onChange={(event) => handleNameChange(team.id, event.target.value)}
                maxLength={20}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-center text-lg font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/60 focus:bg-black/30"
                placeholder={`Squadra ${team.position + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-2xl bg-blue-500 px-10 py-4 text-lg font-black text-white shadow-xl shadow-blue-500/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-400 active:translate-y-0"
          >
            INIZIA PARTITA
          </button>
        </div>
      </div>
    </main>
  )
}
