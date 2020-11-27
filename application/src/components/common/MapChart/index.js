import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = ({ setTooltipContent, children }) => {
  const colorScale = scaleLinear()
    .domain([
      0,
      Math.max.apply(
        Math,
        children !== undefined ? children.map((country) => {
          return country.requests;
        }) : []
      ),
    ])
    .range(['#FFEDEA', '#B0413E']);

  return (
    <ComposableMap
      data-tip=""
      projectionConfig={{
        scale: 155,
        rotation: [-11, 0, 0],
      }}
      width={725}
      height={450}
    >
      {children !== undefined && children.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = children.find(
                (s) => s.iso3 === geo.properties.ISO_A3
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={(country) ? colorScale(country.requests) : '#F5F4F6'}
                  onMouseEnter={() => {
                    country !== undefined && country !== null
                      ? setTooltipContent(
                        `${country.name} — ${country.requests} requests`
                      )
                      : setTooltipContent(
                        `${geo.properties.NAME} — 0 requests`
                      );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  style={{
                    hover: {
                      fill: '#22333B',
                      outline: 'none',
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

MapChart.propTypes = {
  children: PropTypes.any,
  setTooltipContent: PropTypes.func,
};

export default memo(MapChart);
