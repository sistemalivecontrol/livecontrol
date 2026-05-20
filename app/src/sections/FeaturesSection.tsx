import { useEffect, useRef } from 'react';
import {
  Tv,
  Users,
  ShoppingBag,
  Instagram,
  QrCode,
  LayoutDashboard,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Tv,
    title: 'Gestao Completa das Lives',
    description:
      'Selecao e organizacao das lives por data. Visualizacao rapida de todas as lives realizadas com controle de status. Resumo automatico de vendas e valores de cada live.',
  },
  {
    icon: Users,
    title: 'Controle Inteligente de Clientes',
    description:
      'Listagem automatica de compradores com cadastro completo. Armazene nome, CPF, WhatsApp, Instagram e e-mail. Historico organizado por live e busca rapida por nome, CPF ou regiao.',
  },
  {
    icon: ShoppingBag,
    title: 'Organizacao dos Pedidos',
    description:
      'Visualizacao detalhada dos itens comprados com quantidade de pecas por cliente. Valor total automatico e conferencia rapida antes da cobranca.',
  },
  {
    icon: Instagram,
    title: 'Cobranca Automatica via Instagram',
    description:
      'Geracao automatica de mensagens personalizadas com nome do cliente, valor total, itens comprados e prazo de pagamento. Abertura rapida do perfil do cliente. Copiar e enviar em poucos segundos.',
  },
  {
    icon: QrCode,
    title: 'Integracao com PIX',
    description:
      'Geracao de cobranca PIX com QR Code automatico e codigo copia e cola. PIX estatico zero tarifa e integracao com Mercado Pago. Acompanhamento do status do pagamento em tempo real.',
  },
  {
    icon: LayoutDashboard,
    title: 'Painel Inteligente',
    description:
      'Total de clientes, valor total vendido e clientes selecionados em tempo real. Controle completo da operacao com estatisticas atualizadas automaticamente.',
  },
];

export default function FeaturesSection() {
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
    <section
      id="funcionalidades"
      ref={sectionRef}
      className="bg-black py-[120px]"
    >
      <div className="container-main">
        <div className="text-center mb-20">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            PRINCIPAIS FUNCIONALIDADES
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
            TUDO O QUE VOCE PRECISA EM UM UNICO SISTEMA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="bg-surface-dark border border-[#1A1A1A] rounded-[12px] p-10 transition-all duration-500 hover:border-amber/30 hover:-translate-y-1 hover:shadow-card"
              >
                <Icon size={48} className="text-amber mb-6" />
                <h4
                  className="text-white text-2xl font-medium mb-3"
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  className="text-[#B0B0B0] text-base leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
