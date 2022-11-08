import React from "react"
import { Container, Row, Col } from "reactstrap"
import LatestTranaction from "./LatestTranaction"

const Dashboard = () => {
  //meta title
  document.title = "Нүүр"
  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col lg="12">
            <LatestTranaction />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
