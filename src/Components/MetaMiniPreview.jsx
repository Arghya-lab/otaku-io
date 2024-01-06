import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import SimpleBar from "simplebar-react";

function MetaMiniPreview() {
  const navigate = useNavigate();
  const { miniMeta } = useSelector((state) => state.selected);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-[416px] p-8 mx-4 mb-4 relative">
      <div className="absolute left-0 right-4 top-0 bottom-0 rounded-xl  bg-[#141e30]  overflow-hidden">
        <img
          className="h-full w-full object-cover opacity-30 blur"
          src={miniMeta?.image}
        />
      </div>

      <div className="absolute left-0 right-4 top-0 bottom-0 p-8 text-slate-200">
        {/* Meta data */}
        <SimpleBar className="h-[500px]">
          {/* <img
            title={miniMeta?.title?.userPreferred}
            className="h-24 w-2/3 m-auto object-contain"
            src={miniMeta?.image}
          /> */}
          <p
            className="text-3xl font-semibold line-clamp-2 text-center pt-6 pb-4"
            style={{ color: miniMeta?.color || "#fff" }}>
            {miniMeta?.title?.english}
          </p>
          <div className="mt-4 mr-2 flex items-center justify-between py-3.5 px-1.5 font-semibold">
            <div>{miniMeta?.rating}</div>
            <div>{miniMeta?.releaseDate}</div>
          </div>
          <p
            className="prose mt-8 mr-4 font-nunito"
            dangerouslySetInnerHTML={{
              __html: `<p >${miniMeta?.description || ""}</p>`,
            }}
          />
        </SimpleBar>
        {/* Watch btn */}
        <div
          role="button"
          className="px-4 py-2 w-36 m-auto my-4 bg-white hover:text-[#aeaee4] hover:border-[#aeaee4] bg-opacity-20 border-2 rounded-[45px] flex items-center justify-center gap-2"
          style={{
            color: isHovered ? miniMeta?.color || "#fff" : "#fff",
            borderColor: isHovered ? miniMeta?.color || "#fff" : "#fff",
            transition: "color 0.3s, border-color 0.3s",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (miniMeta?.id) {
              const title =
                miniMeta?.title?.english ||
                miniMeta?.title?.romaji ||
                miniMeta?.title?.native ||
                miniMeta?.title?.userPreferred;
              navigate(`/detail/${miniMeta.id}/${title}`);
            }
          }}>
          <p className="text-xl font-medium">Watch</p>
          <Play strokeWidth={3} size={20} />
        </div>
      </div>
    </div>
  );
}

export default MetaMiniPreview;
