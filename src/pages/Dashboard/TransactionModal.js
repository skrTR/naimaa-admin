import React, { useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import img7 from "../../assets/images/ihelp.png"
import img4 from "../../assets/images/ihelp.png"
import axios from "axios"
import { getTransactionDetail as onGetTransactionDetail } from "store/actions"
//redux
import { useSelector, useDispatch } from "react-redux"
import { isEmpty } from "lodash"

const TransactionModal = props => {
  const { isOpen, toggle, clickedId, userName, bucket } = props
  const dispatch = useDispatch()
  const { transactions } = useSelector(state => ({
    transactions: state.transactions.transactions,
  }))
  useEffect(() => {
    if (clickedId) {
      dispatch(onGetTransactionDetail(clickedId))
    }
  }, [dispatch, isOpen])
  const result = transactions.reduce(
    (total, currentValue) => (total = total + currentValue.finalPrice),
    0
  )

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Гүйлгээний дэлгэрэнгүй</ModalHeader>
        {!isEmpty(transactions) && (
          <ModalBody>
            <p className="mb-2">
              Гүйлгээний дугаар: <span className="text-primary">{bucket}</span>
            </p>
            <p className="mb-4">
              Хэрэглэгч: <span className="text-primary">{userName}</span>
            </p>

            <div className="table-responsive">
              <Table className="table align-middle table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Зураг</th>
                    <th scope="col">Бүтээгдэхүүн</th>
                    <th scope="col">Үнэ</th>
                  </tr>
                </thead>

                {transactions.map(e => {
                  return (
                    <tbody key={e._id}>
                      <tr>
                        <th scope="row">
                          {e.good && (
                            <div>
                              <img
                                src={`http://134.209.105.119/upload/${e.good.photo}`}
                                alt=""
                                className="avatar-sm"
                              />
                            </div>
                          )}
                        </th>
                        <td>
                          <div>
                            <h5 className="text-truncate font-size-14">
                              {e.good && e.good.name}
                            </h5>
                            <p className="text-muted mb-0">
                              {e.price}₮ x {e.quantity}
                            </p>
                          </div>
                        </td>
                        <td>{e.finalPrice}₮</td>
                      </tr>
                    </tbody>
                  )
                })}
                <tr>
                  <td colSpan="2">
                    <h6 className="m-0 text-end">Нийт:</h6>
                  </td>
                  <td>{result}₮</td>
                </tr>
              </Table>
            </div>
          </ModalBody>
        )}

        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

TransactionModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default TransactionModal
