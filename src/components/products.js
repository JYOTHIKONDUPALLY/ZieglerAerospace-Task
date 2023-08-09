import { Search, sentimentDissatisfied } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Grid,
  Input,
  InputAdornment,
  TextField
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";

export default function Products() {
  const [items, setItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debouncing, setDebouncing] = useState(0);
  const token = localStorage.getItem("token");

  const performAPICall = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://get/products");
      setLoading(false);
      setProducts(response.data);
      setFilteredProducts(response.data);
      return response.data;
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { varient: "error" });
        return null;
      } else {
        enqueueSnackbar("Could not fetch the produts", { varient: "error" });
      }
    }
  };
  useEffect(() => {
    performAPICall();
  }, []);

  const performSearch = async (text) => {
    try {
      const response = await axios.get(
        " ${config.endpoint}/products/search?value=${text}"
      );
      setFilteredProducts(response.data);
      return response.data;
    } catch (e) {
      if (e.response.status === 404) {
        setFilteredProducts([]);
      }
      if (e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { varient: "error" });
        setFilteredProducts(products);
      } else {
        enqueueSnackbar("Could not fetch products", { varient: "error" });
      }
    }
  };
  const debounceSearch = (event, debouncing) => {
    const value = event.target.value;

    if (debouncing) {
      clearTimeout(debouncing);
    }
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);
    setDebouncing(timeout);
  };
  return (
    <div>
      <Header>
        <TextField
          className="search"
          size="small"
          fullwidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            )
          }}
          placeholder="search for items"
          name="search"
          onChange={(e) => debounceSearch(e, debouncing)}
        />
      </Header>
      <Grid Container>
        <Grid
          item
          xs={12}
          md={token && products.length ? 9 : 12}
          className="product-grid"
        >
          <Box className="hero">
            <p className="hero-heading">Best Platform for Aircraft parts</p>
          </Box>
          {loading ? (
            <Box className="loading">
              <CircularProgress />
              <h4>Loading Products...</h4>
            </Box>
          ) : (
            <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <Grid item xs={6} md={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Box className="loading"></Box>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      ))
    </div>
  );
}
