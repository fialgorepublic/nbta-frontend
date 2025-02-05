import { Container, Typography, Box, Grid, Button } from "@mui/material";
import StarIcon from "../../assets/images/star.png";
import HeroBannar from "../../assets/images/heroBanner.png";
import particles from "../../assets/images/particles.png";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const benefits = [
    "Decentralized",
    "Transparent",
    "Innovative",
    "Fast",
    "Global",
    "Secure",
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          minHeight: { xs: "56vh", md: "80vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(109.8deg, #2C2C2C 5.49%, #182E45 50.69%, #041C37 95%)",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={particles}
          alt="Background"
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: { xs: "100%", md: "50%" },
            height: "100%",
            zIndex: 0,
            opacity: 0.7,
          }}
        />
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "500",
                  lineHeight: {
                    xs: "36px",
                    md: "45px",
                    lg: "45px",
                    xl: "55px",
                  },
                  fontSize: {
                    xs: "24px",
                    md: "1.7rem",
                    lg: "30px",
                    xl: "34px",
                  },
                  marginBottom: { xs: "30px", md: "40px" },
                  textAlign: { xs: "center", md: "left" },
                  color: "#fff",
                }}
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                Lorem Ipsum <span> </span>
                <span
                  style={{
                    padding: "2px 10px",
                    background: "#fff",
                    borderRadius: "8px",
                    color: "#258BFC",
                    fontWeight: "700",
                  }}
                >
                  Dolor Sit Amet
                </span>
                <br /> Consectetur Adipiscing Elit
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  fontSize: { xs: "1rem", md: "1rem", lg: "1.2rem" },
                  marginBottom: "40px",
                  textAlign: { xs: "center", md: "left" },
                  lineHeight: "30px",
                  fontWeight: "500",
                  color: "#fff",
                }}
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                luctus urna sed urna ultricies ac tempor dui sagittis.
              </Typography>
              <Box
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  gap: { xs: "7px", md: "0px" },
                  marginBottom: {
                    xs: "20px",
                    md: "0px",
                  },
                }}
              >
                <a href="https://calendly.com/support-ms0/quantfarmingconsult">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      padding: { xs: "0.75rem 1.5rem", md: "12px 2rem" },
                      backgroundColor: "#3804ca",
                      borderRadius: "8px",
                      fontSize: { xs: "13px", md: "16px" },
                      fontWeight: "600",
                      lineHeight: "24px",
                      marginBottom: { xs: "10px", md: "0px" },
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#2e03a5", // Slightly darker shade for hover
                      },
                    }}
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="400"
                  >
                    Book a Call
                  </Button>
                </a>
                <Button
                  onClick={() => navigate("/product")}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    padding: { xs: "0.75rem 1.5rem", md: "12px 2rem" },
                    backgroundColor: "#dc00ff",
                    borderRadius: "8px",
                    fontSize: { xs: "13px", md: "16px" },
                    fontWeight: "600",
                    lineHeight: "24px",
                    marginBottom: { xs: "10px", md: "0px" },
                    textTransform: "capitalize",
                    marginLeft: { xs: "10px" },
                    "&:hover": {
                      backgroundColor: "#b800d4", // Slightly darker shade for hover
                    },
                  }}
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay="600"
                >
                  Learn More
                </Button>
              </Box>
            </Grid>

            {/* Image Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: "none", md: "block" },
                textAlign: { xs: "center", md: "center" },
              }}
            >
              <Box>
                <Box
                 src={HeroBannar}
                  component="img"
                  alt="Hero Image"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "80%",
                      md: "65%",
                      lg: "60%",
                      xl: "65%",
                    },
                    maxWidth: "110%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                  data-aos="fade-left"
                  data-aos-duration="1000"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "flex-start", md: "center" },
          background: "#24374C",
          padding: { xs: "20px 15px", md: "30px 30px", lg: "50px 100px" },
          gap: 2,
          flexWrap: "nowrap",
          overflowX: "auto",
        }}
      >
        {benefits.map((benefit, index) => (
          <>
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: "600",
                fontSize: {
                  xs: "14px",
                  md: "18px",
                },
                lineHeight: "24px",
                textTransform: "capitalize",
              }}
              key={index}
            >
              {benefit}
            </Typography>
            {index < benefits.length - 1 && (
              <Box
                sx={{
                  paddingX: { xs: "10px", md: "30px" },
                  display: "flex",
                  alignItems: "center",
                }}
                key={`star-${index}`}
              >
                <img src={StarIcon} alt="star icon" />
                {/* Placeholder for Star Icon */}
              </Box>
            )}
          </>
        ))}
      </Box>
    </>
  );
};

export default HeroSection;
