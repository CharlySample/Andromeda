// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "layout/PageLayout";
import Footer from "components/Footer";

import DefaultLineChart from "components/Charts/LineCharts/DefaultLineChart";

import { useState, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
let socket;

let data = {
  labels: [0, 1, 2, 3, 4, 5, 6],
  datasets: [
    {
      label: "Sensor 1",
      color: "success",
      data: [0, 1, 2, 3, 4, 5, 6],
    },
  ],
};

function Temperature() {
  // eslint-disable-next-line prefer-const
  let [state, setState] = useState({});
  // eslint-disable-next-line prefer-const
  let [status, setStatus] = useState("success");

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`http://smt.cesoft.xyz/temp`).then((res) => {
        state = res.data;
        if (data.datasets[1]) {
          if (
            data.datasets[0].data[9] >= 28 ||
            data.datasets[0].data[9] <= 20 ||
            data.datasets[1].data[9] >= 28 ||
            data.datasets[1].data[9] <= 20 ||
            data.datasets[2].data[9] >= 28 ||
            data.datasets[2].data[9] <= 20
          ) {
            status = "error";
          } else {
            status = "success";
          }
        }
        setState({ state });
        setStatus(status);
        data = res.data.data2;
      });
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);
  // Solo cambiar DashboardLayout por PageLayout si queremos poner el menu
  return (
    <PageLayout>
      <MDBox mt={0} mb={0} sx={{ width: 1, height: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={11} lg={11}>
            <Card>
              <MDBox
                color="white"
                bgColor={status}
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={1}
                ml={223}
                p={2}
              >
                Status
              </MDBox>
              <MDBox pt={0} px={0} sx={{ width: 1, height: 1 }}>
                <DefaultLineChart
                  icon={{ color: "success", component: "thermostat", fontSize: "large" }}
                  title="SMT IMX3 Temperature"
                  description=""
                  height="auto"
                  chart={data}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}

export default Temperature;
