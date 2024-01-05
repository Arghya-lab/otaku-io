import TopNavbar from "../Components/TopNavbar";
import MetaPreviewContainer from "../Components/MetaPreviewContainer";
import EpStreamSheet from "../Components/EpStreamSheet";

function DetailViewPage() {
  const url = "https://images.metahub.space/background/medium/tt0388629/img";

  return (
    <div
      className="h-screen w-screen overflow-hidden relative flex flex-col"
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
      {/* Navbar */}
      {/* <div className="w-screen px-5 h-20 flex items-center justify-between">
        <BackBtn />
        <div className="flex gap-4">
          <MaximizeBtn />
          <UserBtn />
        </div>
      </div> */}
      <TopNavbar />
      {/* Body */}
      <div className="flex">
        <div className="flex-1 ml-16 mt-4">
          <MetaPreviewContainer />
        </div>
        <div
          className="w-[416px] p-8 mx-4 mb-4 relative bg-black bg-opacity-20 rounded-xl"
          style={{ backdropFilter: "blur(15px)" }}>
          <EpStreamSheet />
        </div>
      </div>
    </div>
  );
}

export default DetailViewPage;
