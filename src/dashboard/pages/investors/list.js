import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function AllInvestors() {
  const [loader, setLoader] = useState(false);
  const [investors, setInvestors] = useState([]);

  const handleDeleteClick = (id) => {
    setLoader(true);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}/delete`)
      .then(function (response) {
        const users = investors.filter((investor) => investor._id != id);
        setInvestors(users);
        setLoader(false);
        toast.success("Investor Deleted Successfully");
      });
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/all-investors`)
      .then(function (response) {
        setInvestors(response.data.data);
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        toast.error(error);
      })
      .finally(function () {});
  }, []);
  const columns = [
    { field: "first_name", headerName: "First Name", flex: 1.5, minWidth: 100 },
    { field: "last_name", headerName: "Last Name", flex: 1.5, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 250 },
    { field: "balance", headerName: "Balance", flex: 1.5, minWidth: 80 },
    { field: "kyc_status", headerName: "KYC Status", flex: 1.5, minWidth: 80 },
    {
      headerName: "Actions",
      width: 270,
      renderCell: (params) => (
        <>
          <span
            style={{
              pointerEvents:
                params.row.kyc_status === "NotStarted" ? "none" : "",
            }}
          >
            <Link to={`${params.id}/verify-kyc`}>
              <Button
                variant="contained"
                color="success"
                size="small"
                style={{ marginRight: 10 }}
                disabled={params.row.kyc_status === "NotStarted" ? true : false}
                sx={{
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                }}
              >
                Verify KYC
              </Button>
            </Link>
          </span>
          <Link to={`${params.id}/edit`}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>NBTA DX - Investors</title>
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
        <Stack
          direction="row"
          spacing={2}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            All Investors
          </Typography>

          <Link to={"/investors/new"}>
            <Button variant="contained">New Investor</Button>
          </Link>
        </Stack>
        <DataGrid
          autoHeight
          sx={{ marginTop: "30px" }}
          rows={investors}
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
