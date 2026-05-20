import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Economia de tempo',
  'Cobranca mais profissional',
  'Reducao de erros manuais',
  'Organizacao completa das vendas',
  'Agilidade no atendimento',
  'Facilidade para acompanhar pagamentos',
  'Melhor experiencia para os clientes',
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;
    if (!section || !items) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(items.children, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark-bg py-[120px]">
      <div className="container-main">
        <div className="text-center mb-16">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            BENEFICIOS
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4 mx-auto"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              maxWidth: 700,
            }}
          >
            MAIS ORGANIZACAO. MAIS AGILIDADE. MAIS VENDAS.
          </h2>
        </div>

        <div
          ref={itemsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[900px] mx-auto"
        >
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-4 bg-surface-dark border border-[#1A1A1A] rounded-[8px] px-6 py-5"
            >
              <Check size={22} className="text-success shrink-0" />
              <span
                className="text-white text-base font-medium"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
