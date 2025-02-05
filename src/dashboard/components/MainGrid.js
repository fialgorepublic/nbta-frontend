import {Grid, Box, Typography, CssBaseline, Backdrop, CircularProgress} from "@mui/material";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function MainGrid() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/investors-records`)
      .then(function (response) {
        setData(response.data.data);
        setLoader(false)
      })
      .catch(function (error) {
        setLoader(false)
        alert('error', error)
        toast.error(error)
      });
  }, []);

  return (
    <>
     <CssBaseline enableColorScheme />
     {
        loader && (
          <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loader}
        >
          <CircularProgress />
        </Backdrop>
        )
      }
      <Box sx={{ paddingY: "50px" }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <Grid container spacing={5}>
          {data?.map((card, index) => (
            <Grid item xs={12} sm={6} lg={6} key={index}>
              <StatCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
