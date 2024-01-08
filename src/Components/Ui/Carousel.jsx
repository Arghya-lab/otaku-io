import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";

function Carousel() {
  const { trending } = useSelector((state) => state.content);

  const items = trending.slice(0, 6).map((data, id) => (
    <div key={id} className="flex items-center">
      <img
        key={id}
        className="w-full aspect-[3/1] xxs:aspect-[4/1] object-cover"
        src={data?.cover}
        alt="Cover"
      />
    </div>
  ));

  const info = trending.slice(0, 6).map((data) => ({
    description: data?.description || "",
    color: data?.color || "#000",
  }));

  return (
    <div
      className="mb-8 opacity-80 shadow-2xl pb-36 pt-4 px-8 2xl:pb-52"
      style={{}}>
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay={true}
        autoPlayStrategy={"none"}
        infinite={true}
        animationDuration={1000}
        autoPlayInterval={1000}
        disableSlideInfo={false}
        disableButtonsControls={true}
        disableDotsControls={true}
        renderKey={34}
        renderSlideInfo={({ item }) => {
          return (
            <div className="relative">
              <p
                className="absolute -bottom-36 2xl:-bottom-52 left-0 right-0 p-4 h-32 2xl:h-48 prose text-white font-nunito text-xs 2xl:text-lg bg-black rounded-xl"
                dangerouslySetInnerHTML={{
                  __html: `<p style="overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 6;">${
                    info[item - 1]?.description || ""
                  }</p>`,
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
}

export default Carousel;
