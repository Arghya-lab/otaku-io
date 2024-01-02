import { popularAnime } from "../Api/animeApi";

function HomePage() {
  return (
    <div>
      <p
        className="text-xl "
        onClick={async () => {
          console.log(await popularAnime.data);
        }}>
        Hlo world
      </p>
    </div>
  );
}

export default HomePage;
