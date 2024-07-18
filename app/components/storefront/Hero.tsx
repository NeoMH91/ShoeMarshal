import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import prisma from "@/app/lib/db";
import Image from "next/image";

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function Hero() {
  const data = await getData();
  console.log(data);

  //   JSX
  return (
    <Carousel>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[60vh] lg:h-[80vh]">
              <Image
                src={item.imageString}
                alt="alt"
                fill
                className="object-cover w-full h-full rounded-xl"
              />
              <div className="absolute top-6 left-6 bg-black rounded-xl shadow-lg text-white p-6 bg-opacity-75 transition-transform hover:scale-105">
                <h1 className="text-xl lg:text-3xl font-bold">{item.title}</h1>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
