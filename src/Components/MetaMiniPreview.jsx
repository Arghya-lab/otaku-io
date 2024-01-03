import { Triangle } from "lucide-react";
import SimpleBar from "simplebar-react";

function MetaMiniPreview() {
  const url =
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx145064-oNJZtLWdXtvy.jpg";
  return (
    <div className="w-[416px] p-8 mx-4 mb-4 relative">
      <div className="absolute left-0 right-4 top-0 bottom-0 rounded-[0.75rem]  bg-[#141e30]  overflow-hidden">
        <img className="h-full w-full object-cover opacity-30 blur" src={url} />
      </div>

      <div className="absolute left-0 right-4 top-0 bottom-0 p-8 text-slate-200">
        {/* Meta data */}
        <SimpleBar className="h-[500px]">
          <img
            title="Jujutsu Kaisen Season 2"
            className="h-24 w-2/3 m-auto object-contain"
            src="https://assets.fanart.tv/fanart/tv/377543/hdtvlogo/sorcery-fight-5f2f76df8ce9a.png"
          />
          <div className="mt-4 mr-2 flex items-center justify-between py-3.5 px-1.5 font-semibold">
            <div>24 min</div>
            <div>2023</div>
          </div>
          <p
            className="prose mt-8 mr-4 font-nunito"
            dangerouslySetInnerHTML={{
              __html: `<p >"The second season of <i>Jujutsu Kaisen</i>.<br>\n<br>\nThe past comes to light when second-year students Satoru Gojou and Suguru Getou are tasked with escorting young Riko Amanai to Master Tengen. But when a non-sorcerer user tries to kill them, their mission to protect the Star Plasma Vessel threatens to turn them into bitter enemies and cement their destinies—one as the world’s strongest sorcerer, and the other its most twisted curse user!<br>\n<br>\n(Source: Crunchyroll)"</p>`,
            }}
          />
        </SimpleBar>
        {/* Watch btn */}
        <div
          role="button"
          className="px-4 py-2 w-36 m-auto my-4 bg-white hover:text-[#aeaee4] hover:border-[#aeaee4] bg-opacity-20 border-2 rounded-[45px] flex justify-center gap-2">
          <p className="text-xl font-medium ">Watch</p>
          <div className="rotate-90">
            <Triangle strokeWidth={3} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetaMiniPreview;
