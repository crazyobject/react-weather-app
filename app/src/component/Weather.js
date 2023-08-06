import React from "react";
import AppConfig from "../AppConfig.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WeatherForm from './WeatherForm/WeatherForm';
import WeatherCard from "./WeatherCard/WeatherCard";
import "./Weather.css";


const AppHeader = (()=>{
    // pure react component
    return (
        <h6 class="text-center h4 fw-bold mb-5 mt-4">{AppConfig.appName}</h6>
    );
});

const reducer = ((state,action)=>{
    switch(action.type){
        case "FETCH_SUCCESS" :
        const weatherData = action.data;     
        return {
            cityName:weatherData.name,
            clouds:weatherData.clouds,
            wind:weatherData.wind,
            visibility:weatherData.visibility,
            main:weatherData.main,
            weather:weatherData.weather,
          };
          case "FETCH_ERROR" :   
          return {
            error:action.error,
          }
          default : return state;
    }

})

const Weather=(()=>{
    const [weatherData,dispatch] = React.useReducer(reducer,{});
    return(
        <>
            <Container className="parentContainer">
                <Row>
                    <Col>
                        <AppHeader/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <WeatherForm dispatch={dispatch}/>
                    </Col>
                </Row>
                <Row>
                        <WeatherCard weatherData={weatherData}/>
                </Row>
            </Container>
        </>
    );
});

export default Weather;