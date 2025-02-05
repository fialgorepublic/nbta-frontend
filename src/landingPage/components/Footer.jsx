import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import Logo from "../../assets/images/Primary_Logo_White.png";
import AnroidLogo from "../../assets/images/android-en-badge.png";
import IosLogo from "../../assets/images/appstore-en-badge.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const token = localStorage.getItem('token')
  return (
    <Box
      sx={{
        color: "#fff",
        padding: {
          xs: "20px 0px",
          md: "40px 0px",
          background:
            "linear-gradient(109.8deg, #2C2C2C 5.49%, #182E45 50.69%, #041C37 95%)",
        },
      }}
    >
      <Container maxWidth="xl">
        <Divider
          sx={{
            backgroundColor: "#258BFC",
            marginY: { xs: "30px", md: "50px" },
          }}
        />
        <Box>
          <Grid container spacing={3} alignItems="center">
            {/* Logo and Mission Statement */}
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  width: "150px",
                  margin: { xs: "auto !important", md: "inherit !important" },
                }}
                display="flex"
                alignItems="center"
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Link to="/">
                  <Box
                    component="img"
                    src={Logo}
                    alt="Quant Farming"
                    sx={{
                      marginBottom: { xs: "10px", md: "30px" },
                      width: "100%",
                    }}
                  />
                </Link>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "10px",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                itae luctus eros iaculis. Nulla facilisi. <br /> incidunt nisl.
              </Typography>

              <Box sx={{height:"30px"}}></Box>

              <Box sx={{margingTop:"30px !important"}}>
                <img src={AnroidLogo} style={{width:"150px", marginRight:"10px"}}/>
                <img src={IosLogo} style={{width:"150px", border:"1px solid #787a7b",borderRadius:"7px"}}/>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              display="flex"
              justifyContent={{ xs: "center", md: "flex-end" }}
              alignItems="center"
              sx={{ paddingLeft: { md: "24px" } }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: "60%", md: "auto" },
                  display: { xs: "flex", md: "block" },
                  gap: { xs: 1 },
                }}
              >
                <a href="#" style={{ textDecoration: "none", width: "100%" }}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{
                      display: "block",
                      width: "100%",
                      padding: { xs: "8px 20px", md: "12px 30px" },
                      borderRadius: "8px",
                      background: "#3804ca",
                      border: "none",
                      textTransform: "capitalize",
                      fontSize: { xs: "13px", md: "14px" },
                      margin: { xs: "0px 0px", md: "0px" },
                      "&:hover": {
                        backgroundColor: "#5A00E6", // Updated hover color
                      },
                    }}
                  >
                    Book a Call
                  </Button>
                </a>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  
                            { token ? (
             <Link to="/dashboard">
             <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "block",
                      width: "100%",
                      padding: { xs: "8px 20px", md: "12px 30px" },
                      borderRadius: "8px",
                      background: "#dc00ff",
                      border: "none",
                      marginTop: "20px",
                      textTransform: "capitalize",
                      fontSize: { xs: "13px", md: "14px" },
                      margin: { xs: "0px 0px", md: "20px 0px" },
                      "&:hover": {
                        backgroundColor: "#FF33FF", // Updated hover color
                      },
                    }}
                  >
                    Dashboard
                  </Button>
           </Link>
          ) : (
            <Link to="/login">
            <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "block",
                      width: "100%",
                      padding: { xs: "8px 20px", md: "12px 30px" },
                      borderRadius: "8px",
                      background: "#dc00ff",
                      border: "none",
                      marginTop: "20px",
                      textTransform: "capitalize",
                      fontSize: { xs: "13px", md: "14px" },
                      margin: { xs: "0px 0px", md: "20px 0px" },
                      "&:hover": {
                        backgroundColor: "#FF33FF", // Updated hover color
                      },
                    }}
                  >
              Login
            </Button>
          </Link>
          )
        }
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider
          sx={{
            backgroundColor: "#24374C",
            marginY: { xs: "20px", md: "40px" },
          }}
        />
        <Box
          sx={{
            marginTop: {
              xs: "40px",
              md: "0px",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ textAlign: { xs: "center", md: "left" } }}
              order={{ xs: 2, md: 1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#fff",
                  fontSize: "14px",
                  marginBottom: { xs: "20px", md: "0px" },
                }}
              >
                Powered by <span> </span>
                <Link
                  to="/"
                  style={{ color: "#F6C33B", textDecoration: "none" }}
                >
                 NBTA
                </Link>
                <span style={{ margin: "0px 5px" }}>|</span>© 2024
              </Typography>
            </Grid>

            <Grid
              xs={12}
              md={6}
              display="flex"
              sx={{ justifyContent: { xs: "center", md: "end" } }}
              order={{ xs: 1, md: 2 }}
            >
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
