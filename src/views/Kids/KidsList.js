/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { fetchKids } from "action/KidsActions";
import { generateImageUrl } from "constant";
import AssignedUsersModal from "./AssignedUsersModal";
import { NavLink } from "react-router-dom";

class KidsList extends React.Component {
  state = {
    kids: [],
    selectedKid: {},
    modalVisible: false,
  };

  componentDidMount = () => {
    fetchKids().then(({ data }) => {
      this.setState({
        kids: data,
      });
    });
  };

  kidRender = ({ kid }) => {
    return (
      <tr>
        <th scope="row">
          <Media className="align-items-center">
            <a
              className="avatar rounded-circle mr-3"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="..."
                src={generateImageUrl(kid.avatar.formats.thumbnail.url)}
              />
            </a>
            <Media>
              <span className="mb-0 text-sm">{kid.username}</span>
            </Media>
          </Media>
        </th>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              onClick={(e) => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem href="#pablo" onClick={() => this.onModalOpen(kid)}>
                Assigned Users
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
    );
  };

  onModalClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  onModalOpen = (selectedKid) => {
    this.setState({
      selectedKid,
      modalVisible: true,
    });
  };

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className=" border-0">
                  <div className="align-items-center row">
                    <h3 className="col mb-0">Total KidsList</h3>
                    <div className="col text-right">
                      <NavLink
                        to="/admin/kids-create"
                        className="btn btn-primary btn-sm"
                      >
                        Add New Kid
                      </NavLink>
                    </div>
                  </div>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.kids.map((data) => this.kidRender(data))}
                  </tbody>
                </Table>
                <CardFooter className="py-4"></CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
        <AssignedUsersModal
          visible={this.state.modalVisible}
          onClose={this.onModalClose}
          kid={this.state.selectedKid}
        />
      </>
    );
  }
}

export default KidsList;
