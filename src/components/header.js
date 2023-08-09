import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function Header() {
  return (
    <Box className="header" display="flex" justifycontent="space-Between" p={2}>
      <Box display="flex" justifycontent="space-around" className="search">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Header;
