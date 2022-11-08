import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"

import { Name, Email, CreatedAt, Point } from "./tableCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import DeleteModal from "components/Common/DeleteModal"

import {
  getUsers as onGetUsers,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "store/contacts/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"

const UserList = props => {
  //meta title
  document.title = "Бүх хэрэглэгчид"

  const dispatch = useDispatch()
  const [contact, setContact] = useState()
  // valid
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      firstName: (contact && contact.firstName) || "",
      phone: (contact && contact.phone) || "",
      email: (contact && contact.email) || "",
      role: (contact && contact.role) || "",
      deadline: (contact && contact.deadline) || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your Name"),
      phone: Yup.string().required("Please Enter Your phone"),
      email: Yup.string().required("Please Enter Your Email"),
      role: Yup.string().required("Please Enter Your role"),
      deadline: Yup.string().required("Please Enter Your deadline"),
    }),
    onSubmit: values => {
      const updateUser = {
        id: contact.id,
        firstName: values.firstName,
        phone: values.phone,
        email: values.email,
        role: values.role,
        deadline: values.deadline,
      }
      // update user
      dispatch(onUpdateUser(updateUser))
      validation.resetForm()
      setIsEdit(false)
      toggle()
    },
  })
  const { users } = useSelector(state => ({
    users: state.contacts.users,
  }))

  const [userList, setUserList] = useState([])
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const columns = useMemo(
    () => [
      {
        Header: "Про",
        // accessor: "name",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.profile ? (
              <div className="avatar-xs">
                <span className="avatar-title rounded-circle">
                  {cellProps.firstName.slice(0, 1)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded-circle avatar-xs"
                  src={`https://ihelp-hr.com/upload/${cellProps.profile}`}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Нэр",
        accessor: "firstName",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Утас",
        accessor: "phone",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Үүсгэсэн огноо",
        accessor: "createdAt",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <CreatedAt {...cellProps} />
        },
      },
      {
        Header: "Үйлчилгээний эрх",
        accessor: "deadline",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <CreatedAt {...cellProps} />
        },
      },
      {
        Header: "Action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const userData = cellProps.row.original
                  handleUserClick(userData)
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Өөрчлөх
                </UncontrolledTooltip>
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Устгах
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers())
      setIsEdit(false)
    }
  }, [dispatch, users])

  useEffect(() => {
    setContact(users)
    setIsEdit(false)
  }, [users])

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users)
      setIsEdit(false)
    }
  }, [users])

  const toggle = () => {
    setModal(!modal)
  }

  const handleUserClick = arg => {
    const user = arg

    setContact({
      id: user._id,
      firstName: user.firstName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      deadline: user.deadline,
    })
    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }
  //delete customer
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = users => {
    setContact(users)
    setDeleteModal(true)
  }

  const handleDeleteUser = () => {
    dispatch(onDeleteUser(contact))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  const handleUserClicks = () => {
    setUserList("")
    setIsEdit(false)
    toggle()
  }

  const keyField = "id"

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbItem="Хэрэглэгчид" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={users}
                    isGlobalFilter={true}
                    handleUserClick={handleUserClicks}
                    customPageSize={10}
                    className="custom-header-css"
                  />

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      Хэрэглэгч шинэчлэх
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Нэр</Label>
                              <Input
                                name="firstName"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.firstName || ""}
                                invalid={
                                  validation.touched.firstName &&
                                  validation.errors.firstName
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.firstName &&
                              validation.errors.firstName ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.firstName}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Утас</Label>
                              <Input
                                name="phone"
                                label="Phone"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.phone || ""}
                                invalid={
                                  validation.touched.phone &&
                                  validation.errors.phone
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.phone &&
                              validation.errors.phone ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.phone}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">И-мэйл</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Ролэ</Label>
                              <Input
                                id="role"
                                name="role"
                                type="select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.role || ""}
                                invalid={
                                  validation.touched.role &&
                                  validation.errors.role
                                    ? true
                                    : false
                                }
                              >
                                <option>user</option>
                                <option>operator</option>
                                <option>admin</option>
                              </Input>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">
                                Үйлчилгээний эрх
                              </Label>
                              <Input
                                name="deadline"
                                label="deadline"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.deadline || ""}
                                invalid={
                                  validation.touched.deadline &&
                                  validation.errors.deadline
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.deadline &&
                              validation.errors.deadline ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.deadline}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Хадгалах
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserList)
