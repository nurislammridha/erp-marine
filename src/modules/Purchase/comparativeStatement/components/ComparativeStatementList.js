import React, { useEffect, useState } from "react";
import { Card,Form,Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeComparativeInputField, getComparativeRQF } from "../_redux/actions/ComparativeStatementAction";

const ComparativeStatementList = () => {
  const [show, setShow] = useState(false);
  const { register, setValue } = useForm();
  const dispatch = useDispatch()
  const comparativeList = useSelector((state)=> state.ComparativeStatementReducer.comparativeList);
  const comparativePaginationList = useSelector((state)=> state.ComparativeStatementReducer.comparativePaginationList);
  const isLoading = useSelector((state)=> state.ComparativeStatementReducer.isLoading);
  const RQFOptionList = useSelector((state)=> state.ComparativeStatementReducer.RQFOptionList);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getComparativeList()
    // dispatch(getItemList(currentPage));
  }, [dispatch, currentPage]);
  
  const getComparativeList = (currentPage, id)=>{
   // dispatch(getItemList(currentPage, id));
  }
  const handleChangeTextInput = (name, value, item, index) => {
    dispatch(changeComparativeInputField(name, value, item, index));
  };
  const courseData = [
    {value: "001", label: "cse" },
    { value: "003", label: "EEE" },
    {value: "004",label: "MBA" },
  ];

  // let CourseName = [];
  // if (courseData) {
  //   courseData.forEach((item) => {
  //     let items = {
  //       value: item.id,
  //       label: item.name,
  //     };
  //     CourseName.push(items);
  //   });
  // }
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Card >
        <Card.Body className="pt-2">
        <div className="container ">
        <form className="form form-label-right voyageEngineerForm">
           <h1 className="tableheading font-weight-bold ">comparative statement</h1>
           <div className="custom-border mt-5 "></div>
          <div className="row mb-5 table-form ">
           
            <div className="col-xl-4 col-lg-4 col-md-6 mt-2">
            <Form.Group>
                  <Form.Label className="formFont pl-1">RFQ NO</Form.Label>
                  {/* <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Type"
                  /> */}
                      <RHFInput
                  as={<Select options={RQFOptionList} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={courseData.label}
                  setValue={setValue}
                  isSearchable={true}
                  onChange={(option)=> (
                    dispatch(getComparativeRQF(option.value))
                  )}
                /> 
                </Form.Group>
             
            </div>
            </div>
    
             
            </form>
            <div className="border-bottom mt-5 "></div>
        <div className="react-bootstrap-table table-responsive mt-5">
          <table className="table table table-head-custom table-vertical-center voyageTable supplier-table">
            <thead>
              <tr>
              <th scope="col">
                      {" "}
                      <Form.Check type="checkbox" />
                    </th>
              <th scope="col">SL NO</th>
                    <th scope="col">ITEM ID</th>
                    <th scope="col">ITEM NAME</th>
                    <th scope="col">UOM</th> 
                    <th scope="col">RFQ QTY</th>
                    <th scope="col">SUPPLIER 1
                    
                    {/* <span>RATE</span>
                    <span>TOTAL</span> */}
                    </th>
                    <th scope="col">SUPPLIER 2</th>
                    <th scope="col">SUPPLIER 3</th>
                   

                
              </tr>
              <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>

            <th scope="col" className=" ">
              RATE <span className="ml-2">TOTAL</span>{" "}
            </th>
            <th scope="col" className=" ">
              RATE <span className="ml-2">TOTAL</span>{" "}
            </th>
            <th scope="col" className=" ">
              RATE <span className="ml-2">TOTAL</span>{" "}
            </th>
            
          </tr>
              <tr>
                   <td>
                     <Form.Check type="checkbox" />
                   </td>
                   <td>#01</td>
                   <td>2021-01-05 00:00</td>
                   <td>Container Cargo</td>
                   <td>Durres(Durazzo)</td>
                   <td>Akij Noor</td>
                   <td scope="col" className=" ">
                   17338 <span className="ml-2">37616</span>{" "}
                   </td>
           
                   <td scope="col" >
                   39364 <span className="ml-2">69822</span>{" "}
                   </td>
            <td scope="col" >
              0273 <span className="ml-2">72025</span>{" "}
            </td>
              </tr>
            </thead>
          </table>
        </div>
        <div className="form-group row mt-3">
              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <label className="formFont">Supplier</label>
                <RHFInput
                  as={<Select options={courseData} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={courseData.label}
                  setValue={setValue}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <label className="formFont">Remarks</label>
                <RHFInput
                  as={<Select options={courseData} />}
                  rules={{ required: false }}
                  name="courseData"
                  register={register}
                  value={courseData.label}
                  setValue={setValue}
                />
              </div>

          
            </div>
             <Button className="text-white float-right " variant="primary">
                Send
              </Button>
             
            </div>
            </Card.Body>
            </Card>
            </>
  );
};

export default ComparativeStatementList;
