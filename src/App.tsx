import { GameBoard } from './components/GameBoard'
import { StartScreen } from './components/StartScreen'
import { useGame } from './hooks/useGame'
import { AuctionScreen } from './components/AuctionScreen'

function App() {
  const {
    gameState,
    updateTeamName,
    startGame,
    startBoard,
    assignDefender,
    openQuestion,
    returnToBoard,
    setDefenderIsDefending,
    confirmDefense,
    toggleCard,
    toggleProtection,
    selectTargetAttack,
    confirmProtection,
    confirmTargetAttack,

    skipTargetAttack,
    confirmCards,
    revealAnswer,
    setAnswerResult,
    confirmAnswers,
  } = useGame()

  if (gameState.phase === 'START') {
    return <StartScreen teams={gameState.teams} onUpdateTeamName={updateTeamName} onStartGame={startGame} />
  }

  if (gameState.phase === 'AUCTION') {
    return (
      <AuctionScreen
        teams={gameState.teams}
        categories={gameState.categories}
        onAssignDefender={assignDefender}
        onStartGame={startBoard}
      />
    )
  }

  return (
    <GameBoard
      phase={gameState.phase}
      teams={gameState.teams}
      categories={gameState.categories}
      answerRevealed={gameState.answerRevealed}
      answerResults={gameState.answerResults}
      currentTurnTeamId={gameState.currentTurnTeamId}
      playedQuestionIds={gameState.playedQuestionIds}
      currentQuestionId={gameState.currentQuestionId}
      defenderIsDefending={gameState.defenderIsDefending}
      participantsTeamIds={gameState.participantsTeamIds}
      selectedProtections={gameState.selectedProtections}
      onToggleProtection={toggleProtection}
      targetAttackTeamId={gameState.targetAttackTeamId}
      onSelectTarget={selectTargetAttack}
      onConfirmProtection={confirmProtection}
      onConfirmTargetAttack={confirmTargetAttack}
      onSkipTargetAttack={skipTargetAttack}
      currentAttackerTeamId={gameState.currentAttackerTeamId}
      selectedCards={gameState.selectedCards}
      onToggleCard={toggleCard}
      onConfirmCards={confirmCards}
      onQuestionClick={(question) => {
        if (gameState.phase !== 'BOARD') {
          return
        }

        openQuestion(question.id, gameState.currentTurnTeamId)
      }}
      onToggleDefense={() => {
        setDefenderIsDefending(!gameState.defenderIsDefending)
      }}
      onConfirmDefense={confirmDefense}
      onReturnToBoard={returnToBoard}
      onRevealAnswer={revealAnswer}
      onSetAnswerResult={setAnswerResult}
      onConfirmAnswers={confirmAnswers}
    />
  )
}

export default App
