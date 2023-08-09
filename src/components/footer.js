import { Box, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
const Footer = () => {
  return (
    <Box className="Footer" display="flex" justifycontent="space-Between" p={2}>
      <Box>image</Box>
      <Box>
        Ziegler Aerospace is a Global Aerospace Company, Operating under the
        EASA Part 21 framework and headquartered in the United Kingdom. our
        experienced Engineering Team is engaged in the design and certification
        of Structural and Cabin Interiors repairs and modifications for all
        types of Large Aircraft.
      </Box>
      <Box display="flex" alignItems="baseline">
        <IconButton type="button">
          <FacebookIcon />
        </IconButton>
        <IconButton type="button">
          <TwitterIcon />
        </IconButton>
        <IconButton type="button">
          <LinkedInIcon />
        </IconButton>
        <InstagramIcon />
        <IconButton type="button">
          <GoogleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Footer;
