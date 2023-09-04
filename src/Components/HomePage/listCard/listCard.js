import { Card, Row, Col, Container } from "react-bootstrap";
import classes from "./listCard.module.css";
import Expense from "./expense";



function ListCard() {
  

  return (
    <Container>
      <Row>
        <Col>
            <Card
              className="shadow-lg p-3 mb-5 rounded"
              style={{ backgroundColor: "white" }}
            >
              <div className={classes.uldiv}>
                <ul>
                  <Expense />
                </ul>
              </div>
            </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default ListCard;
