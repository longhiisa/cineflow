import type { Movie } from "@/types/cinema";

export const MOVIES: Movie[] = [
  {
    id: "1",
    title: "Horizonte Carmesim",
    synopsis:
      "Em uma metrópole futurista mergulhada em sombras, um piloto renegado descobre uma conspiração capaz de apagar a memória de toda a humanidade.",
    durationMinutes: 148,
    genre: "Ficção Científica • Ação",
    rating: "14",
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "O Último Ato em Veneza",
    synopsis:
      "Durante o festival de máscaras mais exclusivo da Europa, um detetive aposentado precisa desvendar um crime perfeito antes da meia-noite.",
    durationMinutes: 126,
    genre: "Suspense • Mistério",
    rating: "16",
    posterUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Velocidade Noturna",
    synopsis:
      "Nas estradas clandestinas de Tóquio, dois rivais históricos colocam tudo em jogo em uma corrida sem regras sob tempestade.",
    durationMinutes: 134,
    genre: "Ação • Corrida",
    rating: "12",
    posterUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Ecos do Abismo",
    synopsis:
      "Uma expedição científica nas fossas oceânicas encontra uma estrutura milenar que nunca deveria ter sido despertada.",
    durationMinutes: 118,
    genre: "Terror • Ficção",
    rating: "16",
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
  },
];

export const COMING_SOON_MOVIES: Movie[] = [
  {
    id: "5",
    title: "A Cidade Depois da Chuva",
    synopsis:
      "Em uma cidade onde nunca para de chover, uma fotógrafa encontra pistas de um desaparecimento que todos parecem querer esquecer.",
    durationMinutes: 112,
    genre: "Drama • Mistério",
    rating: "12",
    posterUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Órbita de Silêncio",
    synopsis:
      "A tripulação de uma estação espacial perde contato com a Terra e precisa descobrir o que está escondido no lado escuro do planeta.",
    durationMinutes: 139,
    genre: "Ficção Científica • Suspense",
    rating: "14",
    posterUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop",
  },
];

export const ALL_MOVIES = [...MOVIES, ...COMING_SOON_MOVIES];

export interface Screening {
  id: string;
  movieId: string;
  date: string;
  dateLabel: string;
  startTime: string;
  roomName: string;
  format: string;
  audio: string;
  price: number;
}

export const SCREENINGS: Screening[] = MOVIES.flatMap((movie, movieIndex) => [
  {
    id: `${movie.id}-1830`,
    movieId: movie.id,
    date: "2026-11-18",
    dateLabel: "Hoje, 18 Nov",
    startTime: movieIndex === 0 ? "18:30" : "19:10",
    roomName: `Sala ${movieIndex + 1}`,
    format: movieIndex === 0 ? "IMAX" : "2D",
    audio: "Dublado",
    price: movieIndex === 0 ? 42 : 34,
  },
  {
    id: `${movie.id}-2115`,
    movieId: movie.id,
    date: "2026-11-18",
    dateLabel: "Hoje, 18 Nov",
    startTime: "21:15",
    roomName: `Sala ${movieIndex + 5}`,
    format: movieIndex % 2 === 0 ? "3D" : "2D",
    audio: "Legendado",
    price: 38,
  },
  {
    id: `${movie.id}-191830`,
    movieId: movie.id,
    date: "2026-11-19",
    dateLabel: "Qui, 19 Nov",
    startTime: "18:30",
    roomName: `Sala ${movieIndex + 2}`,
    format: "2D",
    audio: "Dublado",
    price: 32,
  },
]);

export interface Snack {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
}

export const SNACKS: Snack[] = [
  {
    id: "combo-classico",
    name: "Combo Clássico",
    description: "Pipoca média e duas bebidas de 500 ml.",
    price: 42,
    emoji: "🍿",
  },
  {
    id: "combo-casal",
    name: "Combo Casal",
    description: "Pipoca grande, duas bebidas e um chocolate.",
    price: 58,
    emoji: "🥤",
  },
  {
    id: "pipoca-caramelo",
    name: "Pipoca Caramelo",
    description: "Pipoca gourmet com caramelo salgado.",
    price: 28,
    emoji: "🍿",
  },
  {
    id: "nachos",
    name: "Nachos com Queijo",
    description: "Nachos crocantes com molho de queijo.",
    price: 26,
    emoji: "🧀",
  },
];

export function getMovieById(id: string) {
  return ALL_MOVIES.find((movie) => movie.id === id);
}

export function getScreeningById(id: string) {
  return SCREENINGS.find((screening) => screening.id === id);
}
