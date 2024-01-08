import MetaPreviewContainer from "../Components/MetaPreviewContainer";
import EpStreamSheet from "../Components/EpStreamSheet";
import { useSelector } from "react-redux";
// import UserBtn from "../Components/Ui/UserBtn";
// import BackBtn from "../Components/Ui/BackBtn";
// import MinMaximizeBtn from "../Components/Ui/MinMaximizeBtn";
import TopNavbar from "../Components/TopNavbar";
import SimpleBar from "simplebar-react";

function DetailViewPage() {
  const { imdbInfo } = useSelector((state) => state.content);
  const url = `https://images.metahub.space/background/medium/${imdbInfo?.imdbID}/img`;

  return (
    <div
      className="w-full relative"
      // style={{
      //   background: "linear-gradient(to right,  #141e30, #243b55)",
      // }}
    >
      <div
        className="fixed -z-10 top-0 left-0 right-0 bottom-0 bg-cover bg-[#0f0d20]"
        style={{ backgroundImage: `url(${url})` }}>
        {/* <img className="opacity-30 object-cover" src={url} /> */}
        <div className="bg-black w-full h-full opacity-70"></div>
      </div>
      <SimpleBar className="h-screen">
        <div className="">
          {/* Navbar */}
          {/* <div className="flex-1 w-full px-5 h-20 flex items-center justify-between">
        <BackBtn />
        <div className="flex gap-4">
          <MinMaximizeBtn />
          <UserBtn />
        </div>
      </div> */}
          <TopNavbar />
          {/* Body */}
          <div className="w-full mt-20">
            <div className="pt-4 px-4 xxs:px-8 xs:px-16 sm:pr-48 md:pr-80 lg:pr-[416px]">
              <MetaPreviewContainer />
            </div>
            <div
              className="mx-4 xxs:mx-8 xs:mx-16 my-8 h-full p-8 px-4 bg-black bg-opacity-20 rounded-xl"
              style={{ backdropFilter: "blur(15px)" }}>
              <EpStreamSheet />
            </div>
          </div>
        </div>
      </SimpleBar>
    </div>
  );
}

export default DetailViewPage;
