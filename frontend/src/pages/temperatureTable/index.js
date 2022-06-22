// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "layout/DashboardLayout";
import DashboardNavbar from "layout/DashboardNavbar";
import Footer from "components/Footer";

import DataTable from "examples/Tables/DataTable";

import { useState, useEffect } from "react";
import axios from "axios";

function TemperatureTable() {
  let data = [];

  // eslint-disable-next-line prefer-const
  let [state, setState] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get(`http://smt.cesoft.xyz/temp/table`).then((res) => {
        state = res.data.temps;
        setState({ state });
        data = state;
        console.log(data);
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3} sx={{ width: 1, height: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card>
              <MDBox pt={2} px={2} sx={{ width: 1, height: 1 }}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "sensor", accessor: "sensor", width: "25%" },
                      { Header: "time", accessor: "time", width: "30%" },
                      { Header: "data", accessor: "data" },
                      // { Header: "age", accessor: "age", width: "12%" },
                    ],
                    rows: data,
                  }}
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

export default TemperatureTable;
