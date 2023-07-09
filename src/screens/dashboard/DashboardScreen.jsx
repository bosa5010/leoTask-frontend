import React, { useCallback, useEffect, useRef, useState } from "react";
import "./dashboard.css";

import "devextreme/dist/css/dx.light.css";
import PivotGridDataSource from "devextreme/ui/pivot_grid/data_source";

import Chart, {
  AdaptiveLayout,
  CommonSeriesSettings,
  Size,
  Tooltip,
} from "devextreme-react/chart";

import PivotGrid, { FieldChooser } from "devextreme-react/pivot-grid";
import { useDispatch, useSelector } from "react-redux";
import { listSubTasks } from "../../redux/actions/subTaskActions";
import moment from "../../../node_modules/moment/moment";
import AppDataGrid from "../../components/tables/AppDataGrid";
import { Link } from "react-router-dom";
import SubTaskFilter from "../tasks/SubTaskFilter";
import { objectId } from "../../utils";

function customizeTooltip(args) {
  return {
    html: `${args.seriesName} | Total<div class="currency">${args.originalValue}</div>`,
  };
}

export default function DashboardScreen() {
  const [filter, setFilter] = useState(false);
  const [listOfSystems, setListSystems] = useState("");
  const [listTaskModel, setLisTaskModel] = useState("");
  const [listInstance, setListInstance] = useState("");
  const [listItem, setListItem] = useState("");
  const [listItemStatus, setListItemStatus] = useState("");
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");

  let pivotGrid = useRef();
  let chart = useRef();

  const subTaskList = useSelector((state) => state.subTaskList);
  const { loading, error, subTasks, pages, pageNumber, pageSize } = subTaskList;

  const dispatch = useDispatch();

  const dispatchSubTaskList = useCallback(
    (pageNumber, pageSize, value, key) => {
      let tempObject = {
        pageNumber,
        pageSize,
        taskModels: listTaskModel?._id,
        systems: objectId(listOfSystems),
        instance: objectId(listInstance),
        items: objectId(listItem),
        itemStatus: objectId(listItemStatus),
        firstDate: firstDate,
        lastDate: lastDate,
        taskStep: "null",
      };

      tempObject[key] = value;

      dispatch(listSubTasks(tempObject));
    },
    [
      dispatch,
      listTaskModel,
      listOfSystems,
      listInstance,
      listItem,
      listItemStatus,
      firstDate,
      lastDate,
    ]
  );

  useEffect(() => {
    dispatchSubTaskList(1, 100);
  }, [dispatchSubTaskList]);

  useEffect(() => {
    pivotGrid.bindChart(chart, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false,
    });
    // setTimeout(() => {
    //   dataSource.expandHeaderItem("row", ["Africa"]);
    //   dataSource.expandHeaderItem("column", [2013]);
    // });
  });

  const dataSource = new PivotGridDataSource({
    fields: [
      {
        caption: "Task Theme",
        width: 120,
        dataField: "taskModel.taskTheme.name",
        area: "row",
        sortBySummaryField: "Total",
      },
      {
        caption: "Task Model",
        width: 120,
        dataField: "taskModel.name",
        area: "row",
        sortBySummaryField: "Total",
      },
      {
        caption: "System",
        dataField: "system.name",
        width: 150,
        area: "row",
      },
      {
        caption: "Instance",
        dataField: "instance.name",
        width: 150,
        area: "row",
      },
      {
        caption: "Item",
        dataField: "item.name",
        width: 150,
        area: "row",
      },
      {
        caption: "Item Status",
        dataField: "itemStatus.name",
        width: 150,
        area: "row",
      },

      {
        area: "column",
        dataField: "createdAt",
        dataType: "date",
        groupInterval: "year",
      },
      {
        area: "column",
        dataField: "createdAt",
        dataType: "date",
        groupInterval: "quarter",
      },
      {
        area: "column",
        dataField: "createdAt",
        dataType: "date",
        groupInterval: "month",
      },
      {
        area: "column",
        dataField: "createdAt",
        dataType: "date",
        groupInterval: "day",
      },
      {
        area: "column",
        dataField: "createdAt",
        dataType: "date",
        groupInterval: "dayOfWeek",
      },
      {
        caption: "Total",
        dataField: "itemNumber",
        dataType: "number",
        summaryType: "sum",
        area: "data",
      },
    ],
    store: subTasks,
  });

  const subTasksHeadCells = [
    // {
    //   field: "_id",
    //   headerName: "id",
    //   hide: true,
    //   type: "string",
    // },

    {
      field: "task",
      headerName: "Task",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <Link to={`/subtask/${params.row?.task?._id}/edit`}>
            <button className="itemListEdit">
              {params.row?.task?.reference}
            </button>
          </Link>
        </div>
      ),
    },
    {
      field: "item",
      headerName: "Item",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.item?.name}</div>
      ),
    },
    {
      field: "itemStatus",
      headerName: "Item Status",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",

      renderCell: (params) => (
        <div className="cellItems">{params.row?.itemStatus?.name}</div>
      ),
    },
    {
      field: "itemNumber",
      headerName: "Number",
      flex: 1,
      type: "number",
      headerClassName: "headeritem",
    },
    {
      field: "itemComment",
      headerName: "Comment",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
    },

    {
      field: "system",
      headerName: "System",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.system?.name}</div>
      ),
      type: "string",
    },
    {
      field: "instance",
      headerName: "Instance",
      type: "string",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.instance?.name}</div>
      ),
    },
    {
      field: "taskModel",
      headerName: "Task Model",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      valueFormatter: (params) => params.row?.taskModel?.name,
      renderCell: (params) => (
        <div className="cellItems">{params.row?.taskModel?.name}</div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div>
          <p>{moment(params.value).locale("fr").format("DD/MM/YY")}</p>
        </div>
      ),
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => (
        <div className="cellItems">{params.row?.createdBy?.name}</div>
      ),
    },
  ];

  return (
    <div className="content">
      <SubTaskFilter
        filter={filter}
        setFilter={setFilter}
        listOfSystems={listOfSystems}
        setListSystems={setListSystems}
        listTaskModel={listTaskModel}
        setLisTaskModel={setLisTaskModel}
        listInstance={listInstance}
        setListInstance={setListInstance}
        listItem={listItem}
        setListItem={setListItem}
        listItemStatus={listItemStatus}
        setListItemStatus={setListItemStatus}
        firstDate={firstDate}
        setFirstDate={setFirstDate}
        lastDate={lastDate}
        setLastDate={setLastDate}
        dispatchSubTaskList={dispatchSubTaskList}
        href={"dashboard"}
      />

      <div>
        <h1>Chart : </h1>

        <Chart
          ref={(ref) => {
            chart = ref?.instance;
          }}
        >
          <Size height={250} />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
          <CommonSeriesSettings type="bar" />
          <AdaptiveLayout width={400} />
        </Chart>
      </div>

      <div>
        <h1>Items Summary : </h1>
        <PivotGrid
          id="pivotgrid"
          dataSource={dataSource}
          allowSortingBySummary={true}
          allowFiltering={true}
          showBorders={true}
          showColumnTotals={false}
          showColumnGrandTotals={false}
          showRowTotals={false}
          showRowGrandTotals={false}
          ref={(ref) => {
            pivotGrid = ref?.instance;
          }}
        >
          <FieldChooser enabled={true} height={450} />
        </PivotGrid>
      </div>

      <div>
        <h1>SubTasks List : </h1>
        <AppDataGrid
          columns={subTasksHeadCells}
          tableRows={subTasks}
          page={pageNumber - 1}
          pageSize={Number(pageSize)}
          rowCount={Number(pages)}
          loading={loading}
          error={error}
          popper={false}
          onPageChange={(data) => {
            dispatchSubTaskList(data + 1, pageSize);
          }}
          onPageSizeChange={(data) => {
            dispatchSubTaskList(data < pages ? pageNumber : 1, data);
          }}
        />
      </div>
    </div>
  );
}
