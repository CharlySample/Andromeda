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

// Material Dashboard 2 React example components
import DashboardLayout from "layout/DashboardLayout";
import DashboardNavbar from "layout/DashboardNavbar";
import Footer from "components/Footer";

import DefaultLineChart from "components/Charts/LineCharts/DefaultLineChart";

import { useState, useEffect } from "react";

function Particles() {
  const data = {
    labels: ["7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45"],
    datasets: [
      {
        label: "Sensor 1",
        color: "success",
        data: [21, 22, 23, 28, 21, 25, 30],
      },
    ],
  };

  const [graphReload, setGraphReload] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will run every second!");
      setGraphReload(!graphReload);
    }, 10000);
    return () => clearInterval(interval);
  }, [graphReload]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3} sx={{ width: 1, height: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox pt={2} px={2} sx={{ width: 1, height: 1 }}>
                <DefaultLineChart
                  icon={{ color: "success", component: "coronavirus", fontSize: "large" }}
                  title="SMT IMX3 Particles"
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
    </DashboardLayout>
  );
}

export default Particles;
