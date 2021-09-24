import React from "react";
import { useTable } from "react-table";
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from "@coreui/react";

function MainTable({columns, data}){
    console.log(data);
    console.log(columns);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
      });
      let i=0;
    return (
        <CTable {...getTableProps()}>
      <CTableHead>
        {headerGroups.map((headerGroup) => (
          <CTableRow key={i++} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <CTableHeaderCell key={i++} {...column.getHeaderProps()}>
                {column.render("Header")}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        ))}
      </CTableHead>
      <CTableBody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <CTableRow key={index} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <CTableDataCell key={i++} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </CTableDataCell>
                );
              })}
            </CTableRow>
          );
        })}
      </CTableBody>
    </CTable>
    )
}

export default MainTable;