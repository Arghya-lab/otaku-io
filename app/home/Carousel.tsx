/* eslint-disable @next/next/no-img-element */
"use client";

// import useWindowSize from "@/hooks/useWindowSize";
import { IAnimeResult } from "@consumet/extensions";
import htmlParse from "html-react-parser";
import AliceCarousel from "react-alice-carousel";

function Carousel({ trending }: { trending: IAnimeResult[] }) {
  // const { windowWidth } = useWindowSize();

  const items = trending.map((data, id) =>
    data?.cover ? (
      <div key={id} className="flex items-center">
        <img
          key={id}
          className="aspect-[3/1] w-full object-cover xxs:aspect-[4/1]"
          src={data.cover}
          alt="Cover"
        />
      </div>
    ) : null
  );

  // const lineClampValue = windowWidth >= 640 ? 6 : 3;

  const info = trending.map((data) => ({
    isCoverPresent: !!data?.cover,
    description: data?.description || "",
    color: data?.color || "#000",
  }));

  return (
    <div className="mx-4 mb-36 mt-4 bg-transparent opacity-80 shadow-2xl xs:mx-8 xs:mb-44 2xl:mb-52">
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
              <div className="prose absolute -bottom-[5.5rem] left-0 right-0 h-20 rounded-xl bg-black p-4 font-barlow text-xs text-white xs:-bottom-36 xs:h-32 2xl:-bottom-52 2xl:h-48 2xl:text-lg">
                {htmlParse(`<p class="clamped-text" style="overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 6;">${info[item - 1].description || ""}</p>`)}
              </div>
            </div>
          ) : null
        }
      />
    </div>
  );
}

export default Carousel;
