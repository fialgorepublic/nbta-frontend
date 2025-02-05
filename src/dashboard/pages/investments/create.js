import {
  Box,
  Button,
  CssBaseline,
  FormLabel,
  FormControl,
  Container,
  Grid,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/CustomCard";
import { Helmet } from "react-helmet";
const validationSchema = yup.object({
  investor: yup
    .array()
    .min(1, "Atleast 1 investor")
    .required("Provide at least one investor"),
  amount: yup
    .string("Enter amount")
    .min(1, "Amount is atleast 1")
    .required("Amount is required"),
});

export default function NewInvestment(props) {
  const [investors, setInvestors] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/verify-investors`)
      .then(function (response) {
        setLoader(false);
        setInvestors(response.data.data);
      })
      .catch(function (error) {
        setLoader(false);
        toast.error(error);
      })
      .finally(function () {});
  }, []);

  const formik = useFormik({
    initialValues: {
      investor: [],
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createInvestment(values);
    },
  });

  const createInvestment = (values) => {
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/investments`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setLoader(false);
        navigate("/investments");
        toast.success("Investment created Successfully");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>NBTA DX - Investement</title>
      </Helmet>
      <CssBaseline enableColorScheme />
      <Box sx={{ paddingY: "50px" }}>
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
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={12} lg={7}>
              <CustomCard sx={{ minWidth: 700 }}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
                >
                  Create New Investment
                </Typography>
                <Box
                  component="form"
                  onSubmit={formik.handleSubmit}
                  noValidate
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <FormControl fullWidth>
                    <Box sx={{ marginTop: "15px" }}>
                      <FormLabel sx={{ marginBottom: "8px", display: "block" }}>
                        Investor
                      </FormLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        name="investor"
                        value={formik.values.investor}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.investor &&
                          Boolean(formik.errors.investor)
                        }
                        helperText={
                          formik.touched.investor && formik.errors.investor
                        }
                        sx={{ width: "100%" }}
                      >
                        {investors.map((investor) => (
                          <MenuItem key={investor._id} value={investor._id}>
                            {investor.first_name + " " + investor.last_name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {formik.touched.investor && formik.errors.investor}
                      </FormHelperText>
                    </Box>
                    <Box sx={{ marginTop: "15px" }}>
                      <FormLabel sx={{ marginBottom: "8px", display: "block" }}>
                        Amount
                      </FormLabel>
                      <TextField
                        fullWidth
                        id="last_name"
                        type="number"
                        name="amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.amount && Boolean(formik.errors.amount)
                        }
                        helperText={
                          formik.touched.amount && formik.errors.amount
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        marginTop: "0px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: "50px" }}
                      >
                        Create Investment
                      </Button>
                    </Box>
                  </FormControl>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
