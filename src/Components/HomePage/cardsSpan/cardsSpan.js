import {
  Row,
  Col,
  Card,
  Container,
  Button,
  ProgressBar,
  ToastContainer,
} from "react-bootstrap";
import classes from "./cardsSpan.module.css";
import {
  FcBullish,
  FcAddDatabase,
  FcCurrencyExchange,
  FcApproval,
  FcDownload,
  FcOk,
} from "react-icons/fc";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import React from "react";

function CardsSpan(props) {
  const totalAmount = useSelector((state) => state.list_data.totalAmount);
  const now = totalAmount / 100;
  const premiumUser = useSelector((state) => state.auth.premiumUser);

  const dispatch = useDispatch();
  const activatePremium = () => {
    dispatch(authActions.premiumUser());

    toast.success("Congratulations! you are now premium member", {
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
  };

  const ExpensesData = useSelector((state) => state.list_data.Expenses);
  const headers = [
    { label: "Date", key: "date" },
    { label: "Category", key: "category" },
    { label: "Description of the expense", key: "description" },
    { label: "Amount Spent", key: "amount" },
  ];

  const csvLink = {
    filename: "Expenses-data.csv",
    headers: headers,
    data: ExpensesData,
  };

  let lastCard;
  if (totalAmount <= 10000 && premiumUser) {
    lastCard = (
      <div className={classes.maindivinCard}>
        <div className={classes.leftSpan}>
          <span className={classes.totalText}>
            <p>Download data</p>
          </span>
          <span className={classes.total}>
            <div
              style={{
                width: "150px",
                display: "grid",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FcDownload />
              </span>
              <CSVLink {...csvLink} className={classes.csvlink}>
                Download
              </CSVLink>
            </div>
          </span>
        </div>
        <div className={classes.icon}>
          <FcOk />
        </div>
      </div>
    );
  } else if (totalAmount < 10000) {
    lastCard = (
      <div className={classes.maindivinCard}>
        <div className={classes.leftSpan}>
          <span className={classes.totalText}>
            <p>Pro requirements</p>
          </span>
          <span className={classes.progressbar}>
            <ProgressBar now={now} label={`${now}%`} variant="warning" />
          </span>
        </div>
        <div className={classes.icon}>
          <FcCurrencyExchange />
        </div>
      </div>
    );
  } else if (totalAmount >= 10000  && !premiumUser) {
    lastCard = (
      <div className={classes.maindivinCard}>
        <div className={classes.leftSpan}>
          <span className={classes.totalText}>
            <p>Activate membership</p>
          </span>
          <span className={classes.total}>
            <Button
              variant="outline-success"
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onClick={activatePremium}
            >
              <FcApproval style={{ fontSize: "30px" }} />
              Activate
            </Button>
          </span>
        </div>
      </div>
    );
  } else if (totalAmount > 10000 && premiumUser) {
    lastCard = (
      <div className={classes.maindivinCard}>
        <div className={classes.leftSpan}>
          <span className={classes.totalText}>
            <p>Download data</p>
          </span>
          <span className={classes.total}>
            <div
              style={{
                width: "150px",
                display: "grid",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "30px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FcDownload />
              </span>
              <CSVLink {...csvLink} className={classes.csvlink}>
                Download
              </CSVLink>
            </div>
          </span>
        </div>
        <div className={classes.icon}>
          <FcOk />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Container style={{ marginTop: "3%" }}>
        <Row>
          <Col>
            <Card
              className="shadow-lg p-2 mb-5 bg-white rounded"
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "140px",
              }}
            >
              <div className={classes.maindivinCard}>
                <div className={classes.leftSpan}>
                  <span className={classes.totalText}>
                    <p>Total Spendings</p>
                  </span>
                  <span className={classes.total}>
                    <p>₹ {totalAmount}</p>
                  </span>
                </div>
                <div className={classes.icon}>
                  <FcBullish />
                </div>
              </div>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card
              className="shadow-lg p-2 mb-5 bg-white rounded"
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "140px",
              }}
            >
              <div className={classes.maindivinCard}>
                <div className={classes.leftSpan}>
                  <span className={classes.totalText}>
                    <p>Add Expense</p>
                  </span>
                  <span className={classes.total}>
                    <Button variant="outline-info" onClick={props.onShow}>
                      <AiFillPlusCircle style={{ fontSize: "25px" }} />
                      Expense
                    </Button>
                  </span>
                </div>
                <div className={classes.icon}>
                  <FcAddDatabase />
                </div>
              </div>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card
              className="shadow-lg p-2 mb-5 bg-white rounded"
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "140px",
              }}
            >
              <div className={classes.maindivinCard}>
                <div className={classes.leftSpan}>
                  <span className={classes.totalText}>
                    <p>Total Customers</p>
                  </span>
                  <span className={classes.total}>
                    <p>10k</p>
                  </span>
                </div>
                <div className={classes.icon}>
                  <BsPeopleFill />
                </div>
              </div>
            </Card>
          </Col>
          <Col>
            {" "}
            <Card
              className="shadow-lg p-2 mb-5 bg-white rounded"
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "140px",
              }}
            >
              {lastCard}
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default CardsSpan;
