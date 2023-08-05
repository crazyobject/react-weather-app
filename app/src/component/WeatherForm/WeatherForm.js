import React from "react";
import {Row,Col,Container,Button} from 'react-bootstrap';
import {useFormik} from "formik";
import * as Yup from "yup";
import AppConfig from "../../AppConfig";

const initialValues = {
    city:"",
}

const validation = Yup.object({
    city:Yup.string().min(3).required(),
});

const WeatherForm = ((props)=>{
    const {setWeatherData} = props;
    const {values,errors,touched,handleSubmit,handleBlur,handleChange,handleReset} = useFormik({
        initialValues,
        validationSchema:validation,
        onSubmit:(values,action)=>{
           action.resetForm();
           // move this in hook
           fetch(`${AppConfig.baseUrl}weather?q=${values.city}&appid=${AppConfig.apiKey}&units=metric`).then(response => response.json()).then((json)=>{
            setWeatherData({
                cityName:json.name+", "+json.sys.country,
                clouds:json.clouds,
                wind:json.wind,
                visibility:json.visibility,
                main:json.main,
                weather:json.weather,
              });
           });
        }
    });

    return (
        <Container>
                <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <input  placeholder="Enter city name" class="form-control    " name="city" id="city" value={values.city} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.city && touched.city ? (
                            <small className="text-danger mt-1">
                              {errors.city}
                            </small>
                          ) : null}
                    </Col>
                    <Col>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <Button type="button"  onClick={()=>{handleSubmit()}} class="btn btn-primary">Fetch</Button>
                            <Button type="button" onClick={()=>{handleReset();setWeatherData({})}} variant="secondary">Clear</Button>
                        </div>
                    </Col>
                </Row>
                </form>
        </Container>
    );
});

export default WeatherForm;