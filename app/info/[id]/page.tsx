import EpBtnSheet from "@/components/EpBtnSheet";
import { getAnimeInfo } from "@/services/getAnime";
import { getImdbInfo } from "@/services/getImdbInfo";
import chroma from "chroma-js";
import classNames from "classnames";
import MetaPreviewContainer from "./MetaPreviewContainer";

async function infoPage({
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

  const [animeInfo, imdbInfo] = await Promise.all([
    getAnimeInfo({ id, isDub }),
    imdbInfoPromise,
  ]);

  return (
    <>
      <div
        className="-xxs:top-16 fixed -top-14 -z-10 h-[calc(100vh+8rem)] w-screen bg-transparent bg-cover bg-center"
        style={{
          backgroundImage: imdbInfo?.imdbID
            ? `url(https://images.metahub.space/background/medium/${imdbInfo.imdbID}/img)`
            : undefined,
        }}
      >
        <div
          className={classNames("h-full w-full", {
            "bg-black opacity-70": imdbInfo?.imdbID,
          })}
          style={{
            backgroundColor:
              !imdbInfo?.imdbID && animeInfo.color
                ? chroma(animeInfo.color).darken(5.2).hex()
                : undefined,
          }}
        />
      </div>
      {/* Body */}
      <div className="mt-20 w-full">
        <div className="px-4 pt-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
          <MetaPreviewContainer animeInfo={animeInfo} imdbInfo={imdbInfo} />
        </div>
        <div
          className="mx-4 my-8 h-full rounded-xl bg-black bg-opacity-20 p-8 px-4 xxs:mx-8 xs:mx-16"
          style={{ backdropFilter: "blur(15px)" }}
        >
          <EpBtnSheet animeInfo={animeInfo} isDubEnable={isDub} />
        </div>
      </div>
    </>
  );
}

export default infoPage;
