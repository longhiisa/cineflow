import { notFound } from "next/navigation";
import { SeatSelection } from "@/components/SeatSelection";
import { getMovieById, getScreeningById } from "@/data/cinema";

export default async function SeatsPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;
  const screening = getScreeningById(sessionId);
  const movie = screening ? getMovieById(screening.movieId) : undefined;

  if (!screening || !movie) notFound();

  return (
    <SeatSelection
      movieId={movie.id}
      movieTitle={movie.title}
      screeningId={screening.id}
      screeningLabel={`${screening.dateLabel} às ${screening.startTime}`}
      roomName={screening.roomName}
      price={screening.price}
    />
  );
}
