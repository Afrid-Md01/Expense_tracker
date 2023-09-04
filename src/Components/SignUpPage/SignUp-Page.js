import { Card, Form, FloatingLabel, Button } from "react-bootstrap";
import classes from "./SignUp-Page.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const switchAuthHandler = () => {
    history.replace("/signin-page");
  };

  const signup_pageSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      toast.error("password does not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      setIsLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3AbBTqHOLSTMDbMunfXa_oG8FAq8PlX4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setIsLoading(false);
          if (response.ok) {
            toast.success("Your new account is created Successfully!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              pauseOnFocusLoss: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setTimeout(() => {
              history.replace("/signin-page");
            }, 3000);
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
          const errorMessage = err.message;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }
    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
    confirmPasswordInputRef.current.value = null;
  };

  return (
    <div className={classes.signin}>
      <ToastContainer />
      <Card
        style={{
          width: "500px",
          height: "auto",
          boxShadow: "0 0 30px 5px #48abe0",
        }}
      >
        <Form onSubmit={signup_pageSubmitHandler}>
          <Form.Text
            className={classes.signinText}
            style={{ fontSize: "50px", marginTop: "7%" }}
          >
            Sign up
          </Form.Text>

          <Form.Group className={classes.body}>
            <Form.Group className={classes.input}>
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="border border-info"
                style={{ borderRadius: "7px" }}
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailInputRef}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className={classes.input}>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="border border-info"
                style={{ borderRadius: "7px" }}
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className={classes.input}>
              <FloatingLabel
                controlId="ConfirmfloatingPassword"
                label="Confirm password"
                className="border border-info"
                style={{ borderRadius: "7px" }}
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  ref={confirmPasswordInputRef}
                />
              </FloatingLabel>
            </Form.Group>
          </Form.Group>

          <Form.Group className={classes.buttonspan}>
            {isLoading ? (
              <p className={classes.validate}>validating your details...</p>
            ) : (
              <Button
                variant="primary"
                type="submit"
                style={{
                  fontSize: "20px",
                  fontFamily: "cursive",
                  width: "220px",
                }}
              >
                Create new account
              </Button>
            )}
          </Form.Group>
        </Form>
      </Card>
      <span>
        <button
          className={classes.switchAuthButton}
          onClick={switchAuthHandler}
        >
          Already have an account? Sign in
        </button>
      </span>
    </div>
  );
}
export default SignUpPage;
