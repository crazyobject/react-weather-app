import React from "react";
import "./WeatherCard.css";

const WeatherCard = ((props)=>{
    const {weatherData} = props;
    
    if(weatherData.error!==undefined){
      return (<div>{weatherData.error}</div>);
    }
    
    let image;
    if(Object.keys(weatherData).length!==0){
        image = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    }
return (
    <div>
    {
        Object.keys(weatherData).length === 0 ? <></> :
<section style={{width:"50%"}}>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center h-100" style={{color:"#282828"}}>
      <div class="col-md-15 col-lg-17 col-xl-15">
        <div>
          
          <div class="card-body m-2">
            <div id="demo1" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h2 class="display-2"><strong>{weatherData.main.temp}°C</strong></h2>
                      <p class="text-muted mb-0">Feels like : {weatherData.main.feels_like}</p>
                      <p class="text-muted mb-0">{weatherData.cityName}</p>
                      <p class="text-muted mb-0">{weatherData.weather[0].description}</p>
                    </div>
                    <div>
                      <img alt={weatherData.weather[0].description} src={image}
                        width="60px"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div><br/>
          <div class="card-body m-2">

            <div id="demo2" class="carousel slide" data-ride="carousel">              
              <div class="carousel-inner">
                <div class="carousel-item active">
                <table class="table tableBg">
                    <tbody>
                        <tr>
                            <td><b>Temp. Max</b></td>
                            <td>{weatherData.main.temp_max}</td>
                            <td><b>Temp Min</b></td>
                            <td>{weatherData.main.temp_min}</td>
                        </tr>
                        <tr>
                            <td><b>Clouds</b></td>
                            <td>{weatherData.clouds.all}</td>
                            <td><b>Humidity</b></td>
                            <td>{weatherData.main.humidity}</td>
                        </tr>
                        <tr>
                            <td><b>Pressure</b></td>
                            <td>{weatherData.main.pressure}</td>
                            <td><b>Visibility</b></td>
                            <td>{weatherData.visibility}</td>
                        </tr>
                        <tr>
                            <td><b>Wind Gust</b></td>
                            <td>{weatherData.wind.gust}</td>
                            <td><b>Wind speed</b></td>
                            <td>{weatherData.wind.speed}</td>
                        </tr>
                        </tbody>
                        </table>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>}</div>);

});

export default WeatherCard;