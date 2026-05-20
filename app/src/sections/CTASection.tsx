import { MessageCircle, Check } from 'lucide-react';

const checks = [
  'Cobrancas automatizadas',
  'Gestao de clientes',
  'Solicitacao de entrega online',
  'PIX integrado',
  'Controle de fretes',
  'Organizacao completa das vendas',
];

export default function CTASection() {
  return (
    <section className="bg-black py-[128px] relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 159, 28, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-main relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="text-white font-display font-bold uppercase"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            PRONTO PARA REVOLUCIONAR SUAS LIVES?
          </h2>

          <p
            className="text-[#B0B0B0] mt-6 mb-8 mx-auto"
            style={{
              fontSize: 'clamp(16px, 1.5vw, 20px)',
              lineHeight: 1.6,
              maxWidth: 600,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Menos trabalho manual. Mais controle. Mais organizacao. Mais
            profissionalismo para sua loja. Ideal para lojas, brechos e
            empreendedores que querem profissionalizar suas lives de vendas.
          </p>

          {/* Checks */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {checks.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-surface-dark border border-[#1A1A1A] rounded-full px-5 py-2"
              >
                <Check size={16} className="text-success" />
                <span
                  className="text-[#B0B0B0] text-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber text-black px-12 py-5 rounded-[8px] transition-all duration-200 hover:bg-amber-light hover:shadow-[0_0_40px_rgba(255,159,28,0.3)] hover:scale-[1.03]"
          >
            <MessageCircle size={20} />
            <span
              className="font-bold text-lg"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Falar no WhatsApp
            </span>
          </a>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
            <span
              className="text-[#555555] text-xs font-medium tracking-[0.5px] uppercase"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Resposta em ate 5 minutos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
