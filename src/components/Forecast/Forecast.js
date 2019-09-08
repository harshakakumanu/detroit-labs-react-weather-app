/**
 *Forecast - Forecast page for displaying 5 Day 3 hour interval weather data
 */
import React, { Component } from 'react';
import MenuBar from '../MenuBar/MenuBar'
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import { getWeatherData } from '../../services/WeatherService';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class Forecast extends Component {
  state = {
    data: null,
    error: null,
  };

  /**
   *Ajax Call for fetching users current location weather data for 5 days and 3 hour interval.
   */
  componentDidMount() {
    getWeatherData('forecast').then(result => {
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
        <MenuBar/>
        <div>
          <Typography variant="h2">
            {data.city.name}
          </Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell align="right">Icon</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.list.map(date => (
              <TableRow key={date.dt}>
                <TableCell component="th" scope="row">
                  <Moment format={"MMMM Do, h:mm a"}>{date.dt_txt}</Moment>
                </TableCell>
                <TableCell align="right"> <img src={`http://openweathermap.org/img/w/${date.weather[0].icon}.png`} alt={date.weather[0].main} /></TableCell>
                <TableCell align="right"> {date.weather[0].description}</TableCell>
                <TableCell align="right">{Math.floor(date.main.temp)}&deg;F</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}


export default Forecast;
