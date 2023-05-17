import React from "react";
import ReactExport from "react-data-export";
import moment from "../../../node_modules/moment/moment";
import { RiFileExcel2Fill } from "react-icons/ri";
// import { SiMicrosoftexcel } from "react-icons/si";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportToExcel({ dataSet }) {
  return (
    <ExcelFile
      element={
        <>
          <button className="excelbutton">
            <RiFileExcel2Fill size={"5rem"} color="#1D6F42"></RiFileExcel2Fill>
          </button>
          {/* <button className="excelbutton">
            <SiMicrosoftexcel size={"5rem"} color="#1D6F42"></SiMicrosoftexcel>
          </button> */}
        </>
      }
    >
      <ExcelSheet data={dataSet} name="SubTasks">
        {/* <ExcelColumn label="ID" value="_id" /> */}
        <ExcelColumn
          label="Task"
          style={{ color: "red" }}
          value={(col) => col?.task?.reference}
        />
        <ExcelColumn label="Item" value={(col) => col?.item?.name} />
        <ExcelColumn
          label="Item Status"
          value={(col) => col?.itemStatus?.name}
        />
        <ExcelColumn label="Number" value="itemNumber" />
        <ExcelColumn label="Comment" value="itemComment" />
        <ExcelColumn label="System" value={(col) => col?.system?.name} />
        <ExcelColumn label="Instance" value={(col) => col?.instance?.name} />
        <ExcelColumn label="Task Model" value={(col) => col?.taskModel?.name} />
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
export default ExportToExcel;
