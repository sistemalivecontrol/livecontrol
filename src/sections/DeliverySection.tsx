import { useEffect, useRef } from 'react';
import { Link2, User, CreditCard, MapPin, Settings, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Link2,
    title: 'Link Exclusivo para Clientes',
    description:
      'Cada loja possui um link proprio para compartilhamento. Basta enviar para o cliente preencher endereco, contato e dados de entrega. Tudo organizado automaticamente dentro do sistema.',
  },
  {
    icon: User,
    title: 'Cadastro Inteligente',
    description:
      'Ao digitar o CPF, o sistema identifica automaticamente clientes ja cadastrados e preenche nome, WhatsApp, endereco e Instagram. Muito mais rapidez e menos retrabalho.',
  },
  {
    icon: CreditCard,
    title: 'Pagamento de Frete via PIX',
    description:
      'O sistema gera automaticamente QR Code PIX e codigo copia e cola. Confirmacao automatica de pagamento com status em tempo real. Tudo diretamente na pagina de solicitacao.',
  },
  {
    icon: MapPin,
    title: 'Controle de Regioes e Fretes',
    description:
      'Configure valores personalizados para cada regiao. Para areas externas, o sistema informa automaticamente que o orcamento sera enviado via direct.',
  },
  {
    icon: Settings,
    title: 'Personalizacao Completa',
    description:
      'O lojista pode configurar textos, mensagens, prazos, precos e informacoes de envio. Deixe tudo com a identidade visual da sua loja.',
  },
  {
    icon: Mail,
    title: 'Comprovantes por E-mail',
    description:
      'O cliente recebe por e-mail resumo da solicitacao, protocolo, dados do envio e confirmacao do pedido. Mais seguranca e profissionalismo.',
  },
];

export default function DeliverySection() {
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
    <section ref={sectionRef} className="bg-black py-[120px]">
      <div className="container-main">
        <div className="text-center mb-20">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            GESTAO DE ENTREGAS
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
            MUITO ALEM DAS COBRANCAS
          </h2>
          <p
            className="text-[#B0B0B0] text-lg mt-6 mx-auto max-w-[600px]"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}
          >
            Nosso sistema tambem conta com um modulo completo de solicitacao e
            gerenciamento de entregas. Tudo automatizado, organizado e com uma
            experiencia profissional para o cliente.
          </p>
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
