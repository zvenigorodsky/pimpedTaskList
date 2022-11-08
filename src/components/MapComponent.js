import React,{useEffect, useRef, useState} from 'react'
import { Typography } from '@material-ui/core'
import Map from 'ol/Map'  
import View from 'ol/View'
import olPixel from 'ol/pixel'
import ImageLayer from 'ol/layer/image'
import Static from 'ol/source/ImageStatic'
import {Vector as VectorSource} from 'ol/source'
import Projection from 'ol/proj/Projection'
import {getCenter} from 'ol/extent';
import Feature from 'ol/Feature'
import {Draw, Modify, Snap} from 'ol/interaction';
import img from '../../public/Office.png'
import VectorLayer from 'ol/layer/Vector'
import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import { makeStyles } from '@material-ui/core/styles' 
import useGetTasks from '../hooks/useGetTasks'
import Overlay from 'ol/Overlay'


export default function MapComponent(props){

    const {tasks, isLoading, mutate} = useGetTasks('')
    const [polygons, setPolygons] = useState([])

    const useStyles = makeStyles((theme)=> ({
        map:{
            background:'lightgrey',
            width: !props.addTask ? '600px' :'440px',
            height: !props.addTask ? '250px' : '340px',
            marginLeft: !props.addTask ?'55%': '0',
            marginTop: !props.addTask ?'125px': '0'
        },
        popup:{
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            position:'absolute',
            backgroundColor:'white',
            boxShadow:'0 1px 4px rgba(0,0,0,0.2)',
            padding:'5px',
            borderRadius:'10px',
            border:'1px solid #cccccc',
            bottom:'5px',
            miWidth:'280px',
        }
    }))
    
    
    const classes = useStyles()
    const mapRef = useRef()
    const map = useRef()
    const source = useRef()
    const overlay = useRef()
    const overlayContainer = useRef()

    useEffect(()=>{
        
        const extent = [0,0,819,460]
        const projection = new Projection({
            code: 'xkcd-image',
            units: 'pixels',
            extent: extent,
        });
        
        overlay.current = new Overlay({
            element: overlayContainer.current,
            autoPan: {
              animation: {
                duration: 250,
              },
            },
          });

        source.current = new VectorSource({});
        const raster = new ImageLayer({
            source: new Static({
                url:img,
                projection: projection,
                imageExtent: extent,
            })
        })


        const vector = new VectorLayer({
            source: source.current,
            style: {
                'fill-color': 'rgba(255, 255, 255, 0.2)',
                'stroke-color': '#ffcc33',
                'stroke-width': 2,
                'circle-radius': 7,
                'circle-fill-color': '#ffcc33',
              },
        })
        map.current = new Map({
            layers: [raster,vector],
            overlays: [overlay.current],
            target: mapRef.current,   
            view: new View({
                projection: projection,
                center: getCenter(extent),
                zoom: 1,
                maxZoom: 3,
            }),   
        })

        if(props.addTask){
            const draw = new Draw({
            source:source.current,
            type:'Polygon'
            })
    
            draw.on('drawend',(e) => {
                const feature = e.feature
                if(feature){
                    const coord = feature.getGeometry().getCoordinates();
                    props.polygonGeoJSON(coord)
                    map.current.removeInteraction(draw)
                }
            })
            map.current.addInteraction(draw)

        }
        map.current.on('pointermove', (e)=>{
            const pixel = e.pixel
            const coords = e.coordinate
            const feature = map.current.getFeaturesAtPixel(pixel)
            console.log(feature)
            if(feature.length > 0 && !(feature[0].values_.geometry instanceof Point)){
                overlayContainer.current.innerHTML = `<Typography>${feature[0].values_.name}</Typography>`
                overlay.current.setPosition(coords)
                return
            }
            overlay.current.setPosition(undefined);
        })
    },[]);
    useEffect(()=>{
        if( !isLoading ){
            setPolygons([])
            tasks.map((task) => {
                const poly = new Feature({
                    type: 'Polygon',
                    geometry: new Polygon(task.geometry.polygon),
                    name: task.title,
                })
                setPolygons(prev => [...prev,poly])
            })}
            
    },[tasks,mutate])

    useEffect(()=> {
        if(!props.addTask){        
            
            source.current.clear()
            
            source.current.addFeatures(polygons)
           
            const modify = new Modify({source:source.current})
    
            map.current.addInteraction(modify);
            
        }
    },[tasks,polygons,setPolygons])
    return(
        <>
            <div ref={mapRef} className={classes.map}></div>
            <div ref={overlayContainer} className={classes.popup}></div>
        </>
    )
}