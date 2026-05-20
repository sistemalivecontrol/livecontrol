import { MessageCircle, Mail, MapPin } from 'lucide-react';

const productLinks = [
  'Funcionalidades',
  'Planos e Precos',
  'Demonstracao',
  'Atualizacoes',
];

const supportLinks = [
  'Central de Ajuda',
  'Tutoriais',
  'Contato',
  'Status do Sistema',
];

export default function Footer() {
  return (
    <footer
      className="border-t border-[#1A1A1A] pt-20 pb-10"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="container-main">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="font-display text-lg font-bold tracking-[-0.5px] text-white inline-block mb-5"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-amber">LIVE</span>CONTROL
            </a>
            <p
              className="text-[#555555] text-base leading-relaxed max-w-[280px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              A plataforma completa para gestao de vendas em live. Registre
              vendas, envie cobrancas e gerencie envios em um so lugar.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {/* Instagram */}
              <a
                href="#"
                className="text-[#555555] hover:text-amber transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                className="text-[#555555] hover:text-amber transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                className="text-[#555555] hover:text-amber transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Produto */}
          <div>
            <h4
              className="text-white text-sm font-medium tracking-[0.5px] uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              PRODUTO
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#555555] text-base hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Suporte */}
          <div>
            <h4
              className="text-white text-sm font-medium tracking-[0.5px] uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              SUPORTE
            </h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#555555] text-base hover:text-white transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contato */}
          <div>
            <h4
              className="text-white text-sm font-medium tracking-[0.5px] uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              CONTATO
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <MessageCircle size={16} className="text-[#555555]" />
                <span
                  className="text-[#555555] text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  +55 11 99999-9999
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#555555]" />
                <span
                  className="text-[#555555] text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  contato@livecontrol.com.br
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#555555]" />
                <span
                  className="text-[#555555] text-base"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Sao Paulo, Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[#555555] text-xs font-medium tracking-[0.5px]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            2025 LiveControl. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="text-[#555555] text-xs font-medium tracking-[0.5px] hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Termos de Uso
            </a>
            <span className="text-[#555555]">|</span>
            <a
              href="#"
              className="text-[#555555] text-xs font-medium tracking-[0.5px] hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Politica de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
