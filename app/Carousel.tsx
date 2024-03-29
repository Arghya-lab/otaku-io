"use client";

import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import htmlParse from "html-react-parser";
import useWindowSize from "@/hooks/useWindowSize";
import { AnimeItemType } from "@/types/anime";

function Carousel({ trending }: { trending: AnimeItemType[] }) {
  const { windowWidth } = useWindowSize();

  const items = trending.map((data, id) =>
    data?.cover ? (
      <div key={id} className="flex items-center">
        <Image
          key={id}
          width={960}
          height={540}
          className="w-full aspect-[3/1] xxs:aspect-[4/1] object-cover"
          src={data.cover}
          alt="Cover"
          priority={true}
        />
      </div>
    ) : null
  );

  const lineClampValue = windowWidth >= 640 ? 6 : 3;

  const info = trending.map((data) => ({
    isCoverPresent: !!data?.cover,
    description: data?.description || "",
    color: data?.color || "#000",
  }));

  return (
    <div className="opacity-80 shadow-2xl mb-36 xs:mb-44 mt-4 mx-4 xs:mx-8 2xl:mb-52 bg-transparent">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay={true}
        autoPlayStrategy={"none"}
        infinite={true}
        animationDuration={2000}
        autoPlayInterval={4000}
        disableSlideInfo={false}
        disableButtonsControls={true}
        disableDotsControls={true}
        renderKey={34}
        renderSlideInfo={({ item }) =>
          info[item - 1].isCoverPresent ? (
            <div className="relative">
              <div className="absolute -bottom-[5.5rem] xs:-bottom-36 2xl:-bottom-52 left-0 right-0 p-4 h-20 xs:h-32 2xl:h-48 prose text-white font-nunito text-xs 2xl:text-lg bg-black rounded-xl">
                {htmlParse(`<p style="overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: ${lineClampValue};">${
                  info[item - 1].description || ""
                }</p>`)}
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
}

export default Carousel;
