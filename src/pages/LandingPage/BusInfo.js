import React from "react";
import PropTypes from "prop-types";
import busIcon from "App/assets/images/bus-icon.svg";
import clockIcon from "App/assets/images/clock.svg";
import {
  NearbyBus,
  BusDetailIcon,
  BusIcon,
  BusInfoToast,
  BusDetailWrapper,
  BusDetail,
} from "shared/styles/homepageStyles";

const BusInfo = (props) => {
  return (
    <BusInfoToast data-testid="bus-info-toast">
      <div>
        <BusIcon src={busIcon} />
      </div>
      <div>
        <BusDetailWrapper>
          <BusDetailIcon>
            <img src={clockIcon} />
          </BusDetailIcon>
          <div>
            <NearbyBus>A Nearby Bus is</NearbyBus>
            <div className="text-info time-remaining">10 min</div>
            <BusDetail>away from {props.data.origin} Bus Stop</BusDetail>
          </div>
        </BusDetailWrapper>
        <BusDetailWrapper style={{ marginTop: "1em" }}>
          <BusDetailIcon style={{ marginRight: "1em" }}>Plate: </BusDetailIcon>
          <BusDetail>
            <strong>RAC43353</strong>
          </BusDetail>
        </BusDetailWrapper>
      </div>
    </BusInfoToast>
  );
};

BusInfo.propTypes = {
  data: PropTypes.object,
};

export default BusInfo;
