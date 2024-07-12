import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
  try {
    //get city name from params
    const city = req.params.city;

    //get any of the filtering, sorting and Page options if there are available.

    //as string = casting as string
    const searchQuery = (req.query.searchQuery as string) || "";
    //this in backend will be comma separated string
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    //ignore case(case-insensitive)- london=London=LONDON
    query["city"] = new RegExp(city, "i"); //RegExp ex- { city: /London/i }
    //search Restaurant documents for the given query/city
    //going to return a number of restaurants
    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      //keeping the api responses consistent
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    //From here we have restaurants available in the city.
    //We can start applying rest of these filters if they exist to our query object

    if (selectedCuisines) {
      //selectedCuisines=italian,burgers,chinese
      //after split-> [italian,burgers,chinese]
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      //returns all the found out mongoDB documents as part of query
      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      //restaurantName = Pizza Palace
      //cuisines = [pizza, pasta, burger]
      //searchQuery= Pasta
      // restaurantName doesnt matches then it will move to that restaurant cusinies. One of the cuisine matches so it will return that restaurant.
      query["$or"] = [
        { restaurantName: searchRegex }, //for each of the restaurant in the DB check the restaurant name if it matches with regex  ----OR----
        { cuisines: { $in: [searchRegex] } }, //check for any cusinies in the restaurants(will check cusinies of all the restaurants) if it match with the regex
      ];
    }

    //no. of results to UI per page
    const pageSize = 10;
    //how many records in the search results to skip based on the page number we are currently on.
    //Ex- if we are on page 2 then skip = (2-1)*10. So, we will skip first 10 result
    const skip = (page - 1) * pageSize;

    //ex- sortOption = "lastUpdated", sortOption is dynamic we will get it from "req object"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 }) //1 is ascending -1 is descending
      .skip(skip)
      .limit(pageSize)
      .lean(); //strip out all the mongoose metadata.

    //count of all the documents based on the query/how many total Pages there are for that query.
    const total = await Restaurant.countDocuments(query);

    //In REST, when we return paginated response, its good idea to return pagination data along with the response.
    const response = {
      //keeping the api responses consistent
      data: restaurants,
      pagination: {
        total,
        page, //current page we are on
        pages: Math.ceil(total / pageSize), //50 results, pageSize=10, then pages = 5
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  searchRestaurant,
};
