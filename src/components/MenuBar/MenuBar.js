import Tabs from "@material-ui/core/Tabs/Tabs";
import {Link} from "react-router-dom";
import Tab from "@material-ui/core/Tab/Tab";
import React from "react";


class MenuBar extends React.Component {
  render() {
    return (
      <div>
        <Tabs value={false}
              indicatorColor="primary"
              textColor="primary">
          <Tab  component={Link}  to="/" label="Current weather"/>
          <Tab  component={Link}   to="/forecast"label="5 day Forecast"/>
        </Tabs>
      </div>
    );
  }
  }

  export default MenuBar;