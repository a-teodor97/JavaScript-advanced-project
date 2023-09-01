class view {
  _data = {
    markers: [],
  };
  _qualityEl = document.querySelector(".city");
  _searchBarParentEl = document.querySelector(".search");
  _searchBarEl = document.querySelector(".search-bar");
  _mapEl = document.querySelector("#map");
  _errorMessage =
    "😕Sorry, we have no data about this city, try with another one!";
  _map = null;
  // _query; // used to save query string to memory
  getQuery() {
    const query = this._searchBarEl.value
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-");

    return query;
  }

  _clearInput() {
    this._searchBarEl.value = "";
  }

  addHandlerSearch(handler) {
    this._searchBarParentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  renderCityData(data) {
    // if ((this._searchBarEl.value = "")) return;
    // else {
    this._qualityEl.innerHTML = "";
    this._data = data;
    const city = this._searchBarEl.value;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    const markup = `
      <h3>Standard of living in ${cityName}</h3>
      <img class="city-img" src="${this._data.image}" alt="city image">
      <p class="city-summary">${this._data.summary}</p>
      <div class="scores">
      <p>housing score: ${this._data.housing.toFixed(2)} / 10</p>
      <p>business score: ${this._data.safety.toFixed(2)} / 10</p>
      <p>safety score: ${this._data.business.toFixed(2)} / 10</p>
      <p>cost of living score: ${this._data.cost.toFixed(2)} / 10</p>
      <p>healthcare score: ${this._data.healthcare.toFixed(2)} / 10</p>
      <p>education score: ${this._data.education.toFixed(2)} / 10</p>
      <p>leisure & culture score: ${this._data.leisure.toFixed(2)} / 10</p>
      <p>overall score: ${this._data.overallScore.toFixed(2)} / 100</p>

      </div>
      `;

    this._qualityEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    this._qualityEl.innerHTML = "";

    const markupError = `
    <p class="err-message">${message}</p>
    
  `;
    this._qualityEl.insertAdjacentHTML("afterbegin", markupError);

    this._clearInput();
  }

  drawMap = function (latitude, longitude, zoom, drawMarkers = false) {
    // Remove existing map if it exists
    if (this._map) {
      this._map.remove();
    }
    // Create a new map instance
    this._map = L.map("map").setView([latitude, longitude], zoom);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(this._map);

    if (drawMarkers !== false) {
      const marker = L.marker([latitude, longitude]).addTo(this._map);
      const markercoords = { latitude, longitude };
    }

    return this._map;
  };
}

export default new view();
