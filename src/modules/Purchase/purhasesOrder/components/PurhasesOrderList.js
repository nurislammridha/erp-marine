import React from 'react';
import { IconButton, InputBase, Paper } from '@material-ui/core';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleModal from '../../../master/components/Modal/SimpleModal';
const PurhasesOrderList = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <div className="react-bootstrap-table table-responsive mt-0">
            <table className="table table table-head-custom table-vertical-center  voyageTable">
              <thead>
                <tr>
                  <th scope="col">PO NO</th>
                  <th scope="col">PO DATE</th>
                  <th scope="col">PO CATEGORY</th>
                  <th scope="col">REMARKS</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>12 Feb, 2021</td>
                  <td>Lorem Ipsom</td>
                  <td>Lorem ipsum dolor sit amet.</td>
                  <td>
                    <button className="btn rejected-status booking-list-btn text-danger">
                      Approved
                        </button>
                  </td>
                  <td>
                    {""}
                    <div className="d-flex">
                      <Link>
                        <i className="far fa-eye editIcon item-list-icon"></i>
                      </Link>
                      <Link>
                        <i className="far fa-edit editIcon item-list-icon ml-2"></i>
                      </Link>
                      <a href>
                        <i className="fas fa-trash-alt editIcon item-list-icon ml-2"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </Card.Body >
      </Card >
    </>
  );
};

export default PurhasesOrderList;