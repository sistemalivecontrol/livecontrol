import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Fale e Registre',
    description:
      'Durante a live, fale o valor, codigo e nome do cliente. O sistema preenche automaticamente com reconhecimento de voz. Prefere digitar? Funciona com autocomplete inteligente tambem.',
  },
  {
    number: '02',
    title: 'Cobre Automatico',
    description:
      'Selecione a live e o sistema agrupa todas as compras por cliente. Gere a mensagem de cobranca com PIX e envie pelo Instagram Direct ou email.',
  },
  {
    number: '03',
    title: 'Entregue Sem Trabalho',
    description:
      'Seu cliente acessa o link exclusivo, preenche o endereco e paga o frete via PIX. Voce so organiza os envios com tudo confirmado.',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stepEls = stepsRef.current.filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(stepEls, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark-bg py-[120px]">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            COMO FUNCIONA
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            DA LIVE AO ENVIO EM 3 PASSOS
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-7 left-[16.67%] right-[16.67%] h-[1px] origin-left"
            style={{
              background: 'linear-gradient(to right, #FF9F1C, #1A1A1A)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className="flex flex-col items-center text-center"
              >
                {/* Step indicator */}
                <div className="w-14 h-14 rounded-full border-2 border-amber flex items-center justify-center relative z-10 bg-dark-bg">
                  <span
                    className="text-amber text-2xl font-bold"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3
                  className="text-white text-[32px] font-semibold mt-6 mb-3"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '-1px',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[#B0B0B0] text-base max-w-[320px]"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
