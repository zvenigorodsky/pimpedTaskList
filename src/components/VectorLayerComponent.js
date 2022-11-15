import React, { useState, useEffect } from "react"
import { Vector as VectorSource } from "ol/source"
import VectorLayer from "ol/layer/Vector"
import Feature from "ol/Feature"
import { Draw, Modify } from "ol/interaction"
import useFetch from "../hooks/useFetch"
import Polygon from "ol/geom/Polygon"

export default function VectorLayerComponent({ map, addTask, polygonGeoJSON }) {
  const { data: tasks, mutate } = useFetch("/tasks")
  const [polygons, setPolygons] = useState([])

  const source = new VectorSource({})

  const vector = new VectorLayer({
    source: source,
    style: {
      "fill-color": "rgba(255, 255, 255, 0.2)",
      "stroke-color": "#ffcc33",
      "stroke-width": 2,
      "circle-radius": 7,
      "circle-fill-color": "#ffcc33",
    },
  })
  useEffect(() => {
    if (!addTask || !map) return

    const draw = new Draw({
      source: source,
      type: "Polygon",
    })

    draw.on("drawend", e => {
      const feature = e.feature
      if (feature) {
        const coord = feature.getGeometry().getCoordinates()

        polygonGeoJSON(coord)
        map.removeInteraction(draw)
      }
    })
    map.addInteraction(draw)
  }, [])

  useEffect(() => {
    if (tasks) {
      setPolygons([])
      tasks.map(task => {
        const poly = new Feature({
          type: "Polygon",
          geometry: new Polygon(task.geometry.polygon),
          name: task.title,
        })
        setPolygons(prev => [...prev, poly])
      })
    }
  }, [map, tasks, mutate])

  useEffect(() => {
    if (!map) return

    source.clear()

    if (addTask) return

    source.addFeatures(polygons)

    const modify = new Modify({ source: source })

    map.addInteraction(modify)
  }, [map, tasks, polygons, setPolygons])

  useEffect(() => {
    if (!map) return

    map.addLayer(vector)

    return () => {
      if (addTask) return
      map.removeLayer(vector)
    }
  }, [map, tasks, polygons])
  return null
}
