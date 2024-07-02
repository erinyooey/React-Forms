import PropTypes from "prop-types"
import axios from "axios"
import { useState } from "react"

export default function Authenticate({token}) {
  const[error, setError] = useState(null);
  const[successMessage, setSuccessMessage] = useState(null);
  const[username, setUsername] = useState("")


  const handleClick = async (e) => {
    e.preventDefault();
    if(!token){
      return setError("Submit the form before authenticating");
    }
    console.log("Authenticate button clicked")
    try {
      const response = await axios.get('https://fsa-jwt-practice.herokuapp.com/authenticate', {headers: {Authorization: `Bearer ${token}`},"Content-Type": "application/json"})
      const result = await response.data;
      setSuccessMessage(result.message)
      setUsername(result.data.username)
      setError(null)
      console.log("authenticate: ", result)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {username && <p>{username}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  )
}

// Define the prop types for the Authenticate component
Authenticate.propTypes = {
  token: PropTypes.string,
};