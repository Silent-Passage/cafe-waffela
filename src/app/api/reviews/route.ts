import { NextResponse } from "next/server";

const reviews = [
  { id: "1", author: "Maria S.", rating: 5, text: "Die Waffeln sind absolut fluffy und so lecker! Die Bananensplit Waffel ist ein Traum. Das Personal ist herzlich und zuvorkommend. Definitiv ein Muss in Lustenau!", date: "2024-12-15", avatar: "M" },
  { id: "2", author: "Thomas K.", rating: 5, text: "Super gemütliches Café mit fantastischen Waffeln. Die Atmosphäre ist einladend und das Essen kommt frisch und warm. Die Chicken Curry Bagel ist eine tolle Überraschung! Herzlich empfohlen.", date: "2024-11-28", avatar: "T" },
  { id: "3", author: "Anna B.", rating: 5, text: "Wunderschönes kleines Café! Die Waffeln sind einfach herrlich fluffy und mit so viel Liebe gemacht. Super sauber und einladend. Wir kommen sicher wieder!", date: "2024-11-10", avatar: "A" },
  { id: "4", author: "Peter M.", rating: 5, text: "Ich habe selten so eine Bananensplit Waffel gegessen! Absolut lecker und die Portionen sind großzügig. Die Betreiber sind herzlich und man fühlt sich sofort wohl.", date: "2024-10-22", avatar: "P" },
  { id: "5", author: "Sabine R.", rating: 4, text: "Ein gemütliches Plätzchen für einen schönen Nachmittag. Die Waffeln sind fluffig und die Auswahl ist toll. Super freundliches Personal. Toiletten sind sauber. Empfehlenswert!", date: "2024-10-05", avatar: "S" },
  { id: "6", author: "Klaus W.", rating: 5, text: "Beste Waffeln in Vorarlberg! Einfach super lecker, immer frisch und die Bananensplit Waffel ist mein absoluter Favorit. Das Café ist herzlich und gemütlich – ein zweites Zuhause.", date: "2024-09-18", avatar: "K" },
  { id: "7", author: "Lisa H.", rating: 5, text: "Super nettes Team und wunderbare Waffeln! So fluffy wie ich sie mir immer gewünscht habe. Ein Muss für alle Waffelliebhaber in der Region!", date: "2024-09-02", avatar: "L" },
  { id: "8", author: "Johannes F.", rating: 4, text: "Tolles Café mit leckerem Essen. Die Atmosphäre ist super gemütlich und einladend. Ich komme immer wieder gerne hierher für meine Waffel-Auszeit.", date: "2024-08-14", avatar: "J" },
];

export async function GET() {
  return NextResponse.json(reviews.filter((r) => r.rating >= 4));
}
