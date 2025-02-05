import { Grid, Box, Typography, Button, Container } from "@mui/material";
import OurPassion from "../../assets/images/ourpassion.png";
import TradingSoftware from "../../assets/images/tradingSoftware.png";
import StarIcon from "../../assets/images/star.png";
import { Link } from "react-router-dom";

const sectionsData = [
  {
    imageSrc: OurPassion,
    title: "Lorem Ipsum Dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum nisl et erat congue, ac ultrices mauris bibendum.<br/><br/>Nullam faucibus leo vel nunc gravida, vel facilisis eros pretium.",
    buttonText: "Read More",
    link: "/product",
  },
  {
    imageSrc: TradingSoftware,
    title: "Dolor Sit Amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum nisl et erat congue, ac ultrices mauris bibendum.<br/><br/>Nullam faucibus leo vel nunc gravida, vel facilisis eros pretium.",
    buttonText: "Read More",
    link: "/algorithm",
  },
];

const benefits = [
  "Lorem Ipsum Service",
  "Amet Consectetur",
  "Adipiscing Elit Solutions",
];

const FeatureSection = () => {
  return (
    <>
      <Box
        className="section-padding"
        sx={{
          color: "#fff",
          background:
            "linear-gradient(109.8deg, #2C2C2C 5.49%, #182E45 50.69%, #041C37 95%)",
        }}
      >
        <Box>
          <Container maxWidth="xl">
            <Grid container justifyContent="center">
              <Grid item md={12}>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "center" },
                    gap: 2,
                  }}
                >
                  {benefits.map((benefit, index) => (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          fontWeight: "600",
                          fontSize: { xs: "15px", md: "18px" },
                          lineHeight: "24px",
                          textTransform: "capitalize",
                          padding: { xs: "4px 0px", md: "0px" },
                          textAlign: { xs: "center", md: "left" },
                        }}
                        key={index}
                      >
                        {benefit}
                      </Typography>
                      {index < benefits.length - 1 && (
                        <Box
                          sx={{
                            paddingX: { xs: "10px", md: "30px" },
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                          }}
                          key={`star-${index}`}
                        >
                          <img src={StarIcon} alt="star icon" />
                        </Box>
                      )}
                    </>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* Product Highlight */}
        {sectionsData.map((section, index) => (
          <Box
            sx={{
              marginTop: { xs: "25px", md: "30px" },
              padding: { xs: "0px 20px", md: "30px 0px 0px 0px" },
            }}
            key={index}
          >
            <Container
              sx={{
                border: "1px solid #24374C",
                borderRadius: "10px",
                padding: { xs: "20px 20px", md: "50px 50px" },
              }}
            >
              <Grid
                direction={index % 2 === 0 ? "row" : "row-reverse"}
                container
                maxWidth="xl"
                spacing={4}
                alignItems="center"
              >
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      width: {
                        md: "80%",
                        xs: "100%",
                      },
                      borderRadius: "8px",
                      margin: {
                        xs: "auto",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={section.imageSrc}
                      alt="Chart"
                      data-aos="fade-up"
                      data-aos-duration="800"
                      width={"100%"}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      padding: { xs: "0px 0px", md: "40px 20px" },
                      borderRadius: "8px",
                    }}
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontSize: {
                          md: "38px",
                          xs: "22px",
                        },
                        fontWeight: "500",
                        textTransform: "capitalize",
                        color: "#fff",
                        lineHeight: { xs: "33px", md: "60px" },
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        fontSize: { xs: "14px", md: "16px" },
                        fontWeight: "400",
                        color: "#fff",
                        lineHeight: "24px",
                        marginTop: { xs: "10px", md: "30px" },
                      }}
                      dangerouslySetInnerHTML={{ __html: section.description }}
                    />
                    <Box
                      sx={{
                        textAlign: { xs: "center", md: "left" },
                        marginTop: "30px",
                      }}
                    >
                      <Link to={section.link}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            backgroundColor: " #3804ca",
                            padding: "12px 30px",
                            fontSize: "16px",
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: "#fff",
                            lineHeight: "24px",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#1F7ADC",
                            },
                          }}
                        >
                          {section.buttonText}
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default FeatureSection;
