import MetaPreviewContainer from "./MetaPreviewContainer";
import { getImdbInfo } from "@/services/getImdbInfo";
import { getDetailInfo } from "@/services/getAnime";
import TopNavbar from "@/components/TopNavbar";
import EpBtnSheet from "@/components/EpBtnSheet";
import { AnimeImdbInfoType } from "@/types/anime";

async function DetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const id = decodeURIComponent(params.id);
  const title = decodeURIComponent(searchParams.title || "");
  const isDub = searchParams.dub === "true" ? true : false;

  const imdbInfoPromise = !!title
    ? getImdbInfo(title)
    : Promise.resolve(undefined);

  const [detailInfo, imdbInfo] = await Promise.all([
    getDetailInfo(id, isDub),
    imdbInfoPromise,
  ]);

  return (
    <div className="w-full relative">
      <div
        className="fixed -z-10 w-screen h-screen bg-cover bg-center bg-transparent"
        style={
          imdbInfo
            ? {
                backgroundImage: `url(https://images.metahub.space/background/medium/${imdbInfo.imdbID}/img)`,
              }
            : {}
        }>
        <div className="w-full h-full bg-black opacity-70" />
      </div>
      <TopNavbar bgColor={detailInfo?.color || "#000"} />
      {/* Body */}
      <div className="w-full mt-20">
        <div className="pt-4 px-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
          <MetaPreviewContainer detailInfo={detailInfo} imdbInfo={imdbInfo} />
        </div>
        <div
          className="mx-4 xxs:mx-8 xs:mx-16 my-8 h-full p-8 px-4 bg-black bg-opacity-20 rounded-xl"
          style={{ backdropFilter: "blur(15px)" }}>
          <EpBtnSheet detailInfo={detailInfo} isDubEnable={isDub} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
