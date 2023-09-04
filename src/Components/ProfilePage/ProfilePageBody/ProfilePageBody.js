import { Form, Button } from "react-bootstrap";
import classes from "./ProfilePageBody.module.css";
import { useEffect, useRef} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfilePageBody() {

  const token = useSelector((state)=>state.auth.token);
  const nameInputRef = useRef();
  const photoUrlInputRef=useRef();

  const history=useHistory();


  const updateProfileHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl=photoUrlInputRef.current.value;

    if (enteredName.trim().length < 5 && !enteredPhotoUrl.includes('http')) {
      toast.error("name must contain >5 characters", {
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
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3AbBTqHOLSTMDbMunfXa_oG8FAq8PlX4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success("Your profile has been updated", {
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
            return res.json();
          } else {
            return res.json().then((data) => {
              let newError = data.error.message;
              throw new Error(newError);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          let errMessage = err.message;
          toast.error(errMessage, {
            position: "top-right",
            autoClose: 5000,
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
  };

  const CancelHandler=()=>{
    history.replace('./homepage')
  }

  useEffect(()=>{
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA3AbBTqHOLSTMDbMunfXa_oG8FAq8PlX4',{
        method:'POST',
        body:JSON.stringify({
          idToken:token,
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res=>{
        if(res.ok){
          return res.json();
        }
        else{
          return res.json().then((data)=>{
              throw new Error(data.error.message);
          })
        }
      }).then((data)=>{
        console.log(data);
        nameInputRef.current.value=data.users[0].displayName;
        photoUrlInputRef.current.value=data.users[0].photoUrl;
      }).catch((err)=>{
        if(err.message === "Cannot set properties of undefined (setting 'value')"){
          return
        }else{
          alert(err.message);
        }
      })
  })


  return (
    <div className={classes.body}>
      <ToastContainer />
      <div className={classes.formSpan}>
        <Button variant="outline-danger" style={{marginLeft:'530px'}} onClick={CancelHandler}>cancel</Button>
        <Form onSubmit={updateProfileHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label
              style={{ color: "white", fontFamily: "serif", fontSize: "25px" }}
            >
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              ref={nameInputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhotoUrl">
            <Form.Label
              style={{ color: "white", fontFamily: "serif", fontSize: "25px" }}
            >
              Photo Url
            </Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter Photo Url"
              ref={photoUrlInputRef}
            />
          </Form.Group>
          
          <Form.Group>
            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
export default ProfilePageBody;
