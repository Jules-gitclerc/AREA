import Weather from "./Weather/Weather";
import WeatherPreview from "./Weather/WeatherPreview";

export const WEATHER = 1;

const widgetData = [
    {
        id: WEATHER,
        component: (openSettings, setOpenSettings, idWidget) => <Weather openSettings={openSettings} setOpenSettings={setOpenSettings} idWidget={idWidget}/>,
        preview: <WeatherPreview/>,
        size: {w: 3, h: 2, x: 0, y: Infinity},
    }
]

export default widgetData;