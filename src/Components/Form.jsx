import React, { useEffect, useState } from "react";
import axios from 'axios'
import "./Form.css";
export const Form = () => {
    const [formData, setFormData] = useState({
        name: "",
        department: "",
        age: "",
        salary: "",
        address: "",
        married: false
    });
    const[data, setData]=useState([])
    const baseUrl=`http://localhost:3001`;
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        console.log(e.targer)

        setFormData({ ...formData, [id]: type==='checkbox'?checked: value  });
        console.log('formData ', formData)
    };
const handleSubmit=()=>{
    console.log('submit', formData)
};
const{name, department, age, salary,address, married}=formData;
const getData=()=>{
    axios.get(`${baseUrl}/user`)
    .then((res)=>{
        console.log('res', res.data);
        setData(res.data)
    })
}
const postData=()=>{
    axios.post(`${baseUrl}/user`,{
        name, department, age, salary,address, married
    }).then((res)=>{
        console.log('post data ', res);
        getData();
    })
}
useEffect(()=>{
    getData();
},[]);
    
    return (
        <div>
            <h1>Form</h1>
            <div>
                <label htmlFor="name"> Name: </label>
                <br />
                <input onChange={handleChange} type="text" id="name" value={name} />
            </div>
            <div>
                <label htmlFor="name"> department: </label>
                <br />
                {/* <input  onChange={handleChange} type="text" id="department" value={department} /> */}
                <select  onChange={handleChange}  name="department" value={department} id="department">
                    <option value="B.tech">B.tech</option>
                    <option value="it">IT</option>
                    <option value="marketing">marketing</option>
                </select>
            </div>
            <div>
                <label htmlFor="name"> age: </label>
                <br />
                <input  onChange={handleChange} type="text" id="age" value={age} />
            </div>
            <div>
                <label htmlFor="name"> salary: </label>
                <br />
                <input  onChange={handleChange} type="text" id="salary" value={salary} />
            </div>
            <div>
                <label htmlFor="name"> address: </label>
                <br />
                <input  onChange={handleChange} type="text" id="address" value={address} />
            </div>
            <div>
                <label htmlFor="name"> married: </label>
             
                <input style={{marginLeft:'-130px'}}  onChange={handleChange} type="checkbox" id="married" value={married}  />
            </div>
            <br />
            <button onClick={postData}> submit</button>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>name</th>
                            <th>age</th>
                            <th>department</th>
                            <th>salary</th>
                            <th>address</th>
                            <th>married</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index)=>{
                             const   {name, department, age, salary,address, married, id}=item
                                return(
                                    <tr key={id}>
                                        <td>{index+1}</td>
                                        <td>{name}</td>
                                            <td> {age} </td>
                                            <td> {department} </td>
                                            <td> {salary} </td>
                                            <td> {address} </td>
                                            <td> {married?'married':'notMarried'} </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                  
                </table>
            </div>
        </div>
    );
};
