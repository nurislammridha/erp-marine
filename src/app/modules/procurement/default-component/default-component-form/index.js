import React, { Component } from "react";
import {
 Row,
  Form, 
  Button,
  Col,
  Table,
  ButtonToolbar
} from "react-bootstrap";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar, 
} from "../../../../../_metronic/_partials/controls";

 
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
   

export default class defaultComponentForm extends Component {

  render() {
    return (
      <Card>
          <CardHeader title="default Component">
            <CardHeaderToolbar>
              
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>

            <Form>
                <Container-fluid>
                    <Row>

                         
                        {/**  input box field area Start */}
                        <Col lg={12}>  
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Input Text Filed </Form.Label>
                            <Form.Control type="text" placeholder="Type" /> 
                          </Form.Group>
                        </Col>
                          {/**  input box field End */}

                         
                         {/**  input box field area Start */}
                        <Col lg={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>Input Email Filed </Form.Label>
                            <Form.Control type="email" placeholder="Type Address" /> 
                          </Form.Group> 
                        </Col>
                          {/**  input box field End */}


                         {/**  Select Dropdown area start */}
                        <Col lg={12}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label> Select Dropdown Name </Form.Label>
                            <Form.Control as="select">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option> 
                            </Form.Control>
                          </Form.Group>  
                        </Col> 
                        {/**  Select Dropdown End */}


                         
                    </Row>

                    <Row>  <div className="borderGap"> </div>  </Row>


                     {/**  Select Dropdown area with add button start */}
                    <Row>
                        <Col lg={4}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label> Base Currency </Form.Label>
                            <Form.Control as="select">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option> 
                            </Form.Control>
                          </Form.Group>  
                          </Col> 

                         <Col lg={2}>
                          <Button variant="primary"size="sm" className="ml-1 mt-8"> 
                              <AddIcon />
                              Add
                          </Button> 
                         </Col> 
                    </Row>
                      {/**  Select Dropdown area with add button End */}


                    {/** Table area start */}
                    <Row>
                      <Col lg={6}>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>SL</th>
                              <th>Module Name</th>
                              <th>Action</th> 
                            </tr>
                          </thead>
                          <tbody>

                            <tr>
                              <td>01</td>
                              <td>Sales Order</td>
                              <td> <HighlightOffIcon/> </td>
                               
                            </tr>
                            <tr>
                              <td>01</td>
                              <td>Sales Order</td>
                              <td> <HighlightOffIcon/> </td>
                              
                            </tr>
                            <tr>
                              <td>01</td>
                              <td>Sales Order</td>
                              <td> <HighlightOffIcon/> </td>
                              
                            </tr>
                            
                          </tbody>
                        </Table>
                      </Col>
                    </Row>

                   {/** Table area End */}
 

                    {/** Group Button cancel & Save area start */}
                    <Row>
                      <ButtonToolbar>
                        <Button variant="secondary" size="lg">
                          Cancel
                          </Button>
                          { }
                          <Button variant="primary"size="lg" className="ml-3">
                          Save
                        </Button> 
                      </ButtonToolbar>
                    </Row>
                     {/** Group Button cancel & Save area End */}

                </Container-fluid>
                
              </Form>
          </CardBody>
        </Card>
    );
  }

}
