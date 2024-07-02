import axios from 'axios';
import React, { useState } from 'react'
import PropTypes from 'prop-types';

export default function SignUpForm({setToken}) {
    // takes in object
    const[form, setForm] = useState({
        username: "",
        password: "",
    });

    // manage error state, initially set to null (no error)
    const[error, setError] = useState(null); 
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    // function updates the form state when the user inputs data
    const update = (e) =>{
        // prev is variable that gets the previous value of the object, not a keyword
        setForm((prev)=>({ // this curly to deconstruct the object, getting inside of it
            // spread operator to copy all properties from the previous form state
            ...prev,  

            // Dynamically update the property of the form state that matches the input field's 'name' attributes
            [e.target.name]: e.target.value 
        }));
        console.log(form);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setUsernameError(null)
        setPasswordError(null)

        // Check for Edge Cases!
        if(!form.username || !form.password){
            setError("Fill out the fields")
            return
        }

        if(form.username.length < 8){
            setUsernameError("Username should be at least 8 characters long")
            return
        }

        if(form.password.length < 8){
            setPasswordError("Password must be at least 8 characters long")
            return
        }

        try {
            const response = await axios.post("https://fsa-jwt-practice.herokuapp.com/signup", {username: form.username, password: form.password})

            const result = response.data
            // Call setToken with the token received from response
            setToken(result.token)

            console.log("Hello: ", response.data)
            setForm({username: "", password: ""})
        } catch (error) {
            setError(error.message)
        }
        console.log("Submit")
    }

    return (
    <div>
        {error && <p>{error}</p>}
        {usernameError && <p>{usernameError}</p>}
        {passwordError && <p>{passwordError}</p>}
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>
                    Username 
                </label>
                <input 
                    name='username'
                    type='text'
                    placeholder='Enter username'
                    value={form.username} 
                    className='form-control'
                    onChange={update} // anytime you click a key, goes to the update function
                />
            </div>
            <div className='form-group'>
                <label>
                    Password
                </label>
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={form.password} 
                    className='form-control'
                    onChange={update} // triggers the update function every time you click a key
                />
            </div>
            {error && <p>{error}</p>} 
            <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
    </div>
    
    )
}

// Define the prop types for the SignUpForm component
SignUpForm.propTypes = {
    setToken: PropTypes.func.isRequired,
};