import React from "react";
import "./excel.css";

import ReactExport from "react-data-export";
import moment from "../../../node_modules/moment/moment";
import { RiFileExcel2Fill } from "react-icons/ri";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportTaskToExcel({ dataSet }) {
  return (
    <ExcelFile
      element={
        <button className="excelbutton">
          <RiFileExcel2Fill size={"5rem"} color="#1D6F42"></RiFileExcel2Fill>
        </button>
      }
    >
      <ExcelSheet data={dataSet} name="tasks">
        {/* <ExcelColumn label="ID" value="_id" /> */}
        <ExcelColumn label="Task" value="reference" />
        <ExcelColumn label="Description" value="description" />
        <ExcelColumn label="Task Model" value={(col) => col?.taskModel?.name} />
        <ExcelColumn label="System" value={(col) => col?.system?.name} />
        <ExcelColumn label="Instance" value={(col) => col?.instance?.name} />
        <ExcelColumn
          label="Start Date"
          value={(col) =>
            moment(col?.startDate).locale("fr").format("DD/MM/YY")
          }
        />
        <ExcelColumn
          label="End Date"
          value={(col) => moment(col?.endDate).locale("fr").format("DD/MM/YY")}
        />
        <ExcelColumn
          label="Dedline"
          value={(col) => moment(col?.dedline).locale("fr").format("DD/MM/YY")}
        />

        <ExcelColumn label="Status" value={(col) => col?.status?.name} />
        <ExcelColumn
          label="Responsible User"
          value={(col) => col?.responsibleUser?.name}
        />

        <ExcelColumn
          label="Created At"
          value={(col) =>
            moment(col?.createdAt).locale("fr").format("DD/MM/YY")
          }
        />
        <ExcelColumn label="Created By" value={(col) => col?.createdBy?.name} />
      </ExcelSheet>
    </ExcelFile>
  );
}
export default ExportTaskToExcel;
