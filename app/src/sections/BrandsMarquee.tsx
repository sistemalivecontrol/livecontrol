import { MessageSquare, ShoppingBag, CreditCard, Truck, BarChart3, Smartphone } from 'lucide-react';

const platforms = [
  { name: 'WhatsApp', icon: MessageSquare },
  { name: 'Instagram', icon: ShoppingBag },
  { name: 'Mercado Pago', icon: CreditCard },
  { name: 'Envio', icon: Truck },
  { name: 'Relatorios', icon: BarChart3 },
  { name: 'Mobile', icon: Smartphone },
];

export default function BrandsMarquee() {
  const doubled = [...platforms, ...platforms];

  return (
    <section className="bg-dark-bg py-12 overflow-hidden">
      <p
        className="text-center text-[#555555] text-sm font-medium tracking-[0.5px] uppercase mb-8 px-4"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        INTEGRADO COM AS PRINCIPAIS PLATAFORMAS
      </p>

      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee items-center gap-20 shrink-0">
          {doubled.map((platform, i) => {
            const Icon = platform.icon;
            return (
              <div
                key={`${platform.name}-${i}`}
                className="flex items-center gap-3 opacity-40 hover:opacity-70 transition-opacity duration-300 shrink-0"
              >
                <Icon size={28} className="text-white" />
                <span
                  className="text-white text-lg font-medium whitespace-nowrap"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  {platform.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
