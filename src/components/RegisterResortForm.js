import React, { useState, Fragment } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  Snackbar,
  CardMedia,
} from "@material-ui/core";
import {
  MonetizationOn,
  StarBorderOutlined,
  ScheduleOutlined,
  HomeOutlined,
  HotelOutlined,
  PeopleOutline,
  PublishOutlined,
  DoneOutlined,
  WhereToVote,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import { Form, Formik, Field } from "formik";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const RegisterResortForm = () => {
  const [file, setFile] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [imagePreview, setImagePreviewState] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState("");

  const initialValues = {
    name: "",
    rooms: 0,
    capacity: 0,
    rating: 0,
    resortTypeId: 0,
    price: 0,
    thumbnail: null,
  };

  const formData = new FormData();

  const onChange = (e) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setImagePreviewURL(objectURL);
    setImagePreviewState(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          spacing={3}
        >
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <WhereToVote style={{ fontSize: "100", color: "#3f51b5" }} />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h4"
              style={{
                color: "#3f51b5",
                textAlign: "center",
                marginBottom: "2rem",
                fontWeight: "bold",
              }}
            >
              Resort Registration
            </Typography>
          </Grid>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            formData.append("thumbnail", file);
            formData.append("name", values.name);
            formData.append("price", values.price);
            formData.append("rating", values.rating);
            formData.append("resortTypeId", values.resortTypeId);
            formData.append("imageURL", values.imageURL);
            formData.append("rooms", values.rooms);
            formData.append("capacity", values.capacity);
            console.log(formData);

            axios
              .post("http://localhost:5000/api/resort", formData)
              .then((res) => {
                console.log(res.data);
                setAlert("success");
                setAlertMessage("Resort registration complete");
                setOpen(true);
              })
              .catch((error) => {
                console.log(error.request);
                setAlert("error");
                setAlertMessage("Something went wrong");
                setOpen(true);
              });
          }}
        >
          {({ values }) => (
            <Form encType="multipart/form-data">
              <div style={{ flexGrow: 1 }}>
                <Grid container spacing={5} justify="center" direction="row">
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                      <Grid container alignItems="center" direction="row">
                        <Grid item xs={2} sm={1}>
                          <HomeOutlined
                            style={{
                              color: "#3f51b5",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sm={11}
                          style={{ marginBottom: "0.4rem" }}
                        >
                          <label
                            style={{
                              color: "#3f51b5",
                              fontWeight: "bolder",
                            }}
                          >
                            Resort Name
                          </label>
                        </Grid>
                      </Grid>
                      <Field name="name" as={TextField} variant="outlined" />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <Grid container alignItems="center" direction="row">
                        <Grid item xs={2}>
                          <HotelOutlined
                            style={{
                              color: "#3f51b5",
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} style={{ marginBottom: "0.4rem" }}>
                          <label
                            style={{
                              color: "#3f51b5",
                              fontWeight: "bolder",
                            }}
                          >
                            Number of Rooms
                          </label>
                        </Grid>
                      </Grid>
                      <Field
                        name="rooms"
                        as={TextField}
                        type="number"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                      <Grid container alignItems="center" direction="row">
                        <Grid item xs={2}>
                          <PeopleOutline
                            style={{
                              color: "#3f51b5",
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} style={{ marginBottom: "0.4rem" }}>
                          <label
                            style={{
                              color: "#3f51b5",
                              fontWeight: "bolder",
                            }}
                          >
                            Resort Capacity
                          </label>
                        </Grid>
                      </Grid>
                      <Field
                        name="capacity"
                        as={TextField}
                        type="number"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <Grid container alignItems="center" direction="row">
                        <Grid item xs={2} lg={1}>
                          <StarBorderOutlined
                            style={{
                              color: "#3f51b5",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          lg={11}
                          style={{ marginBottom: "0.4rem" }}
                        >
                          <label
                            style={{
                              color: "#3f51b5",
                              fontWeight: "bolder",
                            }}
                          >
                            Resort Rating
                          </label>
                        </Grid>
                      </Grid>
                      <Field
                        name="rating"
                        as={TextField}
                        type="number"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      <Grid container alignItems="center" direction="row">
                        <Grid item xs={2} lg={1}>
                          <ScheduleOutlined
                            style={{
                              color: "#3f51b5",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          lg={11}
                          style={{ marginBottom: "0.4rem" }}
                        >
                          <label
                            style={{
                              color: "#3f51b5",
                              fontWeight: "bolder",
                            }}
                          >
                            Best During
                          </label>
                        </Grid>
                      </Grid>
                      <Field
                        name="resortTypeId"
                        variant="outlined"
                        as={TextField}
                        select
                      >
                        <MenuItem value={1}>Summer</MenuItem>
                        <MenuItem value={2}>Winter</MenuItem>
                      </Field>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4}>
                    <FormControl fullWidth>
                      <Grid container alignItems="center" direction="row">
                        <Grid item xs={2} sm={1} md={2} lg={1}>
                          <MonetizationOn
                            style={{
                              color: "#3f51b5",
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sm={11}
                          md={10}
                          lg={11}
                          style={{ marginBottom: "0.4rem" }}
                        >
                          <label
                            style={{
                              color: "#3f51b5",
                              fontWeight: "bolder",
                            }}
                          >
                            Price
                          </label>
                        </Grid>
                      </Grid>
                      <Field
                        name="price"
                        as={TextField}
                        type="number"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">лв.</InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      container
                      alignItems="center"
                      justify="center"
                      direction="row"
                    >
                      <Grid item xs={12} md={6}>
                        <Fragment>
                          {imagePreview ? (
                            <Card>
                              <CardMedia
                                style={{ height: 0, paddingTop: "56.25%" }}
                                image={imagePreviewURL}
                              />
                            </Card>
                          ) : (
                            <Typography
                              variant="h5"
                              style={{
                                color: "#3f51b5",
                                textAlign: "center",
                                fontWeight: "bold",
                                paddingTop: "2rem",
                                paddingBottom: "2rem",
                              }}
                            >
                              Your thumbnail will appear here
                            </Typography>
                          )}
                        </Fragment>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl fullWidth>
                      <Fragment>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          color="primary"
                          style={{ fontWeight: "bold" }}
                        >
                          <label htmlFor="file-button">
                            <Grid
                              container
                              alignItems="center"
                              justify="center"
                              direction="row"
                              spacing={2}
                            >
                              <Grid
                                item
                                style={{
                                  marginTop: "0.4rem",
                                }}
                              >
                                <PublishOutlined style={{ fontSize: "35" }} />
                              </Grid>
                              <Grid item>Upload Thumbnail</Grid>
                            </Grid>
                          </label>
                        </Button>
                        <input
                          id="file-button"
                          color="primary"
                          accept="image/*"
                          name="thumbnail"
                          type="file"
                          onChange={onChange}
                          style={{ display: "none" }}
                        />
                      </Fragment>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ fontWeight: "bold" }}
                      fullWidth
                      size="large"
                      type="submit"
                    >
                      <Grid
                        container
                        alignItems="center"
                        justify="center"
                        direction="row"
                        spacing={2}
                      >
                        <Grid
                          item
                          style={{
                            marginTop: "0.3rem",
                          }}
                        >
                          <DoneOutlined style={{ fontSize: "35" }} />
                        </Grid>
                        <Grid item>Submit</Grid>
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
                <Snackbar
                  onClose={handleClose}
                  open={open}
                  autoHideDuration={4000}
                  key={alertMessage}
                  anchorOrigin={{ horizontal:"right", vertical:"top"}}
                >
                  <Alert
                    severity={alert}
                    variant="filled"
                    elevation={6}
                    style={{ padding: "1rem 4rem", fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {alertMessage}
                  </Alert>
                </Snackbar>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RegisterResortForm;
