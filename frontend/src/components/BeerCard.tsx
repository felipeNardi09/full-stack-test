import { IBeer } from "../pages/Beers";

export default function BeerCard(beer: IBeer) {
  const {
    beer_alcohol,
    beer_description,
    beer_ibu,
    beer_image,
    beer_name,
    beer_style,
    brewery,
    brewery_image,
    price_ml,
  } = beer;

  return (
    <div className="grid grid-cols-[.3fr_.7fr] rounded-lg p-2 text-sm ring-2 transition-all duration-200 hover:scale-[101%]">
      <div>
        <img className="h-full object-cover" src={beer_image} alt={beer_name} />
      </div>
      <div className="text-md flex flex-col justify-around px-3 text-left">
        <h2 className="self-center text-xl font-bold">{beer_name}</h2>
        <img
          className="max-w-16 self-center"
          src={brewery_image}
          alt={brewery}
        />
        <div>
          <p>
            <span className="font-semibold">Style:</span> {beer_style}
          </p>
          <p>
            <span className="font-semibold">Brewery:</span> {brewery}
          </p>
          <p>
            <span className="font-semibold">Alcohol:</span> {beer_alcohol}%
          </p>
          <p>
            <span className="font-semibold">IBU:</span> {beer_ibu}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Description:</span>{" "}
            {beer_description}
          </p>
          <p className="text-center text-lg">
            <span className="font-semibold">Price per ml:</span> ${price_ml}
          </p>
        </div>
      </div>
    </div>
  );
}
