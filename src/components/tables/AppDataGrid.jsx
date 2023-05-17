import { useEffect, useRef, useState } from "react";
// import { DataGrid } from "@material-ui/data-grid";

// import { DataGrid } from "@mui/x-data-grid";

import { DataGridPro } from "@mui/x-data-grid-pro";

import { Box } from "@material-ui/core";
import "./appdatagrid.css";
import { ActionStatus } from "../ActionStatus";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function AppDataGrid({
  tableRows,
  columns,
  page = 1,
  pageSize = 15,
  rowCount = 8,
  loading = false,
  error = false,
  onPageChange,
  onPageSizeChange,
  onUpdatePress,
  onDeletePress,
  popper = true,
  containerHeight = 800,
  ...props
}) {
  const popperRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  const open = Boolean(anchorEl);

  useEffect(() => {}, [pageSize]);

  const handlePopperOpen = (event) => {
    const id = event.currentTarget.dataset.id;
    setValue(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = (event) => {
    if (popper) {
      if (
        anchorEl == null ||
        popperRef.current.contains(event.nativeEvent.relatedTarget)
      ) {
        return;
      }
    }

    setAnchorEl(null);
  };

  return (
    <>
      {loading || error ? (
        <ActionStatus loading={loading} error={error} />
      ) : (
        <Box p={1} style={{ height: containerHeight, width: "100%" }}>
          <DataGridPro
            density="compact"
            // isableSelectionOnClick
            // checkboxSelection
            rowHeight={70}
            pagination={true}
            paginationMode="server"
            loading={loading}
            rowCount={Number(rowCount)}
            rows={tableRows ? tableRows : []}
            columns={columns}
            otherProps
            getRowId={(row) => row._id}
            pageSizeOptions={[1, 3, 5, 10, 15, 50, 100, 1000]}
            onPaginationModelChange={(data) => {
              page !== data?.page && onPageChange(data?.page);
              pageSize !== data.pageSize && onPageSizeChange(data?.pageSize);
            }}
            getCellClassName={() => {
              return "rowitem";
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageSize ? Number(pageSize) : 15,
                  // pageSize: pageSize,
                  page: page ? page : 0,
                },
              },
            }}
            // localeText={frFR.props.MuiDataGrid.localeText}
            {...props}
            componentsProps={{
              row: {
                onMouseEnter: handlePopperOpen,
                onMouseLeave: handlePopperClose,
              },
            }}
            sx={{
              // zIndex: 1000,
              // "& .MuiDataGrid-window": {
              //   zIndex: 1000,

              // },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F0F0F0",
                // zIndex: 1000,
              },
              // "& .MuiDataGrid-row": {
              //   zIndex: 10,
              // },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#F0F0F0",
              },
            }}
          />

          <Popper
            ref={popperRef}
            open={popper && open}
            anchorEl={anchorEl}
            placement={"right"}
            disablePortal={true}
            onMouseLeave={() => setAnchorEl(null)}
          >
            {({ TransitionProps }) => (
              <Paper
                sx={{
                  transform: "translateX(-140px)",
                  zIndex: 100,
                }}
              >
                <Button
                  style={{ color: "green" }}
                  onClick={() => onUpdatePress(value)}
                >
                  Edit
                </Button>
                <Button
                  style={{ color: "red" }}
                  onClick={() => onDeletePress(value)}
                >
                  Delete
                </Button>
              </Paper>
            )}
          </Popper>
        </Box>
      )}
    </>
  );
}
