import type { Team } from '../types/game'

type QuestionPhaseProps = {
  question: string
  answer: string
  image?: string
  audio?: string
  answerRevealed: boolean
  participants: Team[]
  answerResults: Record<string, 'CORRETTO' | 'ERRATO'>
  onRevealAnswer: () => void
  onSetAnswerResult: (teamId: string, result: 'CORRETTO' | 'ERRATO') => void
  onConfirmAnswers: () => void
}

export function QuestionPhase({
  question,
  answer,
  image,
  audio,
  answerRevealed,
  participants,
  answerResults,
  onRevealAnswer,
  onSetAnswerResult,
  onConfirmAnswers,
}: QuestionPhaseProps) {
  const allAnswersSelected =
    participants.length > 0 && participants.every((team) => answerResults[team.id] !== undefined)

  return (
    <section className="flex flex-1 flex-col">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">Fase 5</p>

        <h2 className="mt-2 text-5xl font-black tracking-tight text-white">BATTAGLIA</h2>
      </div>

      {/* DOMANDA / RISPOSTA */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="max-w-6xl whitespace-pre-line text-6xl font-black leading-tight tracking-tight text-white">
          {question}
        </p>

        {image && (
          <img
            src={image}
            alt="Indizio"
            className="mt-8 max-h-[45vh] max-w-full rounded-2xl border border-white/10 object-contain shadow-xl"
          />
        )}

        {audio && (
          <audio controls src={audio} className="mt-8 w-full max-w-xl">
            Il tuo browser non supporta l'elemento audio.
          </audio>
        )}

        {answerRevealed && (
          <div className="mt-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-400">RISPOSTA</p>

            <p className="mt-4 max-w-5xl text-4xl font-black leading-tight text-white">{answer}</p>
          </div>
        )}
      </div>

      {/* RISULTATI DELLE SQUADRE */}
      {answerRevealed && (
        <div className="mt-6 flex flex-col">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">VERDETTO</p>

          <div className="flex flex-col">
            {participants.map((team) => {
              const result = answerResults[team.id]

              return (
                <div key={team.id} className="flex items-center justify-between border-y border-white/10 py-3">
                  <p className="text-xl font-black text-white">{team.name}</p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSetAnswerResult(team.id, 'CORRETTO')}
                      className={[
                        'rounded-xl border px-4 py-2 text-xs font-black transition-all duration-200',
                        result === 'CORRETTO'
                          ? 'border-emerald-300/50 bg-emerald-500 text-white shadow-lg shadow-emerald-950/30'
                          : 'border-emerald-400/20 bg-emerald-500/10 text-emerald-400 hover:border-emerald-400/40 hover:bg-emerald-500/20',
                      ].join(' ')}
                    >
                      ✓ CORRETTO
                    </button>

                    <button
                      type="button"
                      onClick={() => onSetAnswerResult(team.id, 'ERRATO')}
                      className={[
                        'rounded-xl border px-4 py-2 text-xs font-black transition-all duration-200',
                        result === 'ERRATO'
                          ? 'border-red-300/50 bg-red-500 text-white shadow-lg shadow-red-950/30'
                          : 'border-red-400/20 bg-red-500/10 text-red-400 hover:border-red-400/40 hover:bg-red-500/20',
                      ].join(' ')}
                    >
                      ✕ ERRATO
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* AZIONE */}
      <div className="mt-6">
        {!answerRevealed && (
          <button
            type="button"
            onClick={onRevealAnswer}
            className="w-full rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500"
          >
            RIVELA RISPOSTA
          </button>
        )}

        {answerRevealed && (
          <button
            type="button"
            onClick={onConfirmAnswers}
            disabled={!allAnswersSelected}
            className="w-full rounded-2xl bg-linear-to-r from-emerald-600 to-green-600 px-8 py-5 text-xl font-black text-white shadow-xl shadow-green-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-green-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            CONFERMA RISPOSTE
          </button>
        )}
      </div>
    </section>
  )
}
