import React from "react"
import { Link } from "react-router-dom"
import * as moment from "moment"
import { Badge } from "reactstrap"

const formateDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const date1 = moment(new Date(date)).format(dateFormat)
  return date1
}
const toLowerCase1 = str => {
  return str === "" || str === undefined ? "" : str.toLowerCase()
}

const CheckBox = cell => {
  return cell.value ? cell.value : ""
}

const OrderId = cell => {
  return (
    <span
      className={`fw-bold ${
        cell.value && cell.value.slice(0, 1) === "Z"
          ? "text-danger"
          : " text-success"
      }`}
    >
      {cell.value ? cell.value : ""}
    </span>
  )
}

const BillingName = cell => {
  return cell.value ? cell.value.firstName : ""
}

const Date = cell => {
  return moment(cell.value).format("YYYY-MM-DD HH:mm")
    ? moment(cell.value).format("YYYY-MM-DD HH:mm")
    : ""
}

const Total = cell => {
  return cell.value ? cell.value : ""
}

const PaymentStatus = cell => {
  return (
    <Badge
      className={
        "font-size-12 badge-soft-" +
        (cell.value === "Paid"
          ? "success"
          : "danger" && cell.value === "Refund"
          ? "warning"
          : "danger")
      }
      pill
    >
      {cell.value}
    </Badge>
  )
}
const PaymentMethod = cell => {
  return (
    <span>
      <i
        className={
          cell.value === "Paypal"
            ? "fab fa-cc-paypal me-1"
            : "" || cell.value === "COD"
            ? "fab fas fa-money-bill-alt me-1"
            : "" || cell.value === "Mastercard"
            ? "fab fa-cc-mastercard me-1"
            : "" || cell.value === "Visa"
            ? "fab fa-cc-visa me-1"
            : ""
        }
      />{" "}
      {cell.value}
    </span>
  )
}
export {
  CheckBox,
  OrderId,
  BillingName,
  Date,
  Total,
  PaymentStatus,
  PaymentMethod,
}
