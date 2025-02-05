import {
  Box,
  Button,
  CssBaseline,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  FormControl,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Card,
  Select,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
const validationSchema = yup.object({
  earningFor: yup.string("Select Earning for").required("Please select one"),
  earning_type: yup.string("select type").required("please select one"),

  investor: yup.array().when("earningFor", {
    is: (val) => val === "individual",
    then: (schema) =>
      yup.array().min(1, "atleast one").required("* Please Select One."),
    otherwise: (schema) => schema.min(0),
  }),
  return_percentage: yup
    .string("Enter amount")
    .min(1, "Amount is atleast 1")
    .required("Amount is required"),
});

export default function Earning(props) {
  const [investors, setInvestors] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/verify-investors?userInvestments=true`)
      .then(function (response) {
        setInvestors(response.data.data);
        setLoader(false);
      })
      .catch(function (error) {
        toast.error(error);
      })
      .finally(function () {});
  }, []);

  const formik = useFormik({
    initialValues: {
      earningFor: "",
      earning_type: "",
      investor: [],
      return_percentage: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createInvestment(values);
    },
  });

  const createInvestment = (values) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/earnings/create`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        navigate("/investments");
        toast.success("Investment created Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>NBTA DX - Earning</title>
      </Helmet>
      {/* 
      <AppTheme {...props}>
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

         */}
      <CssBaseline enableColorScheme />
      <Box sx={{ paddingY: "60px" }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} md={8} lg={6}>
            <Card>
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "30ppx", marginBottom: "30px" }}
              >
                Manage Earnings
              </Typography>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{}}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Manage Earning For
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="earningFor"
                        row
                        value={formik.values.earningFor}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          value="Accumulate"
                          control={  <Radio
                            sx={{
                              color: "#94a0b8",
                              "&.Mui-checked": {
                                color: "#dc00ff",
                              },
                            }}
                          />}
                          label="Accumulative"
                        />
                        <FormControlLabel
                          value="individual"
                          control={  <Radio
                            sx={{
                              color: "#94a0b8",
                              "&.Mui-checked": {
                                color: "#dc00ff",
                              },
                            }}
                          />}
                          label="Individuals"
                        />
                      </RadioGroup>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {formik.touched.earningFor && formik.errors.earningFor}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Earning Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="earning_type"
                        value={formik.values.earning_type}
                        onChange={formik.handleChange}
                      >
                        <FormControlLabel
                          value="profit"
                          control={  <Radio
                            sx={{
                              color: "#94a0b8",
                              "&.Mui-checked": {
                                color: "#dc00ff",
                              },
                            }}
                          />}
                          label="Profit"
                        />
                        <FormControlLabel
                          value="loss"
                          control={  <Radio
                            sx={{
                              color: "#94a0b8",
                              "&.Mui-checked": {
                                color: "#dc00ff",
                              },
                            }}
                          />}
                          label="Loss"
                        />
                      </RadioGroup>
                      <FormHelperText sx={{ color: "#d32f2f" }}>
                        {formik.touched.earning_type &&
                          formik.errors.earning_type}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    {formik.values.earningFor === "individual" && (
                      <FormControl fullWidth>
                        <FormLabel htmlFor="email">Investor</FormLabel>
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
                      </FormControl>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel sx={{ marginBottom: "8px", display: "block" }}>
                      Return Percentage
                    </FormLabel>
                    <TextField
                      fullWidth
                      id="last_name"
                      type="number"
                      name="return_percentage"
                      value={formik.values.return_percentage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.return_percentage &&
                        Boolean(formik.errors.return_percentage)
                      }
                      helperText={
                        formik.touched.return_percentage &&
                        formik.errors.return_percentage
                      }
                    />
                  </Grid>
                </Grid>

                <Box sx={{ textAlign: "center", marginY: "20px" }}>
                  <Button type="submit" variant="contained">
                    Manage Earning
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
