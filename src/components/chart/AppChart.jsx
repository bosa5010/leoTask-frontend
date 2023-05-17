import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({
  title,
  data,
  dataKeyX,
  dataKeyY,
  strokeY,
  grid,
}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width={"95%"} aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey={dataKeyX} stroke={strokeY} />
          <Line type="monotone" dataKey={dataKeyY} stroke={strokeY} />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
