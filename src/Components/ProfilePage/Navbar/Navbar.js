import { Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar
      bg="dark"
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "fantasy",
        fontSize: "40px",
      }}
    >
      <Navbar.Text style={{ color: "whitesmoke" }}>Your Profile</Navbar.Text>
    </Navbar>
  );
}
export default NavBar;
