import {format} from "date-fns"
import ColumnFilter from "./ColumnFilter";
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor:"id",
    Filter:ColumnFilter
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor:"first_name",
    Filter:ColumnFilter
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor:"last_name",
    Filter:ColumnFilter
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor:"email",
    Filter:ColumnFilter
  },
  {
    Header: "Date Of Birth",
    Footer: "Date Of Birth",
    accessor:"date_of_birth",
    Cell:({value})=>{return format(new Date(value),'dd/MM/yyyy')},
    Filter:ColumnFilter
  },
  {
    Header: "age",
    Footer: "age",
    accessor:"age",
    Filter:ColumnFilter
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor:"Country",
    Filter:ColumnFilter
  },

  {
    Header: "Phone Number",
    Footer: "Phone Number",
    accessor:"Phone",
    Filter:ColumnFilter
  },
];
