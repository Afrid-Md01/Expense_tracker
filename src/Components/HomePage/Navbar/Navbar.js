import { Button, Navbar, } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import classes from "./Navbar.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth";
import { list_dataActions } from "../../Store/list-data";

function NavBar() {
 
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const premiumUser= useSelector(state => state.auth.premiumUser);

  const [theme, setTheme] = useState("light-theme");

  const changeTheme = () => {
    theme === "dark-theme" ? setTheme("light-theme") : setTheme("dark-theme");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const history = useHistory();
  const verifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3AbBTqHOLSTMDbMunfXa_oG8FAq8PlX4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          requestType: "VERIFY_EMAIL",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          toast.success("verifictaion mail sent to your Email!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            progress: undefined,
            theme: "dark",
          });
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        const errorMessage = err.message;
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const logOutHandler = () => {
    dispatch(authActions.logout());
    dispatch(list_dataActions.clearOnLogout());
    history.replace("/");
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar bg="dark" variant="dark" style={{display:'flex', justifyContent:'space-between'}}>
        <div className={classes.leftSpan}>
          <Navbar.Text
            style={{
              fontSize: "50px",
              fontFamily: "fantasy",
              color: "whitesmoke",
            }}
            data-testid='heading'
          >
            Expense Tracker
          </Navbar.Text>
        </div>
        <div className={classes.rightSpan}>
          <span className={classes.inbetween}>
            <p className={classes.verify} onClick={verifyEmailHandler}>
              Verify Email
            </p>
          </span>
          <span className={classes.inbetween}>
            <Link to="/profile-page">Complete your profile</Link>
          </span>
          <span className={classes.inbetween}>
          <Button variant="danger" onClick={logOutHandler}>
            Log out
          </Button>
          </span>
          <span className={classes.inbetween}>

          {premiumUser && <Button variant="outline-warning" onClick={changeTheme}>Change theme</Button>}
          </span>
        </div>
      </Navbar>
    </React.Fragment>
  );
}
export default React.memo(NavBar);
