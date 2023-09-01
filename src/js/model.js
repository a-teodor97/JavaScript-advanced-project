export const state = {
  city: {},
};

export const loadSearchResults = async function (city) {
  try {
    const scoresResponse = await fetch(
      `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
    );
    const imagesResponse = await fetch(
      `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
    );
    const scoresData = await scoresResponse.json();
    const imagesData = await imagesResponse.json();

    console.log(scoresData, imagesData);

    const { ...categories } = scoresData.categories;
    state.city = {
      housing: categories[0].score_out_of_10,
      safety: categories[7].score_out_of_10,
      business: categories[6].score_out_of_10,
      cost: categories[1].score_out_of_10,
      healthcare: categories[8].score_out_of_10,
      education: categories[9].score_out_of_10,
      leisure: categories[14].score_out_of_10,
      image: imagesData.photos[0].image.web,
      summary: scoresData.summary,
      overallScore: scoresData.teleport_city_score,
    };
  } catch (error) {
    throw error;
  }
};

export const getCityCoords = async function (city) {
  const encodedCity = encodeURIComponent(city);
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodedCity}&format=json`
    );
    const data = await res.json();
    const { lat: latitude, lon: longitude } = data[0];
    // Settings state
    state.city = {
      latitude,
      longitude,
    };
  } catch (error) {
    console.log(error);
  }
};
