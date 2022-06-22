/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MuiLink from "@mui/material/Link";

import MDInput from "components/MDInput";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Material Dashboard 2 React example components
import DashboardLayout from "layout/DashboardLayout";
import DashboardNavbar from "layout/DashboardNavbar";
import Footer from "components/Footer";

import MDButton from "components/MDButton";

import { useState } from "react";

import { Toaster, toast } from "react-hot-toast";

import Icon from "@mui/material/Icon";
import axios from "axios";
import moment from "moment";

function Dashboard() {
  const [measurementunit, setmeasurementunit] = useState("");
  const [location, setlocation] = useState("");
  const [value, setValue] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  moment.locale("MT");

  const myClick = (event) => {
    event.preventDefault();
    if (
      !value ||
      !measurementunit ||
      !location ||
      (measurementunit !== "particles" && location === "GENERAL") ||
      (measurementunit === "particles" && location !== "GENERAL")
    ) {
      toast.error("Wrong Data");
    } else if (user != "civanq" || pass !== "quality12") {
      toast.error("User or Pass Incorrect!");
    } else {
      // eslint-disable-next-line prefer-const
      let nowtime = moment().format("lll");
      let baseURL = "http://smt.cesoft.xyz/";
      // eslint-disable-next-line prefer-const
      let nowdate = moment().format("MM/DD/YYYY");
      // eslint-disable-next-line prefer-const
      let myPost = {
        sensor: location,
        time: nowtime,
        data: value,
        date: nowdate,
        type: measurementunit,
      };

      if (measurementunit === "humidity") {
        baseURL += "humi";
      } else if (measurementunit === "temperature") {
        baseURL += "temp";
      } else if (measurementunit === "particles") {
        baseURL += "part";
      }

      axios
        .post(baseURL, myPost)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          toast.success("Data Sent Succesfully");
        })
        .catch((err) => {
          if (err) {
            toast.error("No connection to the server");
          }
        });
    }
  };

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  const handleValue2 = (event) => {
    setUser(event.target.value);
  };

  const handleValue3 = (event) => {
    setPass(event.target.value);
  };

  const handleChange = (event) => {
    setmeasurementunit(event.target.value);
  };

  const handleChange2 = (event) => {
    setlocation(event.target.value);
  };

  return (
    <DashboardLayout>
      <Toaster position="bottom-right" />
      <DashboardNavbar />
      <MDBox mt={1} mb={3} sx={{ width: 1, height: 1 }}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={1}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Manual Data Acquisition
            </MDTypography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="/temperature" variant="body1" color="white">
                  <Icon fontSize="48px">thermostat</Icon>
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="/humidity" variant="body1" color="white">
                  <Icon fontSize="48px">shower</Icon>
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="/particles" variant="body1" color="white">
                  <Icon fontSize="48px">coronavirus</Icon>
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput type="text" label="User" id="user" onChange={handleValue2} fullWidth />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  id="pass"
                  onChange={handleValue3}
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="C, Humidity or Particles Value"
                  id="value"
                  onChange={handleValue}
                  fullWidth
                />
              </MDBox>
              <MDBox mb={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Measurement Unit</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={measurementunit}
                    label="MeasurementUnit"
                    sx={{ height: 40 }}
                    onChange={handleChange}
                  >
                    <MenuItem value="temperature">Temperature</MenuItem>
                    <MenuItem value="humidity">Humidity</MenuItem>
                    <MenuItem value="particles">Particles</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox mb={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Location</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={location}
                    label="location"
                    sx={{ height: 40 }}
                    onChange={handleChange2}
                  >
                    <MenuItem value="AOI">AOI</MenuItem>
                    <MenuItem value="XRAY">XRAY</MenuItem>
                    <MenuItem value="FIS">FIS</MenuItem>
                    <MenuItem value="GENERAL">GENERAL</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1} />
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" onClick={myClick} fullWidth>
                  Post
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
