import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import { GetEmployeeDetails } from "../../../../_redux/actions/EmployeeAction";
import "../css/custom.css";
// import logo from "../../../../../images/logo-dark.png";
import logo from "../../../../images/logo-dark.png";
import cv from "../../../../images/avatar.jpg";
import { isTemplateElement } from "@babel/types";

const EmployeeCrReport = withRouter(({ history, props }) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [veryGood, setVeryGood] = React.useState({
    checkVeryGood: false,
  });

  useEffect(() => {
    dispatch(GetEmployeeDetails(props.match.params.intEmployeeId));
  }, [dispatch]);

  const employeeInfoDetails = useSelector(
    (state) => state.employeeInfo.employeeInfoDetails
  );
  console.log("employeeInfoDetails", employeeInfoDetails);

  const clickCeck = (e) => {
    console.log("Event", e);
  };


  const criteria = [
    {
      id: 1,
      name: "Conduct",
      options:[
        {
          id: 1,
          name: "Very Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 2,
          name: "Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 3,
          name: "Average",
          ysnChecked: 0,
        },
        {
          id: 4,
          name: "Not Up To Mark",
          ysnChecked: 0,
        },
      ]

    },
    {
      id: 2,
      name: "Ability",
      options:[
        {
          id: 1,
          name: "Exceptionally Good",
          ysnChecked: 0,
        },
        {
          id: 2,
          name: "Always Interested",
          ysnChecked: 0,
        },
        {
          id: 3,
          name: "Unable to Analyze Situations",
          ysnChecked: 0,
        },
        {
          id: 4,
          name: "Poor Decision Making",
          ysnChecked: 0,
        },
      ]
    },
    {
      id: 3,
      name: "Professional Knowledge",
      options:[
        {
          id: 1,
          name: "Highly Knowladgeable",
          ysnChecked: 0,
        },
        {
          id: 2,
          name: "Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 3,
          name: "Average",
          ysnChecked: 0,
        },
        {
          id: 4,
          name: "Not Up To Mark",
          ysnChecked: 0,
        },
      ]
    },
    {
      id: 4,
      name: "Initiative",
      options:[
        {
          id: 4,
          name: "Criteria",
          ysnChecked: 0,
        },
        {
          id: 1,
          name: "Very Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 2,
          name: "Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 3,
          name: "Average",
          ysnChecked: 0,
        },
        {
          id: 4,
          name: "Not Up To Mark",
          ysnChecked: 0,
        },
      ]
    },
    {
      id: 5,
      name: "Soberity",
      options:[
        {
          id: 4,
          name: "Criteria",
          ysnChecked: 0,
        },
        {
          id: 1,
          name: "Very Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 2,
          name: "Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 3,
          name: "Average",
          ysnChecked: 0,
        },
        {
          id: 4,
          name: "Not Up To Mark",
          ysnChecked: 0,
        },
      ]
    },
    {
      id: 6,
      name: "Sense of Responsibility",
      options:[
        {
          id: 4,
          name: "Criteria",
          ysnChecked: 0,
        },
        {
          id: 1,
          name: "Very Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 2,
          name: "Satisfactory",
          ysnChecked: 0,
        },
        {
          id: 3,
          name: "Average",
          ysnChecked: 0,
        },
        {
          id: 4,
          name: "Not Up To Mark",
          ysnChecked: 0,
        },
      ]
    },
  ];

  console.log("Criteria", criteria);
  return (
    <>
      <div className="container pb-5 mb-4 ml-3">
        <div className="row  border-around">
          <div className="col-lg-8">
            <h3 className="card-label a-lebel text-center pt-5">
              AKIJ SHIPPING LINE LTD.
            </h3>
          </div>

          <div className="col-lg-4 shippingLineLogo">
            <Image src={logo} roundedCircle className="akij-logo-ship" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 ">
            <form>
              <div class="form-group row">
                <label for="Employee Name" class="col-sm-3 col-form-label">
                  Employee Name
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="inputEmpName"
                    placeholder="Employee Name"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <form>
              <div class="form-group row">
                <label for="Employee Name" class="col-sm-2 col-form-label">
                  RANK
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="inputRank"
                    placeholder="Rank "
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Second Row */}
        <div className="row">
          <div className="col-lg-6">
            <form>
              <div class="form-group row">
                <label for="Employee Name" class="col-sm-4 col-form-label">
                  Name of Vessel
                </label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    id="inputRank"
                    placeholder="Name of Vessel"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3">
            <form>
              <div class="form-group row">
                <label for="Employee Name" class="col-sm-2 col-form-label">
                  On
                </label>
                <div class="col-sm-10">
                  <input
                    type="date"
                    class="form-control"
                    id="inputRank"
                    placeholder="Rank "
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3">
            <form>
              <div class="form-group row">
                <label for="Employee Name" class="col-sm-2 col-form-label">
                  To
                </label>
                <div class="col-sm-10">
                  <input
                    type="date"
                    class="form-control"
                    id="inputRank"
                    placeholder="Rank "
                  />
                </div>
              </div>
            </form>{" "}
          </div>
        </div>
        <form>
          <label for="Employee Name" className="col-form-label ">
            Reason of Appraisal
          </label>
          <div class="form-group row ml-3">
            <div class="col-lg-3 col-6">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Crew sign off
              </label>
            </div>
            <div class="col-lg-3 col-6">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Master/CE sign off
              </label>
            </div>
            <div class="col-lg-3 col-6">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Promotion
              </label>
            </div>
            <div class="col-lg-3 col-6">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Other (Please Specify)
              </label>
            </div>
          </div>
        </form>{" "}
        <div className="row">
          <div className="col-lg-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Criteria</th>
                  <th>Excellent</th>
                  <th>Very Good</th>
                  <th>Average</th>
                  <th>Poor</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {criteria.map((ct, index) => (
                  <tr>
                    <label className="form-control criteriaOptionsInput ">
                      {ct.name}
                    </label>
                    {ct.options.map((item,index)=>(
                      <td>
                      <label className="form-control criteriaOptionsInput ">
                      {item.name}
                    </label>
                    </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row result">
          <div className="col-lg-12">
            <p>
              {" "}
              Based On the above tool, how would you describe his/ her overall
              performance?{" "}
            </p>

            <div className="last__checkbox pl-5">
              <div className="row">
                <div className="col-lg-3">
                  <input
                    className="form-check-input res__checkbox"
                    type="checkbox"
                    value=""
                    id="defaultCheck2"
                  />
                  <label className="form-check-label" for="defaultCheck2">
                    Outstanding
                  </label>
                </div>
                <div className="col-lg-3">
                  <input
                    className="form-check-input res__checkbox"
                    type="checkbox"
                    value=""
                    id="defaultCheck2"
                  />
                  <label className="form-check-label" for="defaultCheck2">
                    Meet expections
                  </label>
                </div>
                <div className="col-lg-3">
                  <input
                    className="form-check-input res__checkbox"
                    type="checkbox"
                    value=""
                    id="defaultCheck2"
                  />
                  <label className="form-check-label" for="defaultCheck2">
                    Meet some expections
                  </label>
                </div>
                <div className="col-lg-3">
                  <input
                    className="form-check-input res__checkbox"
                    type="checkbox"
                    value=""
                    id="defaultCheck2"
                  />
                  <label className="form-check-label" for="defaultCheck2">
                    Perform bellow expection
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row additional__comments">
          <div className="col-lg-12">
            <p>Additional Comments Appraiser: </p>

            <div className="row">
              <div className="col-lg-6">
                <div className="form-check radio__button">
                  <label className="form-check-label" for="exampleRadios1">
                    1. Promotion recommanded:
                  </label>
                </div>
                <div className="form-check radio__button ml-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label className="form-check-label" for="exampleRadios1">
                    Yes
                  </label>
                </div>
                <div class="form-check radio__button ml-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                    checked
                  />
                  <label className="form-check-label" for="exampleRadios1">
                    No
                  </label>
                </div>
                <form>
                  <div className="form-group row pt-2 pl-2">
                    <label
                      for="Employee Name"
                      className="col-sm-2 col-form-label"
                    >
                      Date
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="date"
                        className="form-control"
                        id="inputRank"
                        placeholder="Rank "
                      />
                    </div>
                  </div>
                </form>{" "}
              </div>

              <div className="col-lg-6">
                <form>
                  <label
                    for="Employee Name"
                    className="col-sm-2 col-form-label"
                  >
                    {/* Date */}
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Name"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row additional__comments">
          <div className="col-lg-12">
            <div className="col-lg-12">
              <p>Additional comments of Master/CE:</p>

              <div className="row">
                <div className="col-lg-6">
                  <div className="form-check radio__button">
                    <label className="form-check-label" for="exampleRadios1">
                      2. Furtehr employment recommandation:
                    </label>
                  </div>
                  <div className="form-check radio__button ml-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                      checked
                    />
                    <label className="form-check-label" for="exampleRadios1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check radio__button ml-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                      checked
                    />
                    <label className="form-check-label" for="exampleRadios1">
                      No
                    </label>
                  </div>
                  <form>
                    <div className="form-group row pt-2 pl-2">
                      <label
                        for="Employee Name"
                        className="col-sm-2 col-form-label"
                      >
                        Date
                      </label>
                      <div class="col-sm-6">
                        <input
                          type="date"
                          className="form-control"
                          id="inputRank"
                          placeholder="Rank "
                        />
                      </div>
                    </div>
                  </form>{" "}
                </div>

                <div className="col-lg-6">
                  <form>
                    <label
                      for="Employee Name"
                      className="col-sm-2 col-form-label"
                    >
                      {/* Date */}
                    </label>
                    <div class="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Name"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 nb">
            <p>
              {" "}
              NB: Confidential report shall sent to D.P.A / T.S at the time of
              sign off the ship-staff of prior to signing off Master/CE
              whochever is the earliest{" "}
            </p>
          </div>
        </div>
        <hr />
        <div className="row rivision">
          <div className="col-lg-2">
            <p> ASLL'FORM-06R3</p>
          </div>
          <div className="col-lg-2">
            <p> Rivision : 3</p>
          </div>
          <div className="col-lg-2">
            <p>Rivision Date:</p>
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-2">
            <p> Page : 1</p>
          </div>
        </div>
        <div className="row rivision">
          <div className="col-lg-12">
            <p>Uncontrolled when printed or copied</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default EmployeeCrReport;
