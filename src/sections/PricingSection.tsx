import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '97',
    description: 'Perfeito para quem esta comecando a vender em live.',
    featured: false,
    features: [
      'Ate 3 lives por mes',
      '50 clientes',
      'Relatorio basico',
      'Cobranca via WhatsApp',
      'Suporte por email',
    ],
  },
  {
    name: 'Pro',
    price: '197',
    description: 'Para vendedores que ja tem volume e querem escalar.',
    featured: true,
    features: [
      'Lives ilimitadas',
      'Clientes ilimitados',
      'Relatorios completos',
      'Cobranca + Lembrete automatico',
      'Formulario de envio',
      'Rastreamento de pedidos',
      'Suporte prioritario',
    ],
  },
  {
    name: 'Business',
    price: '497',
    description: 'Para equipes e operacoes de live commerce profissional.',
    featured: false,
    features: [
      'Tudo do Pro',
      'Multiplos usuarios',
      'API de integracao',
      'Webhook personalizado',
      'Dominio proprio',
      'Suporte dedicado 24/7',
      'Onboarding personalizado',
    ],
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="planos" ref={sectionRef} className="bg-black py-[120px]">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            PLANOS E PRECOS
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            ESCOLHA O PLANO IDEAL PARA O SEU NEGOCIO
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`relative flex flex-col rounded-[16px] p-12 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.featured
                  ? 'border-2 border-amber bg-gradient-to-b from-[#0A0A0A] to-[#1A1200] shadow-[0_0_40px_rgba(255,159,28,0.3)]'
                  : 'border border-[#1A1A1A] bg-surface-dark hover:shadow-card-hover hover:border-amber/40'
              }`}
            >
              {/* Badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber text-black text-xs font-medium tracking-[0.5px] uppercase px-3 py-1 rounded-[8px]">
                  Mais Popular
                </div>
              )}

              {/* Plan name */}
              <h4
                className="text-white text-2xl font-medium mb-4"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {plan.name}
              </h4>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-white text-2xl font-bold">R$</span>
                <span
                  className="text-white font-bold"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(40px, 5vw, 56px)',
                    letterSpacing: '-2px',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span className="text-[#555555] text-base">/mes</span>
              </div>

              {/* Description */}
              <p
                className="text-[#B0B0B0] text-base mb-8"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-[#1A1A1A] mb-8" />

              {/* Features */}
              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={20} className="text-success shrink-0 mt-0.5" />
                    <span
                      className="text-[#B0B0B0] text-base"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-4 rounded-[8px] text-base font-semibold transition-all duration-200 hover:scale-[1.02] ${
                  plan.featured
                    ? 'bg-amber text-black hover:brightness-110'
                    : 'bg-white text-black hover:brightness-110'
                }`}
              >
                Escolher {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
