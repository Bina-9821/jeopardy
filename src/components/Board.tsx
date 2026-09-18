import type { Category, Question } from '../types/game'

type BoardProps = {
  categories: Category[]
  playedQuestionIds: string[]
  currentQuestionId: string | null
  hasActiveQuestion: boolean
  onQuestionClick: (question: Question) => void
}

export function Board({
  categories,
  playedQuestionIds,
  currentQuestionId,
  hasActiveQuestion,
  onQuestionClick,
}: BoardProps) {
  return (
    <div className="grid grid-cols-6 gap-3">
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-3">
          <div className="flex h-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-zinc-800 to-zinc-900 px-3  text-center shadow-lg">
            <span className="text-2xl font-black tracking-wide text-white">{category.name}</span>
          </div>

          {category.questions.map((question) => {
            const played = playedQuestionIds.includes(question.id)

            const isCurrentQuestion = currentQuestionId === question.id

            const isBlocked = hasActiveQuestion && !isCurrentQuestion

            return (
              <button
                key={question.id}
                type="button"
                disabled={isBlocked}
                onClick={() => onQuestionClick(question)}
                className={[
                  'h-[clamp(135px,16.5vh,185px)] rounded-2xl border text-3xl font-black transition-all duration-200',
                  'shadow-lg',

                  isCurrentQuestion
                    ? 'border-amber-300/60 bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-orange-950/40 ring-2 ring-amber-400/30'
                    : played
                      ? 'cursor-pointer border-white/5 bg-zinc-900/70 text-zinc-700'
                      : isBlocked
                        ? 'cursor-not-allowed border-white/5 bg-zinc-900/50 text-zinc-800'
                        : 'border-blue-400/20 bg-linear-to-br from-blue-600 to-indigo-700 text-white hover:-translate-y-0.5 hover:scale-[1.01] hover:from-blue-500 hover:to-indigo-600 hover:shadow-blue-900/40',
                ].join(' ')}
              >
                {question.value}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
