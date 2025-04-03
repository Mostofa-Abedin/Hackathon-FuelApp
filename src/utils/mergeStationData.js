export const mergeStationData = (stations = [], prices = []) => {
    return stations.map((station) => {
      const priceInfo = prices.find((price) => price.stationcode === station.code);
      return {
        ...station,
        price: priceInfo ? priceInfo.price : "N/A",
      };
    });
  };
  