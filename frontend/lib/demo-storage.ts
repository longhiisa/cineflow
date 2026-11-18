export interface BookingDraft {
  movieId: string;
  screeningId: string;
  seatIds: string[];
}

export interface CinemaTicket {
  code: string;
  movieId: string;
  screeningId: string;
  seatIds: string[];
  customerName: string;
  customerEmail: string;
  total: number;
  createdAt: string;
}

const BOOKING_KEY = "cineflow-booking";
const TICKETS_KEY = "cineflow-tickets";
const BOOKING_CHANGE_EVENT = "cineflow-booking-change";
const TICKETS_CHANGE_EVENT = "cineflow-tickets-change";

export function getBookingDraft(): BookingDraft | null {
  const value = window.localStorage.getItem(BOOKING_KEY);
  return value ? (JSON.parse(value) as BookingDraft) : null;
}

export function getBookingSnapshot() {
  return window.localStorage.getItem(BOOKING_KEY);
}

export function subscribeToBooking(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(BOOKING_CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(BOOKING_CHANGE_EVENT, listener);
  };
}

export function parseBookingSnapshot(value: string | null): BookingDraft | null {
  return value ? (JSON.parse(value) as BookingDraft) : null;
}

export function saveBookingDraft(draft: BookingDraft) {
  window.localStorage.setItem(BOOKING_KEY, JSON.stringify(draft));
  window.dispatchEvent(new Event(BOOKING_CHANGE_EVENT));
}

export function clearBookingDraft() {
  window.localStorage.removeItem(BOOKING_KEY);
  window.dispatchEvent(new Event(BOOKING_CHANGE_EVENT));
}

export function getTickets(): CinemaTicket[] {
  const value = window.localStorage.getItem(TICKETS_KEY);
  return value ? (JSON.parse(value) as CinemaTicket[]) : [];
}

export function getTicketsSnapshot() {
  return window.localStorage.getItem(TICKETS_KEY);
}

export function subscribeToTickets(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(TICKETS_CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(TICKETS_CHANGE_EVENT, listener);
  };
}

export function parseTicketsSnapshot(value: string | null): CinemaTicket[] {
  return value ? (JSON.parse(value) as CinemaTicket[]) : [];
}

export function saveTicket(ticket: CinemaTicket) {
  window.localStorage.setItem(
    TICKETS_KEY,
    JSON.stringify([ticket, ...getTickets()])
  );
  window.dispatchEvent(new Event(TICKETS_CHANGE_EVENT));
}
