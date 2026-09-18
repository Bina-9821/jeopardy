import type { Category } from '../types/game'

export const categories: Category[] = [
  {
    id: 'musica',
    name: 'Musica',
    defenderTeamId: null,
    questions: [
      {
        id: 'musica-200',
        categoryId: 'musica',
        value: 200,
        question: "🎧 Ascolta l'audio e indovina canzone e autore (audio da aggiungere)",
        answer: 'Come mai – 883',
      },
      {
        id: 'musica-400',
        categoryId: 'musica',
        value: 400,
        question: 'REBUS (emoji) 🗣️ 🧊 🎵 — chi è l\'artista e qual è la canzone?',
        answer: 'Emis Killa – Parole di ghiaccio',
      },
      {
        id: 'musica-600',
        categoryId: 'musica',
        value: 600,
        question: 'Nomina almeno 3 album di Marracash',
        answer: 'Persona, Noi, loro, gli altri, Signor Ambaradan, Zoo (bastano 3 a scelta)',
      },
      {
        id: 'musica-800',
        categoryId: 'musica',
        value: 800,
        question: "🖼️ Indovina l'album dalla copertina (immagine da aggiungere)",
        answer: 'Rodeo – Travis Scott',
      },
      {
        id: 'musica-1000',
        categoryId: 'musica',
        value: 1000,
        question: "🎧 Indovina la canzone dalla base musicale (audio da aggiungere)",
        answer: 'Yellow – Coldplay',
      },
    ],
  },
  {
    id: 'film-serie-tv',
    name: 'Film e Serie TV',
    defenderTeamId: null,
    questions: [
      {
        id: 'film-serie-tv-200',
        categoryId: 'film-serie-tv',
        value: 200,
        question: "Nomina 3 attori del film 'The Odyssey'",
        answer: 'Tom Holland, Zendaya, Anne Hathaway (vanno bene anche altri membri del cast)',
      },
      {
        id: 'film-serie-tv-400',
        categoryId: 'film-serie-tv',
        value: 400,
        question: 'Nomina 4 film in cui ha recitato Margot Robbie',
        answer:
          'Es. Barbie, The Wolf of Wall Street, Suicide Squad, I, Tonya, Once Upon a Time in Hollywood, Bombshell, Mary Queen of Scots, Focus, Dumb Money (bastano 4 a scelta)',
      },
      {
        id: 'film-serie-tv-600',
        categoryId: 'film-serie-tv',
        value: 600,
        question: "🖼️ Indovina la serie TV dall'immagine",
        answer: 'Prison Break',
        image: '/images/sona-prison-break.jpg',
      },
      {
        id: 'film-serie-tv-800',
        categoryId: 'film-serie-tv',
        value: 800,
        question:
          'Indovina il film da questi indizi:\n1) Il protagonista entra in contatto con un mondo molto diverso dal proprio.\n2) Una delle creature più importanti di questo mondo è collegata a una particolare connessione biologica.\n3) Una risorsa naturale diventa il motivo principale del conflitto.',
        answer: 'Avatar',
      },
      {
        id: 'film-serie-tv-1000',
        categoryId: 'film-serie-tv',
        value: 1000,
        question:
          "Breaking Bad: qual è il nome in codice/soprannome della metanfetamina prodotta da Walter White per la sua purezza?",
        answer: 'Blue Sky / Blue Meth',
      },
    ],
  },
  {
    id: 'cibo-e-drink',
    name: 'Cibo e Drink',
    defenderTeamId: null,
    questions: [
      {
        id: 'cibo-e-drink-200',
        categoryId: 'cibo-e-drink',
        value: 200,
        question: '🍆 Nomina 4 ingredienti presenti nel piatto Ratatouille',
        answer: "Melanzane, zucchine, pomodori, peperoni, cipolla, aglio, olio d'oliva, erbe aromatiche, sale, pepe (bastano 4)",
      },
      {
        id: 'cibo-e-drink-400',
        categoryId: 'cibo-e-drink',
        value: 400,
        question: 'Nomina gli ingredienti del Big Tasty',
        answer: 'Carne bovina, pane, formaggio, pomodoro, lattuga, cipolla, salsa Big Tasty',
      },
      {
        id: 'cibo-e-drink-600',
        categoryId: 'cibo-e-drink',
        value: 600,
        question: 'Che drink è? Ingredienti: rum, curaçao, lime, orzata',
        answer: 'Mai Tai',
      },
      {
        id: 'cibo-e-drink-800',
        categoryId: 'cibo-e-drink',
        value: 800,
        question: 'Di quale paese/regione è tipico il piatto Culurgiones?',
        answer: 'Italia (Sardegna)',
      },
      {
        id: 'cibo-e-drink-1000',
        categoryId: 'cibo-e-drink',
        value: 1000,
        question: 'Nomina 5 marche di vodka',
        answer:
          "Es. Absolut, Smirnoff, Belvedere, Grey Goose, Cîroc, Ketel One, Stolichnaya, Finlandia, Russian Standard, Tito's (bastano 5)",
      },
    ],
  },
  {
    id: 'cultura-generale',
    name: 'Cultura Generale',
    defenderTeamId: null,
    questions: [
      {
        id: 'cultura-generale-200',
        categoryId: 'cultura-generale',
        value: 200,
        question:
          'Metti in ordine cronologico: Impero Romano, Stampa a caratteri mobili, Scoperta dell\'America, Sbarco sulla Luna',
        answer: 'Impero Romano → Stampa a caratteri mobili → Scoperta dell\'America → Sbarco sulla Luna',
      },
      {
        id: 'cultura-generale-400',
        categoryId: 'cultura-generale',
        value: 400,
        question: '🖼️ Che logo è? (immagine da aggiungere)',
        answer: 'WWF (il panda)',
      },
      {
        id: 'cultura-generale-600',
        categoryId: 'cultura-generale',
        value: 600,
        question: 'Qual è la differenza tra ™ e ®?',
        answer: '™ = trademark, indica un marchio commerciale non ancora registrato; ® = indica un marchio registrato',
      },
      {
        id: 'cultura-generale-800',
        categoryId: 'cultura-generale',
        value: 800,
        question: '🖼️ Che logo è e cosa rappresenta? (immagine da aggiungere)',
        answer: 'Shell — rappresenta una conchiglia (pettine)',
      },
      {
        id: 'cultura-generale-1000',
        categoryId: 'cultura-generale',
        value: 1000,
        question: '🗺️ Individua queste 5 capitali sulla mappa del mondo (immagine da aggiungere)',
        answer: 'Canberra (Australia), Ottawa (Canada), Brasília (Brasile), Berna (Svizzera), Il Cairo (Egitto)',
      },
    ],
  },
  {
    id: 'videogiochi',
    name: 'Videogiochi',
    defenderTeamId: null,
    questions: [
      {
        id: 'videogiochi-200',
        categoryId: 'videogiochi',
        value: 200,
        question:
          'Come si chiama il nemico di Mario che ha un guscio verde e che può essere lanciato dopo averlo calpestato?',
        answer: 'Koopa (Koopa Troopa)',
      },
      {
        id: 'videogiochi-400',
        categoryId: 'videogiochi',
        value: 400,
        question: 'Qual è stato il primo Call of Duty a introdurre il doppio salto?',
        answer: 'Call of Duty: Advanced Warfare',
      },
      {
        id: 'videogiochi-600',
        categoryId: 'videogiochi',
        value: 600,
        question: "🖼️ Riconosci l'arma nell'immagine (Valorant, immagine da aggiungere)",
        answer: 'Judge',
      },
      {
        id: 'videogiochi-800',
        categoryId: 'videogiochi',
        value: 800,
        question: 'Qual è il primo Pokémon della lista del Pokédex nazionale?',
        answer: 'Bulbasaur',
      },
      {
        id: 'videogiochi-1000',
        categoryId: 'videogiochi',
        value: 1000,
        question: "🖼️ Indovina il gioco da questa immagine sfocata (immagine da aggiungere)",
        answer: "DA COMPLETARE — inserisci qui il gioco corrispondente all'immagine sfocata che sceglierai",
      },
    ],
  },
  {
    id: 'categoria-6',
    name: 'DA DEFINIRE',
    defenderTeamId: null,
    questions: [200, 400, 600, 800, 1000].map((value) => ({
      id: `categoria-6-${value}`,
      categoryId: 'categoria-6',
      value,
      question: `DA DEFINIRE — inserisci la domanda da ${value} punti`,
      answer: 'DA DEFINIRE',
    })),
  },
]
