import React from 'react';
import PropTypes from 'prop-types';
import busIcon from 'App/assets/images/bus-icon.svg';
import clockIcon from 'App/assets/images/clock.svg';
import Styled from '@emotion/styled';

const NearbyBus = Styled.div`
  text-align: left;
  font-size: smaller;
  opacity: 0.65;
`;

const BusDetailIcon = Styled.div`
  margin-right: 2em;
`;

const BusIcon = Styled.img`
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

const BusInfo = props => {
  return (
    <div data-testid="bus-info-toast" className="bus-info-toast">
      <div>
        <BusIcon src={busIcon} />
      </div>
      <div>
        <div className="bus-detail-wrapper">
          <BusDetailIcon><img src={clockIcon} /></BusDetailIcon>
          <div>
            <NearbyBus>A Nearby Bus is</NearbyBus>
            <div className="text-info time-remaining">10 min</div>
            <div className="bus-detail">away from {props.data.origin} Bus Stop</div>
          </div>
        </div>
        <div style={{marginTop: "1em"}} className="bus-detail-wrapper">
          <BusDetailIcon style={{marginRight: "1em"}}>Plate: </BusDetailIcon>
          <div className="bus-detail"><strong>RAC43353</strong></div>
        </div>
      </div>
    </div>
  );
}

BusInfo.propTypes = {
  data: PropTypes.object
};

export default BusInfo;
