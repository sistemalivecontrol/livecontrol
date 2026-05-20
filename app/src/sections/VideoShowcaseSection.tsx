import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(section.querySelector('.video-container'), {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeoutRef.current !== null) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <section ref={sectionRef} className="bg-dark-bg py-[120px]">
      <div className="container-main">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p
            className="text-amber text-sm font-medium tracking-[0.5px] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            VEJA EM ACAO
          </p>
          <h2
            className="text-white font-display font-bold uppercase mt-4"
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            A SIMPLICIDADE QUE VOCE PRECISA
          </h2>
        </div>

        {/* Video Container */}
        <div
          className="video-container relative max-w-[960px] mx-auto aspect-video bg-surface-dark rounded-[16px] border border-[#1A1A1A] overflow-hidden cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/dashboard-preview.jpg"
          >
            <source src="/assets/dashboard-demo.mp4" type="video/mp4" />
          </video>

          {/* Play/Pause Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{ opacity: showControls ? 1 : 0 }}
          >
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all duration-200 pointer-events-auto"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {isPlaying ? (
                <Pause size={28} className="text-white" />
              ) : (
                <Play size={28} className="text-white ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
