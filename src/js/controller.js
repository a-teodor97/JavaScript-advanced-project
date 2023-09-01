import * as model from "./model.js";
import view from "./views/view.js";

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = view.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    view.renderCityData(model.state.city);

    // we can clear the input now
    view._clearInput();
  } catch (err) {
    console.log(err);
    view.renderErrorMessage();
  }
};

let map;

const controlFirstLoadMap = function () {
  // 1) First load with no marker
  view.drawMap(20.5073359, -0.12765, 2);
};

const controlMap = async function () {
  // 1) Get search query
  const query = view.getQuery();

  // 2) Loading map on the searched city
  await model.getCityCoords(query);
  const { latitude, longitude } = model.state.city;

  // 3) Load the map
  map = view.drawMap(latitude, longitude, 13, true);
};

const init = function () {
  controlFirstLoadMap();
  view.addHandlerSearch(controlSearchResults);
  view.addHandlerSearch(controlMap);
};
init();
