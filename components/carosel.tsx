'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel, { type EmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

// Types
interface CarouselSlideProps {
  gradient: {
    id: number;
    className: string;
  };
}

interface CarouselDotsProps {
  slides: Array<{ id: number }>;
  selectedIndex: number;
  onDotClick: (index: number) => void;
}

// Data
const gradientImages = [
  {
    id: 1,
    className: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
  },
  {
    id: 2,
    className: "bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-400"
  },
  {
    id: 3,
    className: "bg-gradient-to-br from-rose-600 via-amber-500 to-yellow-400"
  }
] as const;

// Carousel Dots Component
function CarouselDots({ slides, selectedIndex, onDotClick }: CarouselDotsProps) {
  return (
    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "h-1.5 rounded-full bg-white transition-all",
            selectedIndex === index ? "w-4 opacity-100" : "w-1.5 opacity-50 hover:opacity-75"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

// Carousel Slide Component
function CarouselSlide({ gradient }: CarouselSlideProps) {
  return (
    <div className="relative flex h-full w-full flex-none flex-col items-center justify-center">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          gradient.className
        )}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome Back
        </h1>
        <p className="max-w-[600px] text-lg text-white/90 sm:text-xl">
          Sign in to manage your events and connect with your community
        </p>
      </div>
    </div>
  );
}

// Main Carousel Component
export default function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ stopOnInteraction: false, delay: 5000 })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
    
    // Pause autoplay when tab is not visible
    const handleVisibilityChange = () => {
      const autoplay = emblaApi.plugins().autoplay;
      if (!autoplay) return;

      if (document.hidden) {
        autoplay.stop();
      } else {
        autoplay.play();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative h-full w-full overflow-hidden" ref={emblaRef}>
      <div className="flex h-full touch-pan-y">
        {gradientImages.map((gradient) => (
          <CarouselSlide key={gradient.id} gradient={gradient} />
        ))}
      </div>
      <CarouselDots
        slides={gradientImages}
        selectedIndex={selectedIndex}
        onDotClick={scrollTo}
      />
    </div>
  );
}

