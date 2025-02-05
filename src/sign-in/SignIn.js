import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  FormLabel,
  Typography,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ForgotPassword from "./ForgotPassword";
// import lightHeaderImage from '../../src/Primary_Logo_Color.png';
// import darkHeaderImage from '../../src/Primary_Logo_White.png';
import { useTheme } from "@mui/material/styles";

import darkHeaderImage from "../../src/Primary_Logo_White.png";
import lightHeaderImage from "../../src/Primary_Logo_Color.png";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useEffect, useState, useContext } from "react";
import CustomCard from "../dashboard/components/CustomCard";
import CustomContainer from "../dashboard/components/CustomContainer";
import { UserContext } from "../contextStore/userContext";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignIn(props) {
  const theme = useTheme();
  const { setUserDetail } = useContext(UserContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const headerImage =
    theme.palette.mode === "dark" ? lightHeaderImage : darkHeaderImage;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const loginUser = (data) => {
    setLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        { ...data, platform: "adminPanel" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        setUserDetail(response.data.data);
        setLoader(false);
        navigate("/dashboard");
        toast.success("Logged in Successfully");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(
          error.response ? error.response.data.message : "Login failed"
        );
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <CustomContainer direction="column" justifyContent="space-between">
          {/* <ColorModeSelect
            sx={{ position: "fixed", top: "1rem", right: "1rem" }}
          /> */}
          <CustomCard
            variant="outlined"
            sx={{ overflow: "inherit !important" }}
          >
            <img
              src={headerImage}
              alt="Header Image"
              width={"200px"}
              style={{ margin: "auto" }}
            />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%",marginTop:"30px", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign in
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
              <FormLabel htmlFor="Email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button type="submit" fullWidth variant="contained">
                Sign in
              </Button>
            </Box>
          </CustomCard>
        </CustomContainer>
      </AppTheme>
    </>
  );
}
