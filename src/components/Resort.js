import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";


const Resort = props => {
  return (
    <div>
      {props.resort ? (
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={require('../images/'+props.resort.thumbnail)}
            title={props.resort.name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h4"
              component="h4"
              style={{ marginTop: "2%" }}
            >
              {props.resort.name}
            </Typography>
            <Grid container>
              <Grid container direction="column" xs={12} sm={6}>
                <Grid item>
                  <Typography variant="h6" component="h6">
                    Suitable for : {props.resort.resortType.name}
                  </Typography>

                  <Typography variant="h6" component="h6">
                    Capacity : {props.resort.capacity}
                  </Typography>

                  <Typography variant="h6" component="h6">
                    Number of Rooms : {props.resort.rooms}
                  </Typography>

                  <Typography variant="h6" component="h6">
                    Rating : {props.resort.rating} / 5
                  </Typography>

                  <Typography variant="h6" component="h6">
                    Price : {props.resort.price} лв.
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                direction="column"
                spacing={3}
                xs={12}
                sm={6}
                justify="center"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ fontWeight: "bold" }}
                    size="large"
                    fullWidth
                  >
                    Details
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ fontWeight: "bold" }}
                    size="large"
                    fullWidth
                    onClick={() => {
                      axios.delete("http://localhost:5000/api/resort/" + props.resort.id)
                        .then((res) => {
                          props.updateResortList();
                          console.log(res);
                        });
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default Resort;
