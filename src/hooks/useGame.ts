import { useEffect, useState } from 'react'
import { initialCategories, initialTeams } from '../data/initialGame'
import type { CardType, GameState, ProtectionType } from '../types/game'

const STORAGE_KEY = 'gioco-jeopardy-state'

const createInitialState = (): GameState => ({
  phase: 'START',
  teams: structuredClone(initialTeams),
  categories: structuredClone(initialCategories),
  currentTurnTeamId: initialTeams[0].id,
  playedQuestionIds: [],

  currentQuestionId: null,
  answerRevealed: false,
  currentAttackerTeamId: null,
  defenderIsDefending: false,

  participantsTeamIds: [],
  targetAttackTeamId: null,

  selectedCards: {},
  paymentAppliedTeamIds: [],
  selectedProtections: {},
  answerResults: {},
})

const loadGameState = (): GameState => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY)

    if (!savedState) {
      return createInitialState()
    }

    const parsedState = JSON.parse(savedState) as GameState

    return {
      ...createInitialState(),
      ...parsedState,
      paymentAppliedTeamIds: parsedState.paymentAppliedTeamIds ?? [],
    }
  } catch {
    return createInitialState()
  }
}

export function useGame() {
  const [gameState, setGameState] = useState<GameState>(loadGameState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
  }, [gameState])

  const updateTeamName = (teamId: string, name: string) => {
    setGameState((current) => ({
      ...current,
      teams: current.teams.map((team) => (team.id === teamId ? { ...team, name } : team)),
    }))
  }
  const startBoard = () => {
    setGameState((current) => ({
      ...current,
      phase: 'BOARD',
    }))
  }

  const startGame = () => {
    setGameState((current) => ({
      ...current,
      phase: 'AUCTION',
    }))
  }
  const assignDefender = (categoryId: string, teamId: string, bid: number) => {
    setGameState((current) => {
      const category = current.categories.find((category) => category.id === categoryId)

      const team = current.teams.find((team) => team.id === teamId)

      if (!category || !team) {
        return current
      }

      const nextCategories = current.categories.map((currentCategory) =>
        currentCategory.id === categoryId
          ? {
              ...currentCategory,
              defenderTeamId: teamId,
            }
          : currentCategory
      )

      const nextTeams = current.teams.map((currentTeam) =>
        currentTeam.id === teamId
          ? {
              ...currentTeam,
              score: currentTeam.score - bid,
            }
          : currentTeam
      )

      return {
        ...current,
        categories: nextCategories,
        teams: nextTeams,
      }
    })
  }
  const openQuestion = (questionId: string, attackerTeamId: string) => {
    setGameState((current) => {
      /*
       * Se esiste già una domanda in corso e stiamo cliccando
       * una domanda diversa, non permettiamo di aprirla.
       */
      if (current.currentQuestionId !== null && current.currentQuestionId !== questionId) {
        return current
      }

      /*
       * Se stiamo riprendendo la stessa domanda,
       * torniamo semplicemente alla fase salvata.
       */
      if (current.currentQuestionId === questionId && current.phase !== 'BOARD') {
        return current
      }

      const question = current.categories
        .flatMap((category) => category.questions)
        .find((question) => question.id === questionId)

      if (!question) {
        return current
      }

      /*
       * Se la domanda è già stata giocata definitivamente,
       * non la riapriamo come nuova domanda.
       */
      if (current.playedQuestionIds.includes(questionId)) {
        return current
      }

      const category = current.categories.find((category) => category.id === question.categoryId)

      if (!category) {
        return current
      }

      /*
       * Nuova domanda.
       */
      return {
        ...current,

        phase: category.defenderTeamId === null ? 'CARDS' : 'DEFENSE',

        currentQuestionId: questionId,
        answerRevealed: current.currentQuestionId === questionId ? current.answerRevealed : false,
        currentAttackerTeamId: attackerTeamId,

        defenderIsDefending: current.currentQuestionId === questionId ? current.defenderIsDefending : false,
      }
    })
  }

  const returnToBoard = () => {
    setGameState((current) => ({
      ...current,
      phase: 'BOARD',
    }))
  }

  const setDefenderIsDefending = (isDefending: boolean) => {
    setGameState((current) => ({
      ...current,
      defenderIsDefending: isDefending,
    }))
  }

  const confirmDefense = () => {
    setGameState((current) => ({
      ...current,
      phase: 'CARDS',
    }))
  }

  const toggleCard = (teamId: string, card: CardType) => {
    setGameState((current) => {
      const currentCards = current.selectedCards[teamId] ?? []

      const isSelected = currentCards.includes(card)

      const nextCards = isSelected
        ? currentCards.filter((selectedCard) => selectedCard !== card)
        : [...currentCards, card]

      return {
        ...current,
        selectedCards: {
          ...current.selectedCards,
          [teamId]: nextCards,
        },
      }
    })
  }
  const toggleProtection = (teamId: string, protection: ProtectionType) => {
    setGameState((current) => {
      const currentProtections = current.selectedProtections[teamId] ?? []

      const isSelected = currentProtections.includes(protection)

      const nextProtections = isSelected
        ? currentProtections.filter((selectedProtection) => selectedProtection !== protection)
        : [...currentProtections, protection]

      return {
        ...current,
        selectedProtections: {
          ...current.selectedProtections,
          [teamId]: nextProtections,
        },
      }
    })
  }

  const selectTargetAttack = (teamId: string) => {
    setGameState((current) => ({
      ...current,
      targetAttackTeamId: teamId,
    }))
  }
  const confirmProtection = () => {
    setGameState((current) => {
      if (current.currentQuestionId === null) {
        return current
      }

      const question = current.categories
        .flatMap((category) => category.questions)
        .find((question) => question.id === current.currentQuestionId)

      if (!question) {
        return current
      }

      const defenderId =
        current.categories.find((category) => category.id === question.categoryId)?.defenderTeamId ?? null

      const defenderIsActive =
        defenderId !== null && current.defenderIsDefending && current.participantsTeamIds.includes(defenderId)

      return {
        ...current,
        phase: defenderIsActive ? 'TARGET_ATTACK' : 'QUESTION',
      }
    })
  }

  const revealAnswer = () => {
    setGameState((current) => ({
      ...current,
      answerRevealed: true,
    }))
  }

  const setAnswerResult = (teamId: string, result: 'CORRETTO' | 'ERRATO') => {
    setGameState((current) => {
      const currentResult = current.answerResults[teamId]

      if (currentResult === result) {
        const nextResults = { ...current.answerResults }
        delete nextResults[teamId]

        return {
          ...current,
          answerResults: nextResults,
        }
      }

      return {
        ...current,
        answerResults: {
          ...current.answerResults,
          [teamId]: result,
        },
      }
    })
  }

  const confirmAnswers = () => {
    setGameState((current) => {
      if (current.currentQuestionId === null || current.currentAttackerTeamId === null) {
        return current
      }

      const question = current.categories
        .flatMap((category) => category.questions)
        .find((question) => question.id === current.currentQuestionId)

      if (!question) {
        return current
      }

      const participants = new Set(current.participantsTeamIds)

      // Tutti i partecipanti devono avere un risultato.
      for (const teamId of participants) {
        if (!current.answerResults[teamId]) {
          const team = current.teams.find((team) => team.id === teamId)

          window.alert(`${team?.name ?? 'Una squadra'}: seleziona CORRETTO o ERRATO.`)

          return current
        }
      }

      const defenderId =
        current.categories.find((category) => category.id === question.categoryId)?.defenderTeamId ?? null

      const defenderIsActive = defenderId !== null && current.defenderIsDefending && participants.has(defenderId)

      const value = question.value

      const scoreChanges: Record<string, number> = {}

      for (const teamId of participants) {
        const result = current.answerResults[teamId]

        if (!result) {
          continue
        }

        const protections = current.selectedProtections[teamId] ?? []

        const hasTotalShield = protections.includes('SCUDO_TOTALE')

        const hasShield = protections.includes('SCUDO')

        const teamIsDefender = defenderIsActive && teamId === defenderId

        /*
         * Il difensore segue una logica speciale:
         *
         * CORRETTO:
         * +0 per la propria risposta
         * +25% V per ogni altro partecipante errato
         * massimo +50% V
         *
         * ERRATO:
         * -0.5V normalmente
         * -0.25V con SCUDO
         * 0 con SCUDO TOTALE
         */
        if (teamIsDefender) {
          if (result === 'ERRATO') {
            if (hasTotalShield) {
              scoreChanges[teamId] = 0
            } else if (hasShield) {
              scoreChanges[teamId] = -value * 0.25
            } else {
              scoreChanges[teamId] = -value * 0.5
            }

            continue
          }

          let wrongParticipants = 0

          for (const otherTeamId of participants) {
            if (otherTeamId === defenderId) {
              continue
            }

            if (current.answerResults[otherTeamId] === 'ERRATO') {
              wrongParticipants += 1
            }
          }

          wrongParticipants = Math.min(wrongParticipants, 2)

          scoreChanges[teamId] = wrongParticipants * value * 0.25

          continue
        }

        /*
         * Partecipante normale:
         *
         * CORRETTO = +V
         * ERRATO = -V
         * ERRATO + SCUDO = -0.5V
         * ERRATO + SCUDO TOTALE = 0
         */
        if (result === 'CORRETTO') {
          scoreChanges[teamId] = value
        } else if (hasTotalShield) {
          scoreChanges[teamId] = 0
        } else if (hasShield) {
          scoreChanges[teamId] = -value * 0.5
        } else {
          scoreChanges[teamId] = -value
        }
      }

      const teams = current.teams.map((team) => ({
        ...team,
        score: team.score + (scoreChanges[team.id] ?? 0),
      }))

      /*
       * La domanda viene chiusa definitivamente.
       *
       * Il turno passa alla squadra successiva
       * rispetto a quella che aveva scelto la domanda.
       */
      const attacker = current.teams.find((team) => team.id === current.currentAttackerTeamId)

      const nextTurnTeam = attacker
        ? current.teams.find((team) => team.position === (attacker.position + 1) % current.teams.length)
        : undefined

      return {
        ...current,
        phase: 'BOARD',
        teams,
        currentTurnTeamId: nextTurnTeam?.id ?? current.currentTurnTeamId,
        playedQuestionIds: current.playedQuestionIds.includes(current.currentQuestionId)
          ? current.playedQuestionIds
          : [...current.playedQuestionIds, current.currentQuestionId],
        currentQuestionId: null,
        currentAttackerTeamId: null,
        defenderIsDefending: false,
        participantsTeamIds: [],
        targetAttackTeamId: null,
        answerRevealed: false,
        selectedCards: {},
        paymentAppliedTeamIds: [],
        selectedProtections: {},
        answerResults: {},
      }
    })
  }

  const confirmTargetAttack = () => {
    setGameState((current) => {
      if (current.targetAttackTeamId === null) {
        return current
      }

      if (current.participantsTeamIds.includes(current.targetAttackTeamId)) {
        return current
      }

      return {
        ...current,
        phase: 'QUESTION',
        participantsTeamIds: [...current.participantsTeamIds, current.targetAttackTeamId],
      }
    })
  }

  const skipTargetAttack = () => {
    setGameState((current) => ({
      ...current,
      phase: 'QUESTION',
      targetAttackTeamId: null,
    }))
  }
  const confirmCards = () => {
    setGameState((current) => {
      if (current.currentQuestionId === null || current.currentAttackerTeamId === null) {
        return current
      }

      const question = current.categories
        .flatMap((category) => category.questions)
        .find((question) => question.id === current.currentQuestionId)

      if (!question) {
        return current
      }

      const defender = current.categories.find((category) => category.id === question.categoryId)?.defenderTeamId

      const initialParticipants = new Set<string>()

      // L'attaccante è sempre dentro
      initialParticipants.add(current.currentAttackerTeamId)

      // Il difensore è dentro solo se ha scelto DIFENDI
      if (defender !== null && defender !== undefined && current.defenderIsDefending) {
        initialParticipants.add(defender)
      }

      // Controlliamo le carte di ogni squadra
      // Controlliamo le carte di ogni squadra
      for (const team of current.teams) {
        const cards = current.selectedCards[team.id] ?? []

        const hasPayment = cards.includes('PAGAMENTO')

        const hasIntrusion = cards.includes('INTRUSIONE')

        const hasSoloTu = cards.includes('SOLO_TU')

        const hasNoDefense = cards.includes('NIENTE_DIFESA')

        const isAlreadyInside = initialParticipants.has(team.id)

        // PAGAMENTO + INTRUSIONE non sono compatibili
        if (hasPayment && hasIntrusion) {
          window.alert(`${team.name}: PAGAMENTO e INTRUSIONE non possono essere usati insieme.`)

          return current
        }

        // Una squadra già dentro non ha bisogno
        // di PAGAMENTO o INTRUSIONE
        if (isAlreadyInside) {
          continue
        }

        // Una squadra esterna che usa SOLO TU
        // deve prima entrare
        if (hasSoloTu && !hasPayment && !hasIntrusion) {
          window.alert(`${team.name}: prima deve entrare con PAGAMENTO o INTRUSIONE.`)

          return current
        }

        // Una squadra esterna che usa NIENTE DIFESA
        // deve prima entrare
        if (hasNoDefense && !hasPayment && !hasIntrusion) {
          window.alert(`${team.name}: prima deve entrare con PAGAMENTO o INTRUSIONE.`)

          return current
        }

        // Una squadra esterna può entrare pagando
        if (hasPayment) {
          initialParticipants.add(team.id)
          continue
        }

        // Oppure può entrare con INTRUSIONE
        if (hasIntrusion) {
          initialParticipants.add(team.id)
        }
      }
      /*
       * SOLO TU
       *
       * Se almeno una squadra partecipante
       * utilizza SOLO TU, rimangono dentro
       * solamente le squadre che hanno SOLO TU.
       */
      const soloTuTeams = current.teams.filter(
        (team) => initialParticipants.has(team.id) && (current.selectedCards[team.id] ?? []).includes('SOLO_TU')
      )

      let participants = new Set(initialParticipants)

      if (soloTuTeams.length > 0) {
        participants = new Set(soloTuTeams.map((team) => team.id))
      }

      /*
       * NIENTE DIFESA
       *
       * Se il difensore è ancora dentro e una
       * squadra partecipante utilizza NIENTE DIFESA,
       * il difensore viene escluso.
       */
      if (defender !== null && defender !== undefined && participants.has(defender)) {
        const noDefensePlayed = current.teams.some((team) => {
          if (!participants.has(team.id)) {
            return false
          }

          return (current.selectedCards[team.id] ?? []).includes('NIENTE_DIFESA')
        })

        if (noDefensePlayed) {
          participants.delete(defender)
        }
      }

      /*
       * Calcolo dei pagamenti.
       *
       * Il costo viene sottratto solo alle squadre
       * che hanno scelto PAGAMENTO.
       */
      const paymentAmount = question.value * 0.25

      const teamsAfterPayment = current.teams.map((team) => {
        const cards = current.selectedCards[team.id] ?? []

        const alreadyPaid = current.paymentAppliedTeamIds.includes(team.id)

        if (cards.includes('PAGAMENTO') && initialParticipants.has(team.id) && !alreadyPaid) {
          return {
            ...team,
            score: team.score - paymentAmount,
          }
        }

        return team
      })

      return {
        ...current,
        phase: 'PROTECTION',
        teams: teamsAfterPayment,
        participantsTeamIds: Array.from(participants),

        paymentAppliedTeamIds: [
          ...current.paymentAppliedTeamIds,
          ...current.teams
            .filter((team) => {
              const cards = current.selectedCards[team.id] ?? []

              return (
                cards.includes('PAGAMENTO') &&
                initialParticipants.has(team.id) &&
                !current.paymentAppliedTeamIds.includes(team.id)
              )
            })
            .map((team) => team.id),
        ],
      }
    })
  }

  const markQuestionAsPlayed = (questionId: string) => {
    setGameState((current) => {
      if (current.playedQuestionIds.includes(questionId)) {
        return current
      }

      return {
        ...current,
        playedQuestionIds: [...current.playedQuestionIds, questionId],
      }
    })
  }

  const setCurrentTurn = (teamId: string) => {
    setGameState((current) => ({
      ...current,
      currentTurnTeamId: teamId,
    }))
  }

  const resetGame = () => {
    const newState = createInitialState()

    setGameState(newState)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
  }

  return {
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
    confirmCards,
    selectTargetAttack,
    confirmProtection,
    confirmTargetAttack,
    skipTargetAttack,
    revealAnswer,
    setAnswerResult,
    confirmAnswers,
    markQuestionAsPlayed,
    setCurrentTurn,
    resetGame,
  }
}
