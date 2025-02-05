import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Typography,
  Backdrop,
  Card,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerifyKyc(props) {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  let image_urls = [];
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`)
      .then((response) => {
        setLoader(false);
        setUser(response.data.data);
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error);
      });
  }, [id]);

  const handleInputChange = (event, formik) => {
    const { checked } = event.target;
    const status = user.kyc_docs ? "InProgress" : "NotStarted";
    formik.setFieldValue("kyc_status", checked ? "Verified" : status);
  };

  const formik = useFormik({
    initialValues: {
      kyc_status: "",
    },
    onSubmit: (values) => {
      updateInvestor(values);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        kyc_status: user.kyc_status,
      });
    }
  }, [user]);

  const updateInvestor = (values) => {
    setLoader(true);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${id}/update`,
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setLoader(false);
        navigate("/investors");
        toast.success("Investor updated successfully");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.response?.message || "Update failed");
      });
  };

  if (user?.kyc_docs) {
    image_urls = user.kyc_docs.map(
      (doc) => `${process.env.REACT_APP_API_URL}/${doc.url}`
    );
  }

  return (
    <>
      <Box>
        <CssBaseline enableColorScheme />
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
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={8}>
            <Card sx={{ p: 3, m: 2 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  width: "100%",
                  fontSize: "28px",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                Verify KYC
              </Typography>
              <Box>
                <Grid container spacing={2}>
                  {image_urls.map((url, index) => (
                    <Grid item xs={12} md={4} lg={3} key={index}>
                      <Box sx={{ width: "100%" }}>
                        <img
                          src={url}
                          alt={`document-${index}`}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ marginTop: "30px" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleInputChange(e, formik)}
                      checked={formik.values.kyc_status === "Verified"}
                      name="kyc_status"
                    />
                  }
                  label="Update KYC Status"
                  sx={{ mt: 2 }}
                />

                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={formik.handleSubmit}
                  >
                    KYC Verify
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
