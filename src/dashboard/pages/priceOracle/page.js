import {
    Box,
    CssBaseline,
    Typography,
    Grid,
    Card,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PriceOracle() {
    const [price, setPrice] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentPrice, setCurrentPrice] = useState(null);

    useEffect(() => {
        fetchHistory();

        fetchCurrentPrice();
    }, []);
    const getToken = () => {
        const userDetail = localStorage.getItem('userDetail');

        if (userDetail) {
            const parsed = JSON.parse(userDetail);
            return parsed.token;
        }
        return null;
    };
    const fetchCurrentPrice = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/priceOracle/current`,
                {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setCurrentPrice(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch current price");
        }
    };

    const fetchHistory = async () => {
        const token = getToken();
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/v1/priceOracle/history`,
                {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Response data:', JSON.stringify(response.data.data, null, 4)); // Debug line
            setHistory(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch price history");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getToken();

        const config = {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        };

        console.log('Request config:', config); // Debug line
        const data = { price: parseFloat(price) };
        console.log('Request data:', data); // Debug line

        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/priceOracle/update`,
                data,
                config
            );
            console.log('Response:', response); // Debug line
            toast.success("Price updated successfully");
            setPrice("");
            fetchHistory();
        } catch (error) {
            console.error('Error status:', error.response?.status);
            console.error('Error data:', error.response?.data);
            toast.error(error.response?.data?.message || "Failed to update price");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>NBTA DX - Price Oracle</title>
            </Helmet>
            <CssBaseline enableColorScheme />
            <Box sx={{ paddingY: "60px" }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={8} lg={6}>
                        <Card sx={{ p: 3 }}>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{ width: "100%", fontSize: "30px", marginBottom: "30px" }}
                            >
                                Price Oracle
                            </Typography>

                            {currentPrice && (
                                <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                                    <Typography variant="h5" sx={{ mb: 1 }}>
                                        Current Price
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: 'primary.main' }}>
                                        ${currentPrice.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Last updated: {currentPrice.createdAt ?
                                            new Date(currentPrice.createdAt).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'Never'}
                                    </Typography>
                                </Box>
                            )}

                            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                                <TextField
                                    fullWidth
                                    label="New Price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={loading}
                                    fullWidth
                                >
                                    Update Price
                                </Button>
                            </Box>

                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Price History
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Updated By</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {history.map((record) => (
                                            <TableRow key={record._id}>
                                                <TableCell>
                                                    {`${record.updatedBy.first_name} ${record.updatedBy.last_name}`}
                                                </TableCell>
                                                <TableCell align="right">
                                                    ${record.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(record.createdAt).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}