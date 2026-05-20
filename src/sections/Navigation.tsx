import { useEffect, useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 64;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container-main h-full flex items-center justify-between">
        <a
          href="#"
          className="font-display text-lg font-bold tracking-[-0.5px] text-white"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="text-amber">LIVE</span>CONTROL
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[15px] font-medium transition-colors duration-200"
              style={{
                color: activeSection === link.href ? '#FF9F1C' : '#B0B0B0',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== link.href) {
                  (e.target as HTMLElement).style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.href) {
                  (e.target as HTMLElement).style.color = '#B0B0B0';
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-amber text-black px-5 py-2.5 rounded-[8px] text-base font-semibold transition-all duration-200 hover:bg-amber-light hover:scale-[1.02]"
        >
          <MessageCircle size={18} />
          <span className="hidden sm:inline">Fale no WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
