import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const IP = "localhost"
const URL = `http://${IP}:8085`

export default function Login({  onIdSubmit, onUsernameSubmit }) {

    // const idRef = useRef()
    const userRef = useRef()
    const passRef = useRef()
    const  emailRef = useRef()

    const handleLoginSubmit = (e) => {
        e.preventDefault() // For preventing refreshing the page
        const username = userRef.current.value; 
        const password = passRef.current.value;

        const userData = {"user":   
                                {"username": username, 
                                 "password": password
                                }
                         }
    
        axios.post(`${ URL }/api/users/login/${userRef.current.value}`,userData).then(res => {
            console.log(res.data)
            onIdSubmit(prevIdname => {return {"userId": username, "username": username}})
        })
        
    }

    const createNewId = () => {
        const username = userRef.current.value; 
        const password = passRef.current.value;
        const email = emailRef.current.value;
        const userData = {"user":   
                                {"username": username, 
                                "password": password, 
                                "email": email
                                }
                         }
        axios.post(`${ URL }/api/users/`,userData)
        .then(res => { console.log(res.data)
                       onIdSubmit(prevIdname => {return {"userId": username, "username": username}})
                     })
        .catch(err => { console.log(err.data) })
    }

    const WIDTH = {width:'40%'};
    return (
        <Container className="align-items-center d-flex" style={{ height: '60vh' }}>
            <Form style={{marginLeft:"34%"}} onSubmit={handleLoginSubmit}  className="w-100">

                {/* <Form.Group>
                    <Form.Label> Enter Your Id </Form.Label>
                    <Form.Control style={WIDTH} id="id" name="id" type="text" ref={idRef}/>
                </Form.Group> */}
                <Form.Group>
                    <Form.Label> Enter Your UserName </Form.Label>
                    <Form.Control style={WIDTH} id="username" name="username" type="text" ref={userRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Enter Your Password </Form.Label>
                    <Form.Control style={WIDTH} id="password" name="password" type="password" ref={passRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label> Enter Your Email</Form.Label>
                    <Form.Control style={WIDTH} id="email" name="email" type="email" ref={emailRef}/>
                </Form.Group>

                <div style={{marginTop:'10px'}}>
                    <Button type = "submit">Login</Button>
                    <Button style={{marginLeft:'10px'}}  onClick={createNewId} type = "secondary">Create A New Id</Button>
                </div>

                
            </Form>
        </Container>
    )
}
