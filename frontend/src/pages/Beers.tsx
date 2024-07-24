import { useCookies } from "react-cookie";
import BeerCard from "../components/BeerCard";
import Button from "../components/Button";
import { useGetBeers } from "../hooks/useGetBeers";

export interface IBeer {
  tap_id: number;
  price_ml: number;
  beer_id: number;
  beer_name: string;
  beer_style: string;
  beer_description: string;
  beer_alcohol: number;
  beer_ibu: number;
  brewery: string;
  brewery_image: string;
  beer_image: string;
}

const Beers = () => {
  const [, , removeCookies] = useCookies();

  const { beers, error, isPending } = useGetBeers();

  if (isPending) return <p>Loading beers</p>;

  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <div className="mt-2 text-center">
        <Button
          onClick={() => {
            removeCookies("token");
          }}
        >
          Log out
        </Button>
      </div>
      <div className="mx-10 grid grid-cols-1 gap-6 p-4 transition-all duration-200 sm:grid-cols-2 lg:grid-cols-3">
        {beers.info.data.map((beer: IBeer) => (
          <BeerCard key={beer.tap_id} {...beer} />
        ))}
      </div>
    </>
  );
};

export default Beers;
