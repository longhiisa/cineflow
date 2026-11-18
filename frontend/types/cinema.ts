export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  durationMinutes: number;
  genre: string;
  rating: string;
  posterUrl: string;
}

export interface Session {
  id: string;
  movieId: string;
  roomName: string;
  startTime: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'AVAILABLE' | 'RESERVED' | 'OCCUPIED';
}
