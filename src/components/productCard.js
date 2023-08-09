import {
  Card,
  Typography,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Rating
} from "@mui/Material";
import { AddShoppingCartOutlined } from "@mui/icons-material";
export default function productcard(product, handleAddtoCart) {
  return (
    <Card>
      <CardMedia Component="img" alt={product.name} image={product.image} />
      <CardContent>
        <Typography>{product.name}</Typography>
        <Typography paddingY="0.5rem" fontWeight="700">
          ${product.price}
        </Typography>
        <Rating
          name="read-only"
          value={product.rating}
          precision={0.5}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button
          varient="contained"
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddtoCart}
        >
          Add to Cart{" "}
        </Button>
      </CardActions>
    </Card>
  );
}
