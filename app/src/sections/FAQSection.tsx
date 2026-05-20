import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Preciso instalar algum programa?',
    answer:
      'Nao. O LiveControl funciona 100% na nuvem. Voce acessa pelo navegador do computador ou celular e comeca a usar imediatamente.',
  },
  {
    question: 'Como funciona o reconhecimento de voz?',
    answer:
      'Durante a live, voce fala naturalmente "10 reais, codigo 50, comprador Maria" e o sistema preenche os campos automaticamente. Funciona em portugues brasileiro e tambem permite digitacao com autocomplete inteligente.',
  },
  {
    question: 'Como funciona a cobranca automatica?',
    answer:
      'Apos selecionar a live, o sistema agrupa todas as compras de cada cliente. Ele gera uma mensagem personalizada com nome, valor total, itens comprados e prazo de pagamento. Voce copia e envia pelo Direct do Instagram em segundos.',
  },
  {
    question: 'O PIX e integrado com qual gateway?',
    answer:
      'Oferecemos duas opcoes: PIX via Mercado Pago com QR Code dinamico, ou PIX estatico zero tarifa. Os dois geram QR Code e codigo copia e cola automaticamente.',
  },
  {
    question: 'Como funciona o formulario de entrega?',
    answer:
      'Cada loja tem um link exclusivo. O cliente acessa, digita o CPF (o sistema preenche os dados automaticamente), escolhe a regiao de entrega, visualiza o valor do frete e paga via PIX. Voce recebe tudo organizado para enviar.',
  },
  {
    question: 'Posso usar em qualquer rede social?',
    answer:
      'Sim! O LiveControl funciona independente da plataforma. A cobranca e enviada pelo Instagram Direct, mas voce pode vender pelo Instagram, Facebook, TikTok, YouTube ou WhatsApp.',
  },
  {
    question: 'E se eu tiver duvidas durante uma live?',
    answer:
      'Nosso suporte esta disponivel em horario comercial e voce conta com tutoriais completos. No plano Business, voce tem suporte dedicado 24/7.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim, sem multa nem burocracia. Voce pode cancelar sua assinatura quando quiser diretamente pelo painel.',
  },
  {
    question: 'O pagamento do frete e seguro?',
    answer:
      'Sim. Utilizamos gateways de pagamento certificados e com criptografia SSL. O valor do frete e processado de forma segura e o envio so e liberado apos a confirmacao do pagamento.',
  },
  {
    question: 'Varias pessoas podem usar o sistema?',
    answer:
      'Sim! No plano Business voce tem multiplos usuarios. Cada lojista tem seus dados separados e seguros com controle de acesso individual.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = itemsRef.current.filter(Boolean);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    tl.from(items, {
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="bg-dark-bg py-[120px]">
      <div className="container-main max-w-[800px]">
        <div className="text-center mb-16">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            PERGUNTAS FREQUENTES
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            TIRE SUAS DUVIDAS
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              className="bg-surface-dark border border-[#1A1A1A] rounded-[8px] overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 cursor-pointer text-left"
              >
                <span
                  className="text-white text-base font-semibold pr-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {faq.question}
                </span>
                <Plus
                  size={20}
                  className="text-[#555555] shrink-0 transition-transform duration-300"
                  style={{
                    transform:
                      openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-[400ms] ease-in-out"
                style={{
                  maxHeight: openIndex === index ? '300px' : '0',
                }}
              >
                <p
                  className="text-[#B0B0B0] text-base px-6 pb-6"
                  style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
