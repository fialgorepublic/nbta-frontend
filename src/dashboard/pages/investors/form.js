import {
  Box,
  Button,
  CssBaseline,
  Container,
  Grid,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomCard from "../../components/CustomCard";
import { Helmet } from "react-helmet";
const validationSchema = (mode) =>
    yup.object({
      first_name: yup.string("Enter First Name").required("First Name is required"),
      last_name: yup.string("Enter Last Name").required("Last Name is required"),
      email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      password: mode === "create" 
        ? yup
            .string("Enter your password")
            .min(8, "Password should be at least 8 characters")
            .required("Password is required")
        : yup.string("Enter your password").notRequired(),
    });

export default function Form({ initialValues, onSubmit, title, buttonText, mode }) {
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(mode),
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <>
      <Helmet>
        <title>NBTA DX - Investors</title>
      </Helmet>
      <CssBaseline enableColorScheme />
      <Box sx={{ paddingY: "50px" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={12} lg={7}>
              <CustomCard sx={{ minWidth: 700 }}>
                <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
                  {title}
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                  <Box sx={{ marginTop: "15px" }}>
                    <FormLabel sx={{ marginBottom: "8px", display: "block" }}>First Name</FormLabel>
                    <TextField
                      fullWidth
                      id="first_name"
                      name="first_name"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                      helperText={formik.touched.first_name && formik.errors.first_name}
                    />
                  </Box>
                  <Box sx={{ marginTop: "15px" }}>
                    <FormLabel sx={{ marginBottom: "8px", display: "block" }}>Last Name</FormLabel>
                    <TextField
                      fullWidth
                      id="last_name"
                      name="last_name"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                      helperText={formik.touched.last_name && formik.errors.last_name}
                    />
                  </Box>
                  <Box sx={{ marginTop: "15px" }}>
                    <FormLabel sx={{ marginBottom: "8px", display: "block" }}>Email</FormLabel>
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
                  </Box>
                  <Box sx={{ marginTop: "15px" }}>
                    <FormLabel sx={{ marginBottom: "8px", display: "block" }}>Password</FormLabel>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Box>
                  <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained">
                      {buttonText}
                    </Button>
                  </Box>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
