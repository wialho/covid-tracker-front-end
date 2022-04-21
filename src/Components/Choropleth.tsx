import { scaleLinear } from "d3-scale";
import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from "react-simple-maps";

interface choroplethProps {
    data: any[],
    columnName: string,
    color1: string,
    color2: string,
    setToolTipContent: (x: string) => void 
}

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Choropleth = (props: choroplethProps) => {

    const colorScale = scaleLinear()
        .domain([0, 1])
        //@ts-ignore typing seems slighty off for hexcodes
        .range([props.color1, props.color2]);

    return (
        <ComposableMap
            data-tip=""
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 147
          }}
          height={400}
          > 
          <ZoomableGroup zoom={1}>
            <Sphere id='rsm-sphere' fill='transparent' stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {props.data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = props.data.find((s) => s.isocode === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                      if(!!d){
                        props.setToolTipContent(`${d.country} - ${d.displayValue}`);
                      }
                  }}
                  onMouseLeave={() => {
                    props.setToolTipContent("");
                  }}
                  style={{
                    hover: {
                        fill: "lightgray",
                        outline: "none"
                      },
                      pressed: {
                        fill: "lightgray",
                        outline: "none"
                      }
                  }}
                  //@ts-ignore
                  fill={d ? colorScale(d[props.columnName]) : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      )}
      </ZoomableGroup>
    </ComposableMap>
    );
}

export default memo(Choropleth);