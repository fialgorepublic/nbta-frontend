import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
  CssBaseline
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function AllInvestments() {
  const [investments, setInvestments] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/investments/list`)
      .then(function (response) {
        setLoader(false);
        setInvestments(response.data.data);
      })
      .catch(function (error) {
        setLoader(false);
        toast.error(error);
      })
      .finally(function () {});
  }, []);

  const columns = [
    { field: "investor", headerName: "Investor", flex: 1.5, minWidth: 100 },
    { field: "amount", headerName: "Amount", flex: 1.5, minWidth: 100 },
    { field: "createdAt", headerName: "Date", flex: 1.5, minWidth: 200 },
  ];

  return (
    <>
      <Helmet>
        <title>NBTA DX - Investments </title>
      </Helmet>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          width: "100%",
          marginTop: "40px",
          maxWidth: { sm: "100%", md: "1700px" },
        }}
      >
        {loader && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={loader}
          >
            <CircularProgress />
          </Backdrop>
        )}
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            All Investments
          </Typography>

          <Link to={"/investments/new"}>
            <Button variant="contained">New Investment</Button>
          </Link>
        </Stack>
        <DataGrid
          autoHeight
          sx={{ marginTop: "30px" }}
          //   checkboxSelection
          rows={investments}
          columns={columns}
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          slotProps={{
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: {
                  variant: "outlined",
                  size: "small",
                },
                columnInputProps: {
                  variant: "outlined",
                  size: "small",
                  sx: { mt: "auto" },
                },
                operatorInputProps: {
                  variant: "outlined",
                  size: "small",
                  sx: { mt: "auto" },
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: "outlined",
                    size: "small",
                  },
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
}
