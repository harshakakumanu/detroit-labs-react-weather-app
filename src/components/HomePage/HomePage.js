/**
 *Homepage - Root page for displaying user current weather conditions
 */
import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { getWeatherData } from '../../services/WeatherService';
import MenuBar from '../MenuBar/MenuBar'
import Typography from "@material-ui/core/Typography/Typography";
class HomePage extends Component {
  state = {
    data: null,
    error: null,
  };

  /**
   *Ajax Call for fetching users current location weather data.
   */
  componentDidMount() {
    getWeatherData('weather').then(result => {
      const { error, url } = result;
      if (error) {
        this.setState({ error });
      } else {
        fetch(url).then(async response => {
          const data = await response.json();
          this.setState({ data });
        });
      }
    });
  }
  render() {
    const { data, error } = this.state;
    if (!data && !error) {
      return <CircularProgress/>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <Paper>
          <MenuBar/>
          <div style={styles.container}>
            <Typography variant="h1">
              {data.name}
            </Typography>
            <Typography variant="h2">{Math.floor(data.main.temp)}&deg;F</Typography>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt={data.weather[0].main} />
            {data.weather[0].description}
             <Typography variant="h6">
              Low : {Math.floor(data.main.temp_min)}&deg;F
            </Typography>
            <Typography variant="h6">
              High : {Math.floor(data.main.temp_max)}&deg;F
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }
}
/**
 *Styles
 */
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
};

export default HomePage;
