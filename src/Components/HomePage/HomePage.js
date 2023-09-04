import React, { useEffect, useState } from "react";
import NavBar from "./Navbar/Navbar";
import CardsSpan from "./cardsSpan/cardsSpan";
import AddModal from "./AddExpensesModal/AddModal";
import ListCard from "./listCard/listCard";
import { useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { list_dataActions } from "../Store/list-data";
import classes from "./HomePage.module.css";
// import Barchart from "./Chart/Chart";

function HomePage() {
  
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showNothing, setShowNothing] = useState(false);
  const length = useSelector((state) => state.list_data.Expenses.length);

  const showAdd = () => {
    setShow(true);
  };

  const hideAdd = () => {
    setShow(false);
  };

  useEffect(() => {
    if (length === 0) {
      setShowNothing(true);
    } else {
      setShowNothing(false);
    }
  }, [length]);

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        let response = await axios.get(
          `https://expense-tracker-13ac1-default-rtdb.firebaseio.com/${email}.json`
        );
  
        if (response.data === null) {
          return;
        }
        else{
          const ExpensesArray = Object.values(response.data);
          const Expensesid = Object.keys(response.data);
    
          console.log(response.data);
    
          for (let i = 0; i < ExpensesArray.length; i++) {
            dispatch(
              list_dataActions.addExpense({
                expense: { ...ExpensesArray[i] },
                id: Expensesid[i],
              })
            );
          }
        }
  
      } catch (error) {
        if (error.message === "Cannot convert undefined or null to object") {
          return;
        } else {
          alert(error.message);
        }
      }
    };
    fetchData();
  },[])




  return (
    <React.Fragment>
      <AddModal show={show} onHide={hideAdd}/>
      <NavBar />
      <CardsSpan onShow={showAdd}/>
      {showNothing && (
        <div className={classes.nothing}>
          <h3>Nothing to show</h3>
          <p className={classes.addSomeExpenses}>add some expenses.. </p>
        </div>
      )}
      {/* {!showNothing && <Barchart/>} */}
      {!showNothing && <ListCard />}
    </React.Fragment>
  );
}
export default HomePage;
