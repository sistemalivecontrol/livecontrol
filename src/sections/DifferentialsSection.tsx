import { useEffect, useRef } from 'react';
import {
  Mic,
  Zap,
  MessageCircle,
  CreditCard,
  Globe,
  Shield,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const differentials = [
  {
    icon: Mic,
    title: 'Registro por Voz',
    highlight: 'Unico no Brasil',
    description:
      'Fale "10 reais, codigo 50, comprador Maria" e o sistema preenche automaticamente. Suporta portugues brasileiro e reconhecimento continuo. Tambem funciona digitando com autocomplete inteligente.',
  },
  {
    icon: Zap,
    title: 'Economia de Tempo',
    highlight: 'Mais agilidade',
    description:
      'Cobranca rapida, menos erros, atendimento mais profissional. Automatize processos manuais e foque no que realmente importa: vender mais.',
  },
  {
    icon: MessageCircle,
    title: 'Cobranca no Instagram',
    highlight: 'Direct automatico',
    description:
      'Mensagem personalizada com nome, valor, itens e data limite. Envie pelo Direct do Instagram com um clique. Suas clientes pagam muito mais rapido.',
  },
  {
    icon: CreditCard,
    title: 'PIX em 2 Modalidades',
    highlight: 'Mercado Pago + Est.',
    description:
      'PIX via Mercado Pago com QR Code dinamico ou PIX estatico zero tarifa. Verificacao automatica de pagamento. Voce escolhe o que funciona melhor.',
  },
  {
    icon: Globe,
    title: 'Formulario de Entrega',
    highlight: 'Link exclusivo',
    description:
      'Link publico e compartilhavel da sua loja. Cliente digita CPF, escolhe a regiao com preco de frete e paga via PIX. Voce so organiza os envios.',
  },
  {
    icon: Shield,
    title: 'Seguranca e Autenticacao',
    highlight: 'Multi-lojas',
    description:
      'Sistema com login e controle por usuario. Dados completamente separados entre lojistas. Sessoes seguras e protecao de acesso individual.',
  },
];

export default function DifferentialsSection() {
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
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-[120px]">
      <div className="container-main">
        <div className="text-center mb-20">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            DIFERENCIAIS
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4 mx-auto"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              maxWidth: 800,
            }}
          >
            POR QUE O LIVECONTROL E DIFERENTE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="relative bg-surface-dark border border-[#1A1A1A] rounded-[12px] p-8 transition-all duration-500 hover:border-amber/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,159,28,0.1)]"
              >
                <span className="absolute -top-3 left-6 bg-amber text-black text-[11px] font-semibold tracking-[0.5px] uppercase px-3 py-1 rounded-full">
                  {item.highlight}
                </span>
                <Icon size={44} className="text-amber mb-5 mt-2" />
                <h4
                  className="text-white text-xl font-medium mb-3"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-[#B0B0B0] text-base leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
