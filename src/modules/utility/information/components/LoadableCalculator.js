import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import { RHFInput } from "react-hook-form-input";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { changeTextInput } from "../_redux/actions/UtilityAction";

const LoadableCalculator = () => {
  const { register, setValue } = useForm();
  const dispatch = useDispatch();
  const LoadableCalculatorInput = useSelector(state => state.utitlityInfo.LoadableCalculatorInput);

  const changeText = (name, value) => {
    dispatch(changeTextInput(name, value))
  }

  const printValue = (value) => {
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(value)
  }

  // console.log('LoadableCalculatorInput :>> ', LoadableCalculatorInput);
  const courseData = [
    {
      id: 1,
      name: "cse",
    },
    {
      id: 1,
      name: "EEE",
    },
    {
      id: 1,
      name: "MBA",
    },
  ];

  let CourseName = [];
  if (courseData) {
    courseData.forEach((item) => {
      let items = {
        value: item.id,
        label: item.name,
      };
      CourseName.push(items);
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12">
            <div className="card card-custom gutter-b pl-5 pr-5 mb-1">
              <div className="mt-5">
                <h3 className="mb-0 pb-0">Loadable Calculator</h3>
              </div>
              <hr></hr>
              <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              >
                <div className="form-group row">
                  <div className="col-6">
                    <label className="formFont">Vessel Name</label>
                    <RHFInput
                      as={<Select options={CourseName} />}
                      rules={{ required: false }}
                      name="strVesselName"
                      register={register}
                      value={CourseName.label}
                      setValue={setValue}
                    />
                  </div>
                  <div className="col-6 ">
                    <Form.Group>
                      <Form.Label className="formFont pl-1">Draft</Form.Label>
                      <Form.Control
                        className="formHeight"
                        type="text"
                        placeholder="500"
                        name="intDraft"
                        onChange={(e) => changeText("intDraft", e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </form>
            </div>
            <div className="card card-custom gutter-b pl-5 pr-5 mb-5 pb-2 pt-3">
              {/* <form
                className="form form-label-right voyageEngineerForm"
                method="post"
              > */}
              <div className="form-group row">
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">DWT</Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="100.1"
                      name="intDWT"
                      onChange={(e) => changeText("intDWT", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">FW</Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="150.02"
                      name="intFW"
                      onChange={(e) => changeText("intFW", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">TPC</Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="256.3"
                      name="intTPC"
                      onChange={(e) => changeText("intTPC", e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">IFO</Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="100.1"
                      name="intIFO"
                      onChange={(e) => changeText("intIFO", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">MGO</Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="150.02"
                      name="intMGO"
                      onChange={(e) => changeText("intMGO", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">FWA</Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="256.3"
                      name="intFWA"
                      onChange={(e) => changeText("intFWA", e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">
                      Summer Draft
                      </Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="100.1"
                      name="intSummerDraft"
                      onChange={(e) => changeText("intSummerDraft", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">
                      Unpumpable Ballast
                      </Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="150.02"
                      name="intUnpumpableBallast"
                      onChange={(e) => changeText("intUnpumpableBallast", e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-xl-3 col-lg-3 col-6 ">
                  <Form.Group>
                    <Form.Label className="formFont pl-1">
                      Constant
                      </Form.Label>
                    <Form.Control
                      className="formHeight"
                      type="text"
                      placeholder="256.3"
                      name="intConstant"
                      onChange={(e) => changeText("intConstant", e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
            <div className="card card-custom gutter-b pl-5  mb-5 pb-5">
              <div className="mt-5">
                <h3 className="mb-0 pb-0">
                  <img src="/media/svg/icons/Code/calculator.svg" />
                  <span className="ml-3">Calculator</span>
                </h3>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-6">Differ</div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.differ)}</div>
                <div className="col-xl-7 col-lg-7 col-6">Differincm</div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.differincm)}</div>
                <div className="col-xl-7 col-lg-7 col-6">Deductable</div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.deductable)}</div>
                <div className="col-xl-7 col-lg-7 col-6 text-bold mt-3">
                  Actual Load
                </div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.actualLoad)}</div>
                <div className="col-xl-7 col-lg-7 col-6">Deductable Load</div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.deductableLoad)}</div>
                <div className="col-xl-7 col-lg-7 col-6">Deductable for FWA</div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.deductableForFWA)}</div>
                <div className="col-xl-7 col-lg-7 col-6 text-bold">
                  Total Deductable
                </div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.totalDeductable)}</div>
                <div className="col-xl-7 col-lg-7 col-6 text-bold mt-3">
                  Loadable Qty for Freshwater
                </div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.freshwater)}</div>
                <div className="col-xl-7 col-lg-7 col-6 text-bold mt-1">
                  Loadable Qty for Seawater
                </div>
                <div className="col-1">:</div>
                <div className="col-xl-4 col-lg-4 col-5">{printValue(LoadableCalculatorInput.seawater)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadableCalculator;
