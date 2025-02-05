import {AppBar, Box, Toolbar, Button, Container} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Primary_Logo_White.png";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const token = localStorage.getItem('token')
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: "1100",
        background:
          scrollPosition > 50
            ? "#24374C"
            : "linear-gradient(109.8deg, #2c2c2c 5.49%, #182e45 50.69%, #041c37 95%)",
        paddingY: "10px",
        paddingX: "16px",
        boxShadow: "none !important",
        transition: "background 0.3s ease",
      }}
    >
      <Container maxWidth="xl" sx={{ paddingX: { xs: "0px", md: "" } }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo Section */}
          <Box sx={{ width: "150px" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          { token ? (
             <Link to="/dashboard">
             <Button
               variant="outlined"
               sx={{
                 border: "1px solid #dc00ff",
                 color: "#fff",
                 padding: "8px 30px",
                 textTransform: "capitalize",
                 "&:hover": {
                   backgroundColor: "#dc00ff",
                   color: "#fff",
                 },
               }}
               to="/login"
             >
               Dashboard
             </Button>
           </Link>
          ) : (
            <Link to="/login">
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #dc00ff",
                color: "#fff",
                padding: "8px 30px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#dc00ff",
                  color: "#fff",
                },
              }}
              to="/login"
            >
              Login
            </Button>
          </Link>
          )
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
