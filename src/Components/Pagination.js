import React, { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./colunms";
import "./table.css";
import GlobalFilter from "./GlobalFilter";

export const Pagination = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state; //destructured Globalfilter state from all the state in react-table

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
        <div className="pagination">
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            | Go to Page :{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "30px"}}
            />
            {" "}
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            {[5, 10, 25, 50].map((pageSize) => (
              <option value={pageSize} key={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          {"  "}
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {" "}
            {"<<"}
            {" "}
          </button>
          {" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          {" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
          {" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canPreviousPage}
          >
            {" "}
            {">>"}{" "}
          </button>
        </div>
        </tfoot>
      </table>
    </>
  );
};

export default Pagination;
