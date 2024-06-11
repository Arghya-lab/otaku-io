import EpBtnSheet from "@/components/EpBtnSheet";
import TopNavbar from "@/components/TopNavbar";
import { getDetailInfo } from "@/services/getAnime";
import { getImdbInfo } from "@/services/getImdbInfo";
import MetaPreviewContainer from "./MetaPreviewContainer";

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
    <div className="relative w-full">
      <div
        className="fixed -z-10 h-screen w-screen bg-transparent bg-cover bg-center"
        style={
          imdbInfo
            ? {
                backgroundImage: `url(https://images.metahub.space/background/medium/${imdbInfo.imdbID}/img)`,
              }
            : {}
        }
      >
        <div className="h-full w-full bg-black opacity-70" />
      </div>
      <TopNavbar bgColor={detailInfo?.color || "#000"} />
      {/* Body */}
      <div className="mt-20 w-full">
        <div className="px-4 pt-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
          <MetaPreviewContainer detailInfo={detailInfo} imdbInfo={imdbInfo} />
        </div>
        <div
          className="mx-4 my-8 h-full rounded-xl bg-black bg-opacity-20 p-8 px-4 xxs:mx-8 xs:mx-16"
          style={{ backdropFilter: "blur(15px)" }}
        >
          <EpBtnSheet detailInfo={detailInfo} isDubEnable={isDub} />
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
