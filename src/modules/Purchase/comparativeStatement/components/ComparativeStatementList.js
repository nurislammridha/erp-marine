import React, { useEffect, useState } from "react";
import { Card,Form,Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { changeComparativeInputField, getComparativeRQF, selectedItem, getComparativeStatementList, getCSOptionList, updateCS } from "../_redux/actions/ComparativeStatementAction";
import LoadingSpinner from "../../../master/spinner/LoadingSpinner";

const ComparativeStatementList = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch()
  const comparativeList = useSelector((state)=> state.ComparativeStatementReducer.comparativeList);
  const isLoading = useSelector((state)=> state.ComparativeStatementReducer.isLoading);
  const RQFOptionList = useSelector((state)=> state.ComparativeStatementReducer.RQFOptionList);
  const rfqNo = useSelector((state)=> state.ComparativeStatementReducer.rfqNo);
  const csOptionList = useSelector((state)=> state.ComparativeStatementReducer.csOptionList);
  const csInputData = useSelector((state)=> state.ComparativeStatementReducer.csInputData);

  const handleChangeTextInput = (name, value) => {
    dispatch(changeComparativeInputField(name, value));
  };

  const listSelect =(item)=>{
    dispatch(getComparativeStatementList(item.intQuotationId))
    dispatch(getCSOptionList(item.intQuotationId))
    dispatch(selectedItem(item));
      }
  const getRQFList = (value)=>{
   let length = value.length;
      dispatch(getComparativeRQF(value,length))
  }
  const onSubmit = async (e) => {
    dispatch(updateCS(csInputData));
  };
  return (
    <>
      <Card >
        <Card.Body className="pt-2">
        <div className="container ">
        <form 
        className="form form-label-right voyageEngineerForm"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        encType="multipart/form-data"
        autoComplete="off"
        >

           <h1 className="tableheading font-weight-bold ">comparative statement</h1>
           <div className="custom-border mt-5 "></div>
          <div className="row mb-5 table-form ">
            <div className="col-xl-4 col-lg-4 col-md-6 mt-2">
            <Form.Group>
                  <Form.Label className="formFont pl-1">RFQ NO</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    placeholder="Type"
                    value={rfqNo && rfqNo}
                    onChange={(e)=> (
                      getRQFList(e.target.value)
                    )}
                    
                  />
                </Form.Group>
                <div className="customSearchField">
                  <ul class="list-group">
                 {
                    !isLoading &&  RQFOptionList && RQFOptionList.map((item, index)=>(
                    <li onClick={()=>listSelect(item)} class="list-group-item list-group-item-action cursor-pointer">{item.strQuotationNo}</li>
                   )) 
                 }
                 
                
                 { isLoading && 
                    <li class="list-group-item cursor-pointer">
                      <span>Loading</span>
                      <span className="ml-3 spinner spinner-white "></span>
                    </li>
                 }
                  </ul>
                </div>
             
            </div>
            </div>
            {/* </form> */}
            <div className="border-bottom mt-5 "></div>
             {isLoading && <LoadingSpinner text="Loading Comparative Statement List..." />}

     { comparativeList && (
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
           {comparativeList && comparativeList.length > 0 && comparativeList.map((item, index)=> (
             <>
               <tr>
                 <td>
                   <Form.Check type="checkbox" />
                 </td>
                 <td>{index + 1}</td>
                 <td>{item.intItemId !== null && item.intItemId !== "" ? item.intItemId : "N/A"}</td>
                 <td>{item.strItemName !== null && item.strItemName !== "" ? item.strItemName : "N/A"}</td>
                 <td>{item.strUoM !== null && item.strUoM !== "" ? item.strUoM : "N/A"}</td>
                 <td>{item.numQuotationQty !== null && item.numQuotationQty !== "" ? item.numQuotationQty : "N/A"}</td>
         
                 <td scope="col" className=" ">
                 {item.numQuotationRate !== null && item.numQuotationRate !== "" ? item.numQuotationRate : 1}
                 <span className="ml-2">{parseInt(item.numQuotationQty)*parseInt(item.numQuotationRate)}</span>{" "}
                 </td>
         
                 <td scope="col" >
                 {item.numQuotationRate !== null && item.numQuotationRate !== "" ? item.numQuotationRate : 1}
                 <span className="ml-2">{parseInt(item.numQuotationQty)*parseInt(item.numQuotationRate)}</span>{" "}
                 </td>
                <td scope="col" >
                {item.numQuotationRate !== null && item.numQuotationRate !== "" ? item.numQuotationRate : 1}
                 <span className="ml-2">{parseInt(item.numQuotationQty)*parseInt(item.numQuotationRate)}</span>{" "}
              </td>
            </tr>
           </>
           )) 
          
           }
          </thead>
        </table>
      </div>
       )
     }
    {/* {!isLoading && comparativeList.length === 0 && (
            <div className="alert alert-warning mt-5">
              Sorry ! Comparative Statement List Not Found.
            </div>
          )} */}

        <div className="form-group row mt-3">
              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <label className="formFont">Supplier</label>
                <RHFInput
                  as={<Select options={csOptionList} />}
                  rules={{ required: false }}
                  name="intWinSupplierId"
                  register={register}
                  value={csInputData.supplier}
                  onChange={(option)=>(
                    handleChangeTextInput('intWinSupplierId', option.value),
                    handleChangeTextInput('supplier', option)
                  )}
                  setValue={setValue}
                />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 ">
              <Form.Group>
                  <Form.Label className="formFont pl-1">Remarks</Form.Label>
                  <Form.Control
                    className="formHeight"
                    type="text"
                    name="strWinCause"
                    placeholder="Remarks"
                    value={csInputData.strWinCause}
                    onChange={(e)=> handleChangeTextInput('strWinCause', e.target.value)}
                  />
                </Form.Group>
              </div>

          
            </div>
             {
               !isLoading && (
                <Button type="submit" className="text-white float-right" variant="primary">
                Submit
              </Button>
               )
             }
               {isLoading && (
                  <Button type="submit" className="text-white float-right" variant="primary">
                  <span>Submitting</span>
                  <span className="ml-3 spinner spinner-white"></span>
                </Button>  
                )}
              </form>
            </div>
            </Card.Body>
            </Card>
            </>
  );
};

export default ComparativeStatementList;
