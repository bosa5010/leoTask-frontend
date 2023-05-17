import "./featuredInfo.css";
// import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo({
  // totalDailyCash,
  // totalSales,
  // totalBuys,
  // profits,
  // incomingPayment,
  // outgoingPayment,
  dailyCashInfo,
}) {
  const {
    totalDailyCash,
    totalSales,
    totalBuys,
    profits,
    incomingPayment,
    outgoingPayment,
  } = dailyCashInfo;
  return (
    <div>
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Total DailyCash</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totalDailyCash.toFixed(3)}</span>
            {" DTN"}
            {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
          </div>
          <span className="featuredSub">Total Cash In Cash Box</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Total Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totalSales.toFixed(3)}</span>
            {" DTN"}
            {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
          </div>
          <span className="featuredSub">Total of Sales</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Total Purchases</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{totalBuys.toFixed(3)}</span>
            {" DTN"}
            {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
          </div>
          <span className="featuredSub">Total Of Purchases</span>
        </div>
      </div>
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Collection</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{incomingPayment.toFixed(3)}</span>
            {" DTN"}
            {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
          </div>
          <span className="featuredSub">Cash In Of The Day</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Disbursement</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{outgoingPayment.toFixed(3)}</span>
            {" DTN"}
            {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
          </div>
          <span className="featuredSub">Disbursement Of The Day</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Benefits</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{profits.toFixed(3)}</span>
            {" DTN"}
            {/* <span className="featuredMoneyRate">
              +2.4 <ArrowUpward className="featuredIcon" />
            </span> */}
          </div>
          <span className="featuredSub">Daily Benefits</span>
        </div>
      </div>
    </div>
  );
}
