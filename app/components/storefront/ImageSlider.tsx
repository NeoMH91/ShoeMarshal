"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: string[];
}

export function ImageSlider({ images }: iAppProps) {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // If previous index is 0, the number when btn is clicked will be 4, meaning last image of array will be rendered
  function handlePreviousClick() {
    setMainImageIndex((currentNumber) =>
      currentNumber === 0 ? images.length - 1 : currentNumber - 1
    );
  }

  function handleNextClick() {
    setMainImageIndex((currentNumber) =>
      currentNumber === images.length - 1 ? 0 : currentNumber + 1
    );
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index);
  }

  // Render 1 Big image, with 5 small images below
  return (
    <div className="grid gap-6 md:gap-3 items-start">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={images[mainImageIndex]}
          alt="alt"
          width={600}
          height={600}
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={handlePreviousClick} variant={"ghost"} size={"icon"}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button onClick={handleNextClick} variant={"ghost"} size={"icon"}>
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            className={cn(
              index === mainImageIndex
                ? "border-2 border-primary"
                : "border border-gray-200",
              "relative overflow-hidden rounded-lg"
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image}
              alt="alt"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
