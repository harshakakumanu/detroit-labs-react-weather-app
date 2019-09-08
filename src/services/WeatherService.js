/**
 *To construct URL from User's Location
 */
export const getWeatherData = async type => {
  try {
    const { latitude, longitude } = await getCurrentLocation();
    return {
      url: `https://api.openweathermap.org/data/2.5/${type}?lat=${latitude}&lon=${longitude}&APPID=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=imperial`,
    };
  } catch (error) {
    return { error };
  }
};

/**
 *Getting users current location
 */
export const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    if (navigator.geolocation) {
      const options = {timeout: 10000};
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          reject("Error ! Please try again later");
        },
        options
      );
    } else {
      reject("Error getting Location");
    }
  });
};

