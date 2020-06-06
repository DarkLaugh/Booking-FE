import React, { Component } from "react";
import axios from "axios";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import Resort from "../components/Resort";

class ResortList extends Component {
  state = {
    resorts: [],
    errorMessage: "",
    loadingStatus: true,
  };

  constructor() {
    super();
    this.getResorts();
  }

  getResorts = () => {
    this.setState({ loadingStatus: true });
    axios
      .get("http://localhost:5000/api/resort")
      .then((res) => {
        this.setState({ resorts: res.data, loadingStatus: false });
      })
      .catch((error) => {
        this.setState({ loadingStatus: false });
        this.setState({ resorts: null });
        console.log("Error occurred while fetching data.");
        if (error.response) {
          if (error.response.status === 404) {
            this.setState({
              errorMessage: error.response.data.errorMessage,
            });
          }
        } else {
          this.setState({
            errorMessage:
              "The service is temporarily unavailable. We are sorry for the inconvenience.",
          });
        }
      });
  };

  updateResorts = () => {
    this.getResorts();
  };

  render() {
    return this.state.loadingStatus ? (
      <div style={{ textAlign: "center", marginTop: "19rem" }}>
        <CircularProgress variant="indeterminate" size={200} thickness={4} />
      </div>
    ) : (
      <div>
        {this.state.resorts ? (
          <div style={{ overflow: "hidden" }}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
              spacing={3}
              style={{ padding: 24 }}
            >
              {this.state.resorts.map((currentResort) => (
                <Grid item xs={12} sm={12} lg={4} xl={4} key={currentResort.id}>
                  <Resort
                    resort={currentResort}
                    updateResortList={this.updateResorts}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <Typography
            variant="h4"
            style={{
              color: "#3f51b5",
              textAlign: "center",
              marginTop: "22rem",
              fontWeight: "bold",
            }}
          >
            {this.state.errorMessage}
          </Typography>
        )}
      </div>
    );
  }
}

export default ResortList;
