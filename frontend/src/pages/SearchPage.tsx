import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  //results will have data and pagenation data
  const { results } = useSearchRestaurants(city);
  return (
    <span>
      {city}
      <span>
        {results?.data.map((restaurant) => (
          <span>
            {" "}
            found - {restaurant.restaurantName}, {restaurant.city}{" "}
          </span>
        ))}
      </span>
    </span>
  );
};

export default SearchPage;
