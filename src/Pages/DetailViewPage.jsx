import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import TopNavbar from "../Components/TopNavbar";
import MetaPreviewContainer from "../Components/MetaPreviewContainer";
import EpStreamSheet from "../Components/EpStreamSheet";
import { loadDetailInfo, loadImdbInfo } from "../features/content/contentSlice";

function DetailViewPage() {
  const { title, id } = useParams();
  const dispatch = useDispatch();

  const { imdbInfo, detailInfoLoaded, imdbInfoLoaded } = useSelector(
    (state) => state.content
  );
  const { isDubEnabled, theme } = useSelector((state) => state.preference);
  const [enabledDub, setEnabledDub] = useState(isDubEnabled);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChangeSubOrDub = () => {
    dispatch(
      loadDetailInfo({
        id,
        params: { dub: !enabledDub, provider: "gogoanime" },
      })
    ).then(() => setEnabledDub(!enabledDub));
  };

  useEffect(() => {
    setIsLoaded(detailInfoLoaded && imdbInfoLoaded);
  }, [detailInfoLoaded, imdbInfoLoaded]);

  useEffect(() => {
    dispatch(loadImdbInfo({ t: decodeURIComponent(title) }));
    dispatch(
      loadDetailInfo({
        id,
        params: { dub: isDubEnabled, provider: "gogoanime" },
      })
    );
  }, [id, title, isDubEnabled, dispatch]);

  if (!isLoaded) {
    return (
      <div>
        <TopNavbar />
        <div className="w-full pt-48 flex items-center justify-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color={theme.secondaryColor}
            ariaLabel="tail-spin-loading"
            radius="1"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full relative">
        <div
          className="fixed -z-10 w-screen h-screen bg-cover bg-transparent"
          style={{
            backgroundImage: `url(https://images.metahub.space/background/medium/${imdbInfo?.imdbID}/img)`,
          }}>
          <div className="bg-black w-full h-full opacity-70"></div>
        </div>
        <div>
          <TopNavbar />
          {/* Body */}
          <div className="w-full mt-20">
            <div className="pt-4 px-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
              <MetaPreviewContainer />
            </div>
            <div
              className="mx-4 xxs:mx-8 xs:mx-16 my-8 h-full p-8 px-4 bg-black bg-opacity-20 rounded-xl"
              style={{ backdropFilter: "blur(15px)" }}>
              <EpStreamSheet
                modeResponsiveness={false}
                enabledDub={enabledDub}
                setEnabledDub={handleChangeSubOrDub}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailViewPage;
