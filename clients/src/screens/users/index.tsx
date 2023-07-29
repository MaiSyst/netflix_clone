import netflix from "../../assets/img/netflix_logo.svg";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import styled from "@emotion/styled";
import {
  ThemeProvider,
  createTheme,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Divider,
  List,
  ListItem,
  Drawer,
  TextField,
  useScrollTrigger,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { IMoviesServer } from "../../hooks/MaiHook";
import IMaiMovies from "../../utils/interfaces/IMaiMovies";
import MaiFetch from "../../utils/MaiFetch";
import Authorized from "../../utils/Authorized";
import { API_IMAGE } from "../../utils/Core";

const pages = [
  { path: "/users", title: "Accueil" },
  { path: "/users/movies", title: "Films" },
  { path: "/users/series", title: "Series" },
  { path: "/users/favorites", title: "Favories" },
];
const settings = [sessionStorage.getItem("username"), "Logout"];
const drawerWidth = 240;
const Users = () => {
  const location = useLocation();
  const theme = createTheme({
    palette: { mode: "dark" },
  });
  const [fieldSearchValue, setFieldSearchValue] = useState("");
  const [searchData, setSearchData] = useState(new Array<IMoviesServer>());
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pageSearch, setPageSearch] = useState(1);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    Authorized()
      .then((res) => (res ? setAuth(res) : navigate("/")))
      .catch(() => navigate("/"));
  }, [navigate]);

  const onHandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldSearchValue(e.target.value);
    if (e.target.value.trim().length >= 4) {
      maiFetchSearch(e.target.value);
    }
    if (e.target.value.trim().length === 0) {
      MaiFetch.byPage()
        .then((res) => {
          let d = new Array<IMoviesServer>();
          d.push({
            pageTotal: res.total_pages,
            totalResults: res.total_results,
            items: res.results as IMaiMovies[],
          });
          setSearchData(d);
        })
        .catch((err) => console.error(err));
    }
  };
  const maiFetchSearch = (query: string, page = 1) => {
    MaiFetch.searchMovies(query, "movie", page)
      .then((res) => {

        if (query === fieldSearchValue) {
          setSearchData((prev) => [
            ...prev,
            {
              pageTotal: res.total_pages,
              totalResults: res.total_results,
              items: res.results as IMaiMovies[],
            },
          ]);
        } else {
          setSearchData([
            {
              pageTotal: res.total_pages,
              totalResults: res.total_results,
              items: res.results as IMaiMovies[],
            },
          ]);
        }
      })
      .catch((err) => console.error(err));
  };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window : undefined,
  });
  useEffect(() => {
    const fetchMost = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight + 100
      ) {
        if (searchData.length !== 0) {
          if (pageSearch !== searchData[0].pageTotal) {
            const p = pageSearch + 1;
            setPageSearch(p);
            maiFetchSearch(fieldSearchValue, pageSearch);
          }
        }
      }
    };
    return () => window.addEventListener("scroll", fetchMost);
  }, [searchData]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    
   setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e:React.MouseEvent<HTMLLinkElement>) => {
    setAnchorElUser(null);
    if(e.currentTarget.id==="Logout"){
      
      sessionStorage.removeItem("maiToken");
      sessionStorage.removeItem("maiUserId");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("profile");
      navigate("/login");
    }
    
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MAIFLIX
      </Typography>
      <Divider />
      <List>
        {pages.map(({ path, title }) => (
          <Li isDrawer={true} key={path} active={location.pathname === path}>
            <ListItem
              sx={{
                padding: "1rem",
              }}
              to={path}
              component={NavLink}
              key={path}
              disablePadding
            >
              <Typography variant="h6">{title}</Typography>
            </ListItem>
          </Li>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window.document.body : undefined;
  return (
    auth && (
      <ThemeProvider theme={theme}>
        <AppBar
          elevation={trigger ? 4 : 0}
          position="fixed"
          component="nav"
          sx={{
            backgroundColor: !trigger ? "transparent" : theme.palette.mode,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                backgroundColor: !trigger ? "transparent" : theme.palette.mode,
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <img src={netflix} width={80} height={80} alt="logo" />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="open drawer"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerToggle}
                  edge="start"
                  sx={{ mr: 2, display: { sm: "flex" } }}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                }}
              >
                <img src={netflix} width={80} height={80} alt="logo" />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map(({ path, title }) => (
                  <Li
                    isDrawer={false}
                    key={path}
                    active={location.pathname === path}
                  >
                    <NavLink to={path}>{title}</NavLink>
                  </Li>
                ))}
              </Box>
              {location.pathname !== "/users" && (
                <Box
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                >
                  <TextField
                    color="error"
                    value={fieldSearchValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onHandleSearch(e)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ width: "90%" }}
                    id="filled-basic"
                    label="Rechercher films"
                    variant="filled"
                  />
                </Box>
              )}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={sessionStorage.getItem("username")}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={
                         "MaiflixUser"
                      }
                      src={API_IMAGE + "/" + sessionStorage.getItem("profile")}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem id={setting} key={setting} onClick={(e) => handleCloseUserMenu(e)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Container onClick={()=>setAnchorElUser(null)} sx={{ my: 20 }}>
          <Outlet context={searchData} />
        </Container>
      </ThemeProvider>
    )
  );
};
const Li = styled.li<{ active: boolean; isDrawer: boolean }>`
  list-style: none;
  padding: ${(props) => (props.isDrawer ? "10px 10px" : "20px 10px")};
  margin-right: 0.5rem;
  margin-left: ${(props) => (props.isDrawer ? "1rem" : "0")};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: ${(props) => (props.isDrawer ? "50%" : "0")};
    height: 10px;
    width: 10px;
    display: ${(props) => (props.isDrawer ? "none" : "block")};
    border-radius: 10px;
    left: ${(props) => (props.isDrawer ? "0" : "50%")};
    transform: ${(props) =>
      props.isDrawer
        ? props.active
          ? "translateY(-50%) scale(1)"
          : "translateY(-50%) scale(0)"
        : props.active
        ? "translateX(-50%) scale(1)"
        : "translateX(-50%) scale(0)"};
    background-color: #ff1414ec;
    transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &::before {
    content: "";
    position: absolute;
    display: ${(props) => (props.isDrawer ? "block" : "none")};
    top: 50%;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    left: 0;
    transform: ${(props) =>
      props.active ? "translateY(-50%) scale(1)" : "translateY(-50%) scale(0)"};
    background-color: #ff1414ec;
    transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover a {
    color: #ff1414ec;
  }

  &:hover::after {
    transform: translateX(-50%) scale(1);
  }

  &:hover::before {
    transform: translateY(-50%) scale(1);
  }

  a {
    text-decoration: none;
    color: ${(props) => (props.active ? "#ff1414ec" : "#ffffffeb")};
    font-size: 1.3em;
    padding: 10px 10px;
    font-weight: 500;
    letter-spacing: 1px;
    transition: 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }
`;
export default Users;