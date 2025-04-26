'use client'

import { useState, useEffect, useRef } from 'react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useInView } from 'react-intersection-observer'

export function ImageCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [inViewRef, inView] = useInView({
    threshold: 0,
  })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (inView) {
      intervalRef.current = setInterval(() => {
        api?.scrollNext()
      }, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [api, inView])

  const images = [
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920",
    "/placeholder.svg?height=1080&width=1920"
  ]

  return (
    <div ref={inViewRef} className="h-full p-2.5">
      <Carousel setApi={setApi} className="h-full rounded-lg">
        <CarouselContent className="h-full">
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <img
                src={src}
                alt={`Carousel Image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

