import React, { useEffect, useRef, useState } from "react"
import Map from "ol/Map"
import View from "ol/View"
import Projection from "ol/proj/Projection"
import { getCenter } from "ol/extent"
import Point from "ol/geom/Point"
import { makeStyles } from "@material-ui/core/styles"
import Overlay from "ol/Overlay"
import VectorLayerComponent from "./VectorLayerComponent"
import RasterLayer from "./RasterLayer"

const useStyles = makeStyles(theme => ({
  onAddTaskOpen: {
    background: "lightgrey",
    width: "440px",
    height: "340px",
    marginLeft: "0",
    marginTop: "0",
  },
  map: {
    background: "lightgrey",
    width: "600px",
    height: "250px",
    marginLeft: "55%",
    marginTop: "125px",
  },
  popup: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    position: "absolute",
    backgroundColor: "white",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    padding: "5px",
    borderRadius: "10px",
    border: "1px solid #cccccc",
    bottom: "5px",
    miWidth: "280px",
  },
}))

export default function MapComponent(props) {
  const extent = [0, 0, 819, 460]
  const projection = new Projection({
    code: "xkcd-image",
    units: "pixels",
    extent: extent,
  })
  const classes = useStyles()
  const mapRef = useRef()
  const [map, setMap] = useState(null)
  const overlay = useRef()
  const overlayContainer = useRef()

  useEffect(() => {
    overlay.current = new Overlay({
      element: overlayContainer.current,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    })

    const mapObj = new Map({
      layers: [],
      overlays: [overlay.current],
      target: mapRef.current,
      view: new View({
        projection: projection,
        center: getCenter(extent),
        zoom: 1,
        maxZoom: 3,
      }),
    })
    setMap(() => mapObj)
  }, [])

  useEffect(() => {
    if (!map) return
    map.on("pointermove", e => {
      const pixel = e.pixel
      const coords = e.coordinate
      const feature = map.getFeaturesAtPixel(pixel)
      if (
        feature.length > 0 &&
        !(feature[0].values_.geometry instanceof Point)
      ) {
        overlayContainer.current.innerHTML = `<Typography>${feature[0].values_.name}</Typography>`
        overlay.current.setPosition(coords)
        return
      }
      overlay.current.setPosition(undefined)
    })
  }, [map, setMap])
  return (
    <>
      <div
        ref={mapRef}
        className={!props.addTask ? classes.map : classes.onAddTaskOpen}
      >
        {map && (
          <>
            <RasterLayer map={map} />
            <VectorLayerComponent
              map={map}
              addTask={props.addTask}
              polygonGeoJSON={props.polygonGeoJSON}
            />
          </>
        )}
      </div>
      <div ref={overlayContainer} className={classes.popup}></div>
    </>
  )
}
