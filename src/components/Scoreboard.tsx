import type { Team } from '../types/game'

type ScoreboardProps = {
  teams: Team[]
  currentTurnTeamId: string
}

export function Scoreboard({ teams, currentTurnTeamId }: ScoreboardProps) {
  return (
    <div className="flex justify-center gap-4">
      {teams.map((team) => {
        const isCurrentTurn = team.id === currentTurnTeamId

        return (
          <div
            key={team.id}
            className={[
              'w-70 rounded-2xl border px-5 py-8 transition-all duration-300',
              isCurrentTurn
                ? 'border-blue-400/50 bg-linear-to-br from-blue-600/30 to-indigo-600/20 shadow-lg shadow-blue-950/30'
                : 'border-white/10 bg-zinc-900/80',
            ].join(' ')}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-base font-bold text-zinc-200">{team.name}</span>
            </div>

            <div className="mt-1 text-4xl font-black tracking-tight text-white">{team.score}</div>
          </div>
        )
      })}
    </div>
  )
}
