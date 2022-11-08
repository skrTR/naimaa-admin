import React, { useEffect, useState, useMemo } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { isEmpty } from "lodash"

import { Button, Card, CardBody } from "reactstrap"
import { getTransactions as onGetTransactions } from "store/actions"

import TransactionModal from "./TransactionModal"

import {
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
} from "./LatestTranactionCol"

import TableContainer from "../../components/Common/TableContainer"

//redux
import { useSelector, useDispatch } from "react-redux"

const LatestTranaction = props => {
  const dispatch = useDispatch()

  const { transactions } = useSelector(state => ({
    transactions: state.transactions.transactions,
  }))

  useEffect(() => {
    dispatch(onGetTransactions())
  }, [dispatch])
  const [clickedId, setClickedId] = useState("")
  const [bucket, setBucket] = useState("")
  const [userName, setUserName] = useState("")
  const [modal1, setModal1] = useState(false)
  const [transactionList, setTransactionList] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const toggleViewModal = () => setModal1(!modal1)
  const columns = useMemo(
    () => [
      {
        Header: "Гүйлгээний дугаар",
        accessor: "number",
        filterable: true,
        disableFilters: true,
        Cell: cellProps => {
          return <OrderId {...cellProps} />
        },
      },
      {
        Header: "Гүйлгээ хийсэн хэрэглэгч",
        accessor: "createUser",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <BillingName {...cellProps} />
        },
      },
      {
        Header: "Хугацаа",
        accessor: "createdAt",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <Date {...cellProps} />
        },
      },
      {
        Header: "Нийт",
        accessor: "finalPrice",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <Total {...cellProps} />
        },
      },
      {
        Header: "Төлбөрийн төрөл",
        accessor: "incomeType",
        disableFilters: true,
        filterable: true,
        Cell: cellProps => {
          return <Total {...cellProps} />
        },
      },

      {
        Header: "Дэлгэрэнгүй",
        disableFilters: true,
        accessor: "view",
        Cell: cellProps => {
          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() => {
                const transactionsId = cellProps.row.original
                handleTransactionId(transactionsId)
                toggleViewModal()
              }}
            >
              Үзэх
            </Button>
          )
        },
      },
    ],
    []
  )

  useEffect(() => {
    if (transactions && !transactions.length) {
      onGetTransactions()
    }
  }, [onGetTransactions, transactions])

  useEffect(() => {
    setTransactionList(transactions)
  }, [transactions])

  useEffect(() => {
    if (!isEmpty(transactions) && !!isEdit) {
      setTransactionList(transactions)
      setIsEdit(false)
    }
  }, [transactions])
  const handleTransactionId = arg => {
    const transaction = arg
    setClickedId(transaction.id)
    setUserName(arg.createUser && arg.createUser.firstName)
    setBucket(arg.number)
  }
  return (
    <React.Fragment>
      <TransactionModal
        isOpen={modal1}
        toggle={toggleViewModal}
        clickedId={clickedId}
        userName={userName}
        bucket={bucket}
      />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title">
            Аппд ашиглаж байгаа сүүлийн гүйлгээнүүд
          </div>
          <TableContainer
            columns={columns}
            data={transactions}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={6}
          />
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

LatestTranaction.propTypes = {
  transactions: PropTypes.array,
  onGetTransactions: PropTypes.func,
}

export default withRouter(LatestTranaction)
