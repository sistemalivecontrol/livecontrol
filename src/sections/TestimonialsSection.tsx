import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'O LiveControl transformou minha operacao. Antes eu perdia vendas porque nao conseguia acompanhar os comentarios. Agora tudo e registrado automaticamente e minhas clientes recebem a cobranca na hora.',
    name: 'Ana Carolina M.',
    role: 'Loja Moda Live, Sao Paulo',
    avatar: '/assets/avatar-ana.jpg',
  },
  {
    quote:
      'A cobranca automatica via WhatsApp e um game changer. Meu indice de inadimplencia caiu 80%. As clientes pagam muito mais rapido quando recebem o link na hora.',
    name: 'Bruna S.',
    role: 'Bazar da Bru, Belo Horizonte',
    avatar: '/assets/avatar-bruna.jpg',
  },
  {
    quote:
      'O formulario de envio com pagamento de frete automatico resolveu meu maior problema. Antes eu tinha que cobrar o frete manualmente. Agora e tudo integrado.',
    name: 'Fernanda R.',
    role: 'Atacado Fashion, Curitiba',
    avatar: '/assets/avatar-fernanda.jpg',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="depoimentos" ref={sectionRef} className="bg-black py-[120px]">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            DEPOIMENTOS
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            O QUE NOSSOS CLIENTES DIZEM
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-surface-dark border border-[#1A1A1A] rounded-[12px] p-10 flex flex-col"
            >
              <Quote
                size={32}
                className="text-amber mb-5"
                style={{ opacity: 0.3 }}
              />

              <p
                className="text-white text-lg italic leading-relaxed mb-6 flex-grow"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                "{testimonial.quote}"
              </p>

              <div className="h-[1px] bg-[#1A1A1A] mb-6" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1A1A1A] shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4
                    className="text-white text-lg font-medium"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className="text-[#555555] text-xs font-medium tracking-[0.5px] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
