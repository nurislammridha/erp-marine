import React from "react";
import { Pagination } from "react-laravel-paginex";

const PaginationLaravel = (props) => {
  const { data, changePage, isDescription } = props;
  const limit = 10;

  return (
    <>
      {typeof data !== "undefined" && data !== null && data.total > 5 && (
        <>
          {typeof data !== "undefined" &&
            data != null &&
            typeof isDescription !== "undefined" &&
            isDescription === false &&
            data.total > limit && (
              <div className="d-flex">
                <div className="mx-auto">
                  <Pagination changePage={changePage} data={data} />
                </div>
              </div>
            )}

          {typeof data !== "undefined" &&
            data != null &&
            (typeof isDescription === "undefined" || isDescription === true) &&
            data !== null && (
              <div className="d-flex">
                <div className="mx-auto">
                  <div className="row col-12">
                    <div className="col-12">
                      Data - {data.from} to {data.to} | Total{" "}
                      {parseInt(data.to) - parseInt(data.from) + 1}{" "}
                      | Out of {data.total}
                    </div>

                    {/* {
                                data.total > limit && */}
                    <div className="col-6">
                      <Pagination changePage={changePage} data={data} />
                    </div>
                    {/* } */}
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
};

export default PaginationLaravel;
