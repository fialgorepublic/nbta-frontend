import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import InvestorForm from "./form";
import { Backdrop, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import { UserContext } from "../../../contextStore/userContext";
import { useContext } from 'react';

export default function EditInvestor() {
  const { setUserDetail } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Failed to load investor details");
      });
  }, [id]);

  const handleUpdateInvestor = (values) => {
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
        if (response.data.data.role === 'admin') {
          setUserDetail(response.data.data)
        }
        toast.success("Investor updated successfully");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.response.data.message);
      });
  };

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
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          email: user?.email || "",
          password: "",
        }}
        onSubmit={handleUpdateInvestor}
        title="Edit Investor"
        mode="update"
        buttonText="Update Investor"
      />
    </>
  );
}
