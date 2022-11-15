import React, { useEffect } from "react"
import ImageLayer from "ol/layer/image"
import img from "../../public/Office.png"
import Projection from "ol/proj/Projection"
import Static from "ol/source/ImageStatic"

export default function ResterLayer({ map }) {
  const extent = [0, 0, 819, 460]
  const projection = new Projection({
    code: "xkcd-image",
    units: "pixels",
    extent: extent,
  })

  const raster = new ImageLayer({
    source: new Static({
      url: img,
      projection: projection,
      imageExtent: extent,
    }),
  })

  useEffect(() => {
    if (!map) return
    map.addLayer(raster)
    return () => {
      map.removeLayer(raster)
    }
  }, [map])

  return null
}
