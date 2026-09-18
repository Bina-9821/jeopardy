import type { CardType, Category, GamePhase, ProtectionType, Question, Team } from '../types/game'
import { Board } from './Board'
import { CardsPhase } from './CardsPhase'
import { DefensePhase } from './DefensePhase'
import { Scoreboard } from './Scoreboard'
import { ProtectionPhase } from './ProtectionPhase'
import { TargetAttackPhase } from './TargetAttackPhase'
import { QuestionPhase } from './QuestionPhase'

type GameBoardProps = {
  phase: GamePhase
  teams: Team[]
  categories: Category[]
  currentTurnTeamId: string
  playedQuestionIds: string[]
  currentQuestionId: string | null
  answerRevealed: boolean
  answerResults: Record<string, 'CORRETTO' | 'ERRATO'>
  currentAttackerTeamId: string | null
  defenderIsDefending: boolean
  selectedCards: Record<string, CardType[]>
  participantsTeamIds: string[]
  selectedProtections: Record<string, ProtectionType[]>
  targetAttackTeamId: string | null
  onSelectTarget: (teamId: string) => void
  onConfirmProtection: () => void
  onConfirmTargetAttack: () => void
  onSkipTargetAttack: () => void
  onToggleProtection: (teamId: string, protection: ProtectionType) => void
  onToggleCard: (teamId: string, card: CardType) => void
  onConfirmCards: () => void
  onQuestionClick: (question: Question) => void
  onToggleDefense: () => void
  onConfirmDefense: () => void
  onReturnToBoard: () => void
  onRevealAnswer: () => void
  onSetAnswerResult: (teamId: string, result: 'CORRETTO' | 'ERRATO') => void
  onConfirmAnswers: () => void
}

export function GameBoard({
  phase,
  teams,
  categories,
  currentTurnTeamId,
  playedQuestionIds,
  answerRevealed,
  answerResults,
  currentQuestionId,
  currentAttackerTeamId,
  defenderIsDefending,

  selectedCards,
  onToggleCard,
  onConfirmCards,
  participantsTeamIds,
  selectedProtections,
  onToggleProtection,
  targetAttackTeamId,
  onSelectTarget,
  onConfirmProtection,
  onConfirmTargetAttack,
  onSkipTargetAttack,
  onQuestionClick,
  onToggleDefense,
  onConfirmDefense,
  onReturnToBoard,
  onRevealAnswer,
  onSetAnswerResult,
  onConfirmAnswers,
}: GameBoardProps) {
  const currentQuestion = categories
    .flatMap((category) => category.questions)
    .find((question) => question.id === currentQuestionId)

  const currentCategory = categories.find((category) => category.id === currentQuestion?.categoryId)

  const defender = teams.find((team) => team.id === currentCategory?.defenderTeamId)

  const eligibleTeamIds =
    defenderIsDefending && defender
      ? teams.map((team) => team.id)
      : teams.filter((team) => team.id !== defender?.id).map((team) => team.id)

  const availableTargetTeams = teams.filter(
    (team) => !participantsTeamIds.includes(team.id) && team.id !== defender?.id
  )
  const participants = teams.filter((team) => participantsTeamIds.includes(team.id))

  /*
   * BOARD
   */
  if (phase === 'BOARD') {
    return (
      <main className="min-h-screen w-full px-4 py-4">
        <div className="flex min-h-[calc(100vh-32px)] w-full flex-col">
          <div className="min-h-0 flex-1">
            <Board
              categories={categories}
              playedQuestionIds={playedQuestionIds}
              currentQuestionId={currentQuestionId}
              hasActiveQuestion={currentQuestion !== undefined}
              onQuestionClick={onQuestionClick}
            />
          </div>

          <div className="mt-6">
            <Scoreboard teams={teams} currentTurnTeamId={currentTurnTeamId} />
          </div>
        </div>
      </main>
    )
  }

  /*
   * SCHERMATA DELLA DOMANDA
   */
  return (
    <main className="min-h-screen w-full px-6 py-6">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-6xl flex-col">
        {/* Header */}
        <header className="mb-10 flex items-start justify-between gap-8">
          <div>
            <h1 className="mt-2 text-4xl font-black text-white">{currentCategory?.name}</h1>

            <p className="mt-1 text-xl font-bold text-zinc-500">{currentQuestion?.value} punti</p>
          </div>

          <button
            type="button"
            onClick={onReturnToBoard}
            className="rounded-2xl border border-white/10 bg-zinc-800 px-5 py-4 text-sm font-black text-zinc-300 transition-all duration-200 hover:bg-zinc-700 hover:text-white"
          >
            ← TORNA ALLA BOARD
          </button>
        </header>

        {/* Fase */}
        {phase === 'DEFENSE' && defender && (
          <DefensePhase
            defender={defender}
            isDefending={defenderIsDefending}
            onToggleDefense={onToggleDefense}
            onConfirm={onConfirmDefense}
          />
        )}

        {/* Fase carte temporanea */}
        {phase === 'CARDS' && (
          <CardsPhase
            teams={teams}
            eligibleTeamIds={eligibleTeamIds}
            attackerTeamId={currentAttackerTeamId}
            defenderTeamId={defender?.id ?? null}
            selectedCards={selectedCards}
            onToggleCard={onToggleCard}
            onConfirm={onConfirmCards}
          />
        )}
        {phase === 'PROTECTION' && (
          <ProtectionPhase
            teams={teams}
            participantTeamIds={participantsTeamIds}
            selectedProtections={selectedProtections}
            onToggleProtection={onToggleProtection}
            onConfirm={onConfirmProtection}
          />
        )}

        {phase === 'TARGET_ATTACK' && defender && (
          <TargetAttackPhase
            defender={defender}
            availableTeams={availableTargetTeams}
            targetTeamId={targetAttackTeamId}
            onSelectTarget={onSelectTarget}
            onConfirm={onConfirmTargetAttack}
            onSkip={onSkipTargetAttack}
          />
        )}
        {phase === 'QUESTION' && currentQuestion && (
          <QuestionPhase
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            image={currentQuestion.image}
            audio={currentQuestion.audio}
            answerRevealed={answerRevealed}
            participants={participants}
            answerResults={answerResults}
            onRevealAnswer={onRevealAnswer}
            onSetAnswerResult={onSetAnswerResult}
            onConfirmAnswers={onConfirmAnswers}
          />
        )}

        {/* Score */}
        <div className="mt-auto pt-8">
          <Scoreboard teams={teams} currentTurnTeamId={currentTurnTeamId} />
        </div>
      </div>
    </main>
  )
}
