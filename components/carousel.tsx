"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const router = useRouter();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const autoplayNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setAutoplay(false);
      } else {
        setAutoplay(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (autoplay && emblaApi) {
      autoplayIntervalRef.current = setInterval(autoplayNext, 5000);
    } else if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [autoplay, emblaApi, autoplayNext]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="relative flex-[0_0_100%]" key={index}>
              <div className="relative aspect-[16/9] w-full max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] rounded-lg overflow-hidden">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-end p-2 sm:p-4 md:p-6 lg:p-8 cursor-pointer transition-opacity hover:opacity-90"
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
                onClick={() => router.push(`/event/${slide.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && router.push(`/event/${slide.id}`)}
              >
                <div className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                  {slide.badge && (
                    <Badge variant="secondary" className="mb-1 md:mb-2 text-xs sm:text-sm">
                      {slide.badge}
                    </Badge>
                  )}
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {slide.title}
                  </h2>
                  {!isMobile && (
                    <p className="text-xs sm:text-sm md:text-base text-white/90 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                      {slide.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      size={isMobile ? "xs" : "sm"}
                      className={`font-semibold ${
                        isMobile ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5"
                      }`}
                    >
                      Register Now
                      {!isMobile && <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-2 md:bottom-5 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
              index === selectedIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {!isMobile && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-lg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-lg"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
    </div>
  );
}
