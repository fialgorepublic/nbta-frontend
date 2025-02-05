import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InvestorForm from "./form";
import { Helmet } from "react-helmet";
export default function NewInvestor() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const handleCreateInvestor = (values) => {
    setLoader(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/register`, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setLoader(false);
        navigate("/investors");
        toast.success("Investor created successfully");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.response.data.message);
      });
  };

  // if (loader) {
  //   return (
  //     <Backdrop open>
  //       <CircularProgress />
  //     </Backdrop>
  //   );
  // }
  return (
    <>
      <Helmet>
        <title>NBTA DX - Investors</title>
      </Helmet>
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
      <InvestorForm
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleCreateInvestor}
        title="Create New Investor"
        mode="create"
        buttonText="Create Investor"
      />
    </>
  );
}
