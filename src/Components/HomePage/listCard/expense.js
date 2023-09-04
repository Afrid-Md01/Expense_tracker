import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { list_dataActions } from "../../Store/list-data";
import classes from "./expense.module.css";

function Expense() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const Expenses = useSelector((state) => state.list_data.Expenses);
  const [show, setShow] = useState(false);

  const deleteHandler = async (id) => {
    try {
      let response = await fetch(
        `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();

      if (response.ok) {
        toast.success("Expense is removed", {
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
        dispatch(list_dataActions.removeExpense({ id: id }));
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      toast.error(error.message, {
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

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const id = useSelector((state) => state.list_data.editingId);
  const [initailValues, setValues] = useState({
    category : '',
    description : '',
    amount : '',
    date : ''
  })

  const editHandler = (expense) => {
    handleOpen();
    dispatch(list_dataActions.editingIdHandler({ id: expense.id }));
    setValues({
      category : expense.category,
      description : expense.description,
      amount : expense.amount,
      date : expense.date,
    })
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedExpense = { ...initailValues};

      let response = await fetch(
        `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(updatedExpense),
          headers: {
            "Content-Type": "appliction/json",
          },
        }
      );

      let data = await response.json();

      if (response.ok) {
        toast.success(
          "Expense is edited, please refresh the page to show effect",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        dispatch(list_dataActions.clearEditingId());
        setValues({
          category : '',
          description : '',
          amount : '',
          date : ''
        })
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      toast.error(error.message, {
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
      <ToastContainer />

      <Modal show={show} onHide={handleClose}>
        <div className={classes.heading}>
          <h2>Edit Expense</h2>
        </div>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={initailValues.category}
                onChange={(e) => setValues({...initailValues, category : (e.target.value)})}
                name="category"
              >
                <option default></option>
                <option value="Housing" default>
                  Housing
                </option>
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
                value={initailValues.description}
                name="description"
                onChange={(e) => setValues({...initailValues, description : (e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={initailValues.amount}
                name="amount"
                onChange={(e) => setValues({...initailValues, amount : (e.target.value)})}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={initailValues.date}
                onChange={(e) => setValues({...initailValues, date : (e.target.value)})}
              />
            </Form.Group>

            <Form.Group style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="warning" type="submit">
                Edit Expense
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {Expenses.map((expense) => (
        <li key={expense.id} className={classes.list}>
          <div className={classes.datediv}>
            <span className={classes.day}>
              {new Date(expense.date)?.toLocaleString("en-US", {
                day: "2-digit",
              })}
            </span>
            <span className={classes.month}>
              {new Date(expense.date)?.toLocaleString("en-US", {
                month: "long",
              })}
            </span>
            <span className={classes.year}>
              {new Date(expense.date)?.getFullYear()}
            </span>
          </div>
          <div className={classes.aboutdiv}>
            <span className={classes.category}>
              <p>{expense.category}</p>
            </span>
            <span className={classes.description}>
              <p>{expense.description}</p>
            </span>
          </div>
          <div className={classes.amount}>
            <span>RS.{expense.amount}</span>
          </div>

          <Button className={classes.edit} onClick={() => editHandler(expense)}>
            Edit
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deleteHandler(expense.id);
            }}
          >
            Delete
          </Button>
        </li>
      ))}
    </React.Fragment>
  );
}
export default Expense;
