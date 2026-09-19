import { useState } from 'react'

import type { Category, Team } from '../types/game'

type AuctionScreenProps = {
  teams: Team[]
  categories: Category[]
  onAssignDefender: (categoryId: string, teamId: string, bid: number) => void
  onStartGame: () => void
}

export function AuctionScreen({ teams, categories, onAssignDefender, onStartGame }: AuctionScreenProps) {
  const defendedCategories = categories.filter((category) => category.id !== 'categoria-6')

  const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>({})

  const [bids, setBids] = useState<Record<string, string>>({})

  const handleAssign = (category: Category) => {
    const teamId = selectedTeams[category.id]
    const bid = Number(bids[category.id] ?? 0)

    if (!teamId) {
      window.alert(`${category.name}: seleziona una squadra.`)
      return
    }

    if (bid < 0 || bid > 1000) {
      window.alert(`${category.name}: l'offerta deve essere compresa tra 0 e 1000.`)
      return
    }

    onAssignDefender(category.id, teamId, bid)
  }

  return (
    <main className="min-h-screen w-full px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl flex-col">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">Game Master</p>

          <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">CONQUISTA</h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Conquista il territorio e assegna il presidio alle squadre.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-5 gap-3">
          {teams.map((team) => (
            <div key={team.id} className="rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-center">
              <p className="truncate text-sm font-bold text-zinc-300">{team.name}</p>

              <p className="mt-1 text-2xl font-black text-white">{team.score}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-4">
          {defendedCategories.map((category) => {
            const defender = teams.find((team) => team.id === category.defenderTeamId)

            const alreadyAssigned = category.defenderTeamId !== null

            return (
              <div key={category.id} className="rounded-3xl border border-white/10 bg-zinc-900/70 p-5 shadow-xl">
                <div className="flex items-center justify-between gap-6">
                  <div className="min-w-52">
                    <p className="text-2xl font-black text-white">{category.name}</p>

                    {alreadyAssigned ? (
                      <p className="mt-1 text-sm font-medium text-emerald-400">Difensore: {defender?.name}</p>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-zinc-500">Nessun difensore assegnato</p>
                    )}
                  </div>

                  {!alreadyAssigned && (
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedTeams[category.id] ?? ''}
                        onChange={(event) =>
                          setSelectedTeams((current) => ({
                            ...current,
                            [category.id]: event.target.value,
                          }))
                        }
                        className="rounded-2xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm font-bold text-white outline-none focus:border-blue-400/60"
                      >
                        <option value="" disabled>
                          Squadra
                        </option>

                        {teams
                          .filter((team) => {
                            const alreadyDefender = categories.some(
                              (otherCategory) =>
                                otherCategory.id !== category.id && otherCategory.defenderTeamId === team.id
                            )

                            return !alreadyDefender
                          })
                          .map((team) => (
                            <option key={team.id} value={team.id}>
                              {team.name}
                            </option>
                          ))}
                      </select>

                      <input
                        type="number"
                        min={0}
                        max={1000}
                        value={bids[category.id] ?? ''}
                        onChange={(event) =>
                          setBids((current) => ({
                            ...current,
                            [category.id]: event.target.value,
                          }))
                        }
                        placeholder="Offerta"
                        className="w-28 rounded-2xl border border-white/10 bg-zinc-800 px-4 py-3 text-center text-lg font-black text-white outline-none placeholder:text-zinc-600 focus:border-blue-400/60"
                      />

                      <button
                        type="button"
                        onClick={() => handleAssign(category)}
                        className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/30 transition-all duration-200 hover:bg-blue-500"
                      >
                        ASSEGNA
                      </button>
                    </div>
                  )}

                  {alreadyAssigned && (
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-6 py-3 text-sm font-black uppercase tracking-wider text-emerald-400">
                      ASSEGNATA
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onStartGame}
            className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500"
          >
            INIZIA PARTITA
          </button>
        </div>
      </div>
    </main>
  )
}
