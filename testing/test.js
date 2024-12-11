if ("geolocation" in navigator) {
    // Geolocation is supported
  } else {
    // Geolocation is not supported
  }
  

navigator.geolocation.getCurrentPosition((position) => {
    doSomething(position.coords.latitude, position.coords.longitude);
  });
