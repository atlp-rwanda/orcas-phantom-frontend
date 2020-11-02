import React from "react";
import arrowUpIcon from "App/assets/images/arrow-up-dashboard-icon.svg";
import busIcon from "App/assets/images/bus-dashboard-icon.svg";
import busStopsIcon from "App/assets/images/busStops-icon.svg";
import routesIcon from "App/assets/images/routes-icon.svg";
import { Bar, Line } from "react-chartjs-2";
import CountUp from "react-countup";
import tripsSearched from "shared/constants/tripsSearched";
import activeBuses from "shared/constants/activeBuses";
import {
  totalBuses,
  totalBusStops,
  totalRoutes,
} from "shared/constants/currentData";
import {
  DashWrapper,
  Stats,
  Charts,
  Chart,
  Table,
  MiniFooter,
  Functions,
  Statistics,
  Stat,
  StatTxt,
  StatIcon,
  Change,
} from "shared/styles/dashboard/statsPage";

const Dashboard = () => {
  return (
    <DashWrapper>
      <Stats>
        <Functions>
          <div>
            <button>New</button>
          </div>
          <div>
            <button>Filters</button>
          </div>
        </Functions>
        <Statistics>
          <Stat>
            <StatTxt>
              <div>Total Buses</div>
              <div>
                <CountUp end={totalBuses} duration={2} />
              </div>
              <div>
                <Change>
                  <div>
                    <img src={arrowUpIcon} />
                  </div>
                  <div>1.27%</div>
                </Change>
              </div>
            </StatTxt>
            <StatIcon>
              <img src={busIcon} />
            </StatIcon>
          </Stat>
          <Stat>
            <StatTxt>
              <div>Total Routes</div>
              <div>
                <CountUp end={totalRoutes} duration={2} />
              </div>
              <div>
                <Change>
                  <div>
                    <img src={arrowUpIcon} />
                  </div>{" "}
                  <div>5.27%</div>
                </Change>
              </div>
            </StatTxt>
            <StatIcon>
              <img src={routesIcon} />
            </StatIcon>
          </Stat>
          <Stat>
            <StatTxt>
              <div>Total Bus Stops</div>
              <div>
                <CountUp end={totalBusStops} duration={2} />
              </div>
              <div>
                <Change>
                  <div>
                    <img src={arrowUpIcon} />
                  </div>{" "}
                  <div>0.27%</div>
                </Change>
              </div>
            </StatTxt>
            <StatIcon>
              <img src={busStopsIcon} />
            </StatIcon>
          </Stat>
        </Statistics>
      </Stats>

      <Charts>
        <Chart>
          <header>Trips Searched</header>
          <Line
            data={tripsSearched}
            options={{
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Chart>
        <Chart>
          <header>Active Buses</header>
          <Bar
            data={activeBuses}
            options={{
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Chart>
      </Charts>

      {/* Modify this to add a table component */}
      <Table>Stats Table</Table>

      <MiniFooter>Phantom Dashboard</MiniFooter>
    </DashWrapper>
  );
};

export default Dashboard;
