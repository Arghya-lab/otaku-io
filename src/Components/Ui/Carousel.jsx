import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";
// import { adjustHue, setLightness } from "polished";

function Carousel() {
  const { trending } = useSelector((state) => state.content);

  const items = trending
    .slice(0, 6)
    .map((data, id) => <img key={id} className="w-full h-72 bg-cover" src={data?.cover} />);

  const info = trending.slice(0, 6).map((data) => ({
    description: data?.description || "",
    color: data?.color || "#000",
  }));

  // const textColor = (idx) => {
  //   const color = info[idx]?.color ? info[idx]?.color : "#000";
  //   return adjustHue(120, setLightness(0.7, color));
  // };

  return (
    <div className="w-[calc(100vw-5rem-4rem)] mx-auto mb-8 opacity-80 shadow-2xl">
      <AliceCarousel
        mouseTracking
        items={items}
        autoPlay={true}
        autoPlayStrategy={"none"}
        infinite={true}
        animationDuration={1000}
        autoPlayInterval={4000}
        disableSlideInfo={false}
        disableButtonsControls={true}
        disableDotsControls={true}
        renderKey={34}
        renderSlideInfo={({ item }) => {
          return (
            <p
              className="prose max-h-24 line-clamp-6 text-white font-nunito"
              // style={{ color: textColor(item - 1) }}
              dangerouslySetInnerHTML={{
                __html: `<p >${info[item - 1]?.description || ""}</p>`,
              }}
            />
          );
        }}
      />
    </div>
  );
}

export default Carousel;
