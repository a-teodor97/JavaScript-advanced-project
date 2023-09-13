import axios from "axios";
import { get } from "lodash";

export const state = {
  city: {},
};

export const loadSearchResults = async function (city) {
  try {
    const scoresResponse = await axios.get(
      `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
    );
    const imagesResponse = await axios.get(
      `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
    );

    const scoresData = await scoresResponse;
    const imagesData = await imagesResponse;

    console.log(scoresData, imagesData);

    // Destructuring with Lodash _.get()

    const { ...categories } = _.get(scoresData, "data.categories");
    const teleport_city_score = _.get(scoresData, "data.teleport_city_score");
    const summary = _.get(scoresData, "data.summary");
    const image = _.get(imagesData, "data.photos[0].image.web");

    // console.log(categories, teleport_city_score, summary, image);

    state.city = {
      housing: categories[0].score_out_of_10,
      safety: categories[7].score_out_of_10,
      business: categories[6].score_out_of_10,
      cost: categories[1].score_out_of_10,
      healthcare: categories[8].score_out_of_10,
      education: categories[9].score_out_of_10,
      leisure: categories[14].score_out_of_10,
      image: image,
      summary: summary,
      overallScore: teleport_city_score,
    };
  } catch (error) {
    throw error;
  }
};

export const getCityCoords = async function (city) {
  const encodedCity = encodeURIComponent(city);
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/search?city=${encodedCity}&format=json`
    );
    const data = await res;
    console.log(data);
    const { lat: latitude, lon: longitude } = data.data[0];
    // Settings state
    state.city = {
      latitude,
      longitude,
    };
  } catch (error) {
    console.log(error);
  }
};
