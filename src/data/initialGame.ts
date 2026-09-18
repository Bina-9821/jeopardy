import type { Team } from '../types/game'
import { categories } from './questions'

export const initialCategories = categories

export const initialTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Squadra 1',
    score: 1000,
    position: 0,
  },
  {
    id: 'team-2',
    name: 'Squadra 2',
    score: 1000,
    position: 1,
  },
  {
    id: 'team-3',
    name: 'Squadra 3',
    score: 1000,
    position: 2,
  },
  {
    id: 'team-4',
    name: 'Squadra 4',
    score: 1000,
    position: 3,
  },
  {
    id: 'team-5',
    name: 'Squadra 5',
    score: 1000,
    position: 4,
  },
]
