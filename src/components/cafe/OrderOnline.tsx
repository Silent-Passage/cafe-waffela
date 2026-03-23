export function OrderOnline() {
  return (
    <section id="order-online" className="py-24 bg-[#FFF9E5]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold font-display mb-4 text-[#2D1B0D]">
          Hunger? Wir liefern! 🛵
        </h2>
        <p className="text-xl text-[#2D1B0D]/80 mb-12">
          Bestelle jetzt bequem online über deine Lieblingsplattform
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="https://www.foodora.at/restaurant/waffela"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-[#D70F64] text-white font-bold text-xl hover:scale-105 transition-transform shadow-xl"
          >
            🍕 Bestellen auf foodora
          </a>
          <a
            href="https://www.lieferando.at/speisekarte/cafe-waffela"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-[#FF8000] text-white font-bold text-xl hover:scale-105 transition-transform shadow-xl"
          >
            🛵 Bestellen auf Lieferando
          </a>
        </div>

        <p className="mt-12 text-[#2D1B0D]/60 font-medium">
          Abholung auch direkt bei uns möglich!
        </p>
      </div>
    </section>
  );
}
