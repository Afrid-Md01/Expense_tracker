import { Modal, Button, Form } from "react-bootstrap";
import classes from "./AddModal.module.css";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { list_dataActions } from "../../Store/list-data";

function AddModal(props) {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const categoryRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  const totalAmount=useSelector((state)=> state.list_data.totalAmount);
  const premiumUser = useSelector(state => state.auth.premiumUser)

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredCategory = categoryRef.current.value;
    const enteredAmount = amountRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredDate = dateRef.current.value;



    if(totalAmount >= 10000 && premiumUser){
      const newExpense = {
        category: enteredCategory,
        amount: enteredAmount,
        description: enteredDescription,
        date: enteredDate,
      };

      fetch(
        `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success("Expense added!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              pauseOnFocusLoss:false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            amountRef.current.value=null;
            categoryRef.current.value=null;
            descriptionRef.current.value=null;
            dateRef.current.value=null;

            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          const id = data.name;
          dispatch(
            list_dataActions.addExpense({ expense: newExpense, id: id })
          );
        })
        .catch((err) => {
          let errMessage = err.message;
          toast.error(errMessage, {
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
    else if(totalAmount >= 10000){
      toast.error('Expense amount limit reached activate premium', {
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
    }
    else if (
      enteredAmount > 0 &&
      enteredDescription.length > 1 &&
      enteredDate !== undefined
    ) {
      const newExpense = {
        category: enteredCategory,
        amount: enteredAmount,
        description: enteredDescription,
        date: enteredDate,
      };
      console.log(newExpense);

      fetch(
        `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            toast.success("Expense added", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              pauseOnFocusLoss:false,
              draggable: true,
              progress: undefined,
              theme: "dark",})
            categoryRef.current.value = null;
            amountRef.current.value = null;
            descriptionRef.current.value = null;
            dateRef.current.value = null;
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          const id = data.name;
          dispatch(
            list_dataActions.addExpense({ expense: newExpense, id: id })
          );
        })
        .catch((err) => {
          let errMessage = err.message;
          toast.error(errMessage, {
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
    } else {
      toast.error("Enter valid input field", {
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
    }
  };

  return (
    <React.Fragment>
      <ToastContainer/>
      <Modal show={props.show} onHide={props.onHide}>
        <div className={classes.heading}>
          <h2>Add Expense</h2>
        </div>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" ref={categoryRef}>
                <option default></option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Clothing">Clothing</option>
                <option value="Medical/Health">Medical/Health</option>
                <option value="Household items/Supplies">
                  Household items/Supplies
                </option>
                <option value="Insurance">Insurance</option>
                <option value="Personal">Personal</option>
                <option value="Education">Education</option>
                <option value="Savings">Savings</option>
                <option value="Gifts/Donations">Gifts/Donations</option>
                <option value="Entertainment">Entertainment</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description of the expense"
                ref={descriptionRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Expense Amount"
                ref={amountRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" ref={dateRef} />
            </Form.Group>

            <Form.Group style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="success" type="submit">
                Add Expense
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
export default AddModal;
