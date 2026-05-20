import { ChevronDown, Play } from 'lucide-react';
import ParticleField from '../components/ParticleField';

export default function HeroSection() {
  const scrollToFuncionalidades = () => {
    const el = document.getElementById('funcionalidades');
    if (el) {
      const offset = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] bg-black overflow-hidden"
    >
      <ParticleField />

      <div
        className="absolute bottom-[120px] z-10 max-w-[800px] pointer-events-none"
        style={{ left: 'clamp(24px, 5vw, 64px)' }}
      >
        <p
          className="text-amber text-sm font-medium tracking-[0.5px] uppercase mb-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          SISTEMA DE COBRANCA PARA LIVES DE VENDAS
        </p>

        <h1
          className="text-white font-display font-bold uppercase leading-[0.9] mb-6"
          style={{
            fontSize: 'clamp(36px, 7vw, 80px)',
            letterSpacing: '-3px',
          }}
        >
          AUTOMATIZE SUAS COBRANCAS E GANHE MUITO MAIS TEMPO
        </h1>

        <p
          className="text-[#B0B0B0] mb-10"
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.6,
            maxWidth: 560,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Chega de perder horas cobrando clientes manualmente no direct, organizando pedidos no papel ou conferindo pagamentos um por um. Centralize clientes, pedidos e pagamentos em uma unica plataforma intuitiva e automatizada.
        </p>

        <div className="flex flex-wrap gap-4 pointer-events-auto">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber text-black px-8 py-4 rounded-[8px] text-base font-semibold transition-all duration-200 hover:bg-amber-light hover:shadow-[0_0_40px_rgba(255,159,28,0.3)] hover:scale-[1.02]"
          >
            Comecar Agora
          </a>

          <button
            onClick={scrollToFuncionalidades}
            className="inline-flex items-center gap-2 bg-transparent border border-[#1A1A1A] text-white px-8 py-4 rounded-[8px] text-base font-semibold transition-all duration-200 hover:border-white"
          >
            <Play size={18} />
            Ver Demonstracao
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown size={24} className="text-[#555555] animate-bounce-down" />
      </div>
    </section>
  );
}
