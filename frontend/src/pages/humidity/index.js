/* eslint-disable no-import-assign */
// @mui material components
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";

import axios from "axios";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "layout/PageLayout";
import Footer from "components/Footer";

import DefaultLineChart from "components/Charts/LineCharts/DefaultLineChart";

import { useState, useEffect } from "react";

import DataTable from "./components/Tables/DataTable";
import { averageData } from "./helpers/averageData";
import { dataHumi, dataTemp, dataPart } from "./helpers/dataTemplates";
import { dateTransform } from "./helpers/dateTransform";
import StatusSelector from "./helpers/StatusSelector";

function Humidity() {
  // eslint-disable-next-line prefer-const
  let [state, setState] = useState({});
  // eslint-disable-next-line prefer-const
  let [averageTemp, setAverageTemp] = useState(NaN);
  // eslint-disable-next-line prefer-const
  let [averageHumi, setAverageHumi] = useState(NaN);
  // eslint-disable-next-line prefer-const
  let [averagePart, setAveragePart] = useState(NaN);
  // eslint-disable-next-line prefer-const
  let [lastUpdateTemp, setLastUpdateTemp] = useState(NaN);
  // eslint-disable-next-line prefer-const
  let [lastUpdateHumi, setLastUpdateHumi] = useState(NaN);
  // eslint-disable-next-line prefer-const
  let [lastUpdatePart, setLastUpdatePart] = useState(NaN);

  let dataTempTemporal = {};
  let dataHumiTemporal = {};
  let dataPartTemporal = {};

  const refreshGraph = () => {
    axios.get(`http://smt.cesoft.xyz/temp`).then((res) => {
      state = res.data;
      setState({ state });
      dataTempTemporal = res.data.data2;
      lastUpdateTemp = dataTempTemporal.labels[dataTemp.labels.length - 1];
      setLastUpdateTemp(lastUpdateTemp);
      dataTemp = dateTransform(dataTempTemporal);
      averageTemp = averageData(dataTemp);
      setAverageTemp(averageTemp);
    });

    axios.get(`http://smt.cesoft.xyz/humi`).then((res) => {
      state = res.data;
      setState({ state });
      dataHumiTemporal = res.data.data2;
      lastUpdateHumi = dataHumiTemporal.labels[dataHumi.labels.length - 1];
      setLastUpdateHumi(lastUpdateHumi);
      dataHumi = dateTransform(dataHumiTemporal);
      averageHumi = averageData(dataHumi);
      setAverageHumi(averageHumi);
    });

    axios.get(`http://smt.cesoft.xyz/part`).then((res) => {
      state = res.data;
      setState({ state });
      dataPartTemporal = res.data.data2;
      lastUpdatePart = dataPartTemporal.labels[dataPart.labels.length - 1];
      setLastUpdatePart(lastUpdatePart);
      dataPart = dateTransform(dataPartTemporal);
      averagePart = dataPart.datasets[0].data[dataPart.datasets[0].data.length - 1];
      setAveragePart(averagePart);
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshGraph();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  // Solo cambiar DashboardLayout por PageLayout si queremos poner el menu
  return (
    <PageLayout>
      <Container maxWidth={false}>
        <MDBox mt={5} mb={0}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={6}>
              <MDBox pt={0} px={0}>
                <DefaultLineChart
                  icon={{ color: "success", component: "thermostat", fontSize: "small" }}
                  title="SMT IMX3 Temperature"
                  description=""
                  height="auto"
                  chart={dataTemp}
                />
              </MDBox>
            </Grid>
            <Grid item xs={6}>
              <MDBox pt={0} px={0}>
                <DefaultLineChart
                  icon={{ color: "success", component: "shower", fontSize: "small" }}
                  title="SMT IMX3 Humidity"
                  description=""
                  height="auto"
                  chart={dataHumi}
                />
              </MDBox>
            </Grid>
            <Grid item xs={6}>
              <MDBox pt={0} px={0}>
                <DefaultLineChart
                  icon={{ color: "success", component: "coronavirus", fontSize: "small" }}
                  title="SMT IMX3 Particles"
                  description=""
                  height="auto"
                  chart={dataPart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={6}>
              <MDBox pt={0} px={0}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Measurement Unit", accessor: "unit" },
                      { Header: "Average", accessor: "average" },
                      { Header: "Last Update", accessor: "lastupdate" },
                      { Header: "Status", accessor: "status" },
                    ],
                    rows: [
                      {
                        unit: "Temperature",
                        average: averageTemp,
                        lastupdate: lastUpdateTemp,
                        status: <StatusSelector data={dataTemp} />,
                      },
                      {
                        unit: "Humidity",
                        average: averageHumi,
                        lastupdate: lastUpdateHumi,
                        status: <StatusSelector data={dataHumi} />,
                      },
                      {
                        unit: "Particles",
                        average: averagePart,
                        lastupdate: lastUpdatePart,
                        status: <StatusSelector data={dataPart} />,
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </Container>
    </PageLayout>
  );
}

export default Humidity;
