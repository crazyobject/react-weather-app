import React from "react";
import {Row,Col,Container,Button} from 'react-bootstrap';
import {useFormik} from "formik";
import * as Yup from "yup";
import AppConfig from "../../AppConfig";
import axios from "axios";

const initialValues = {
    city:"",
}

const validation = Yup.object({
    city:Yup.string().min(3).required(),
});

const WeatherForm = ((props)=>{ 
    const {dispatch} = props;
    const {values,errors,touched,handleSubmit,handleBlur,handleChange,handleReset} = useFormik({
        initialValues,
        validationSchema:validation,
        onSubmit:(values,action)=>{
           axios.get(`${AppConfig.baseUrl}weather?q=${values.city}&appid=${AppConfig.apiKey}&units=metric`).then((response) => { 
            dispatch({type:"FETCH_SUCCESS",data:response.data,isLoading:false});
          }).catch(error => {
            console.error(error);
            dispatch({type:"FETCH_ERROR",error:error.response.data.message,isLoading:false});
        });
          action.resetForm();
           
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
                            <Button type="button" onClick={()=>{handleReset();}} variant="secondary">Clear</Button>
                        </div>
                    </Col>
                </Row>
                </form>
        </Container>
    );
});

export default WeatherForm;