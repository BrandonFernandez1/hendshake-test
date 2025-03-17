import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [listItems, setListItems] = useState(() => {
    // Retrieve data from local storage
    const savedItems = localStorage.getItem("listItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // Save state of list items to local storage to retrieve on reload
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);  
  
  const [activity, setActivity] = useState('')
  const [price, setPrice] = useState(0)
  const [activityType, setActivityType] = useState('')
  const [bookingRequired, setBookingRequired] = useState(false)
  const [accessibilitySlider, setAccessibilitySlider] = useState(0.0)

  const handleSubmit = (event) => {
    event.preventDefault()
    
    //Validate that certain fields are not left empty
    if (!activity.trim() || price <= 0 || !activityType) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const newActivity = {
      activity: activity,
      price: price,
      type: activityType,
      bookingRequired: bookingRequired,
      accessibility: accessibilitySlider
    }
    
    //Append new item to list items
    setListItems((prevItems) => [...prevItems, newActivity])

    //Reset state
    setActivity('')
    setPrice(0)
    setActivityType('')
    setBookingRequired(false)
    setAccessibilitySlider(0.0)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    //Update respective state
    if (name == 'activity') setActivity(value)
    else if (name == 'price') setPrice(value)
    else if (name == 'activity-type') setActivityType(value)
    else if (name == 'booking-required') setBookingRequired(event.target.checked)
    else if (name == 'accessibility-slider') setAccessibilitySlider(parseFloat(value))
  }
  
  return (
    <div>     
      <div id='form-container'>
        {/* Would create a Form component and pass in a compiled form data state as props. Oversight from the initial design */}
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <label htmlFor='activity'>Activity:</label>
            <input
              type='text'
              name={'activity'} 
              value={activity}
              onChange={handleChange}
            />
          </div>
          
          <div className='form-field'>
            <label htmlFor='price'>Price:</label>
            <input 
              type='number'
              name='price'
              value={price}
              onChange={handleChange}
            />
          </div>

          <div className='form-field'>
            <label htmlFor='activity-type'>Type:</label>
            <select name='activity-type' value={activityType} onChange={handleChange}>
              <option value='Select an option'>Select an option</option>
              <option value='Education'>Education</option>
              <option value='Recreational'>Recreational</option>
              <option value='Social'>Social</option>
              <option value='DIY'>DIY</option>
              <option value='Charity'>Charity</option>
              <option value='Cooking'>Cooking</option>
              <option value='Relaxation'>Relaxation</option>
              <option value='Music'>Music</option>
              <option value='Busywork'>Busywork</option>
            </select>
          </div>

          <div className='form-field'>
            <label htmlFor='booking-required'>
              <input
                type='checkbox'
                name='booking-required'
                checked={bookingRequired}
                onChange={handleChange}
              />
              Booking required
            </label>
          </div>

          <div className='form-field' id='slider'>
            <label htmlFor='accessibility-slider' id='slider-label'>Adjust Value:</label>
            <input
              type='range'
              name='accessibility-slider'
              min='0.0'
              max='1.0'
              step='0.1'
              value={accessibilitySlider}
              onChange={handleChange}
            />
            <p>{accessibilitySlider.toFixed(1)}</p>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div className='list-container'>
        <List listItems={listItems} setListItems={setListItems} />
      </div>
      <div>
        <button onClick={() => console.log(listItems)}>List</button>
      </div>
    </div>
  )
}

const List = ({ listItems, setListItems }) => {
  const handleDelete = (index) => {
    setListItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  if (listItems.length > 0) {
    return (
      <>
        <h2>Activity List</h2>
        <p>Number of activities: {`${listItems.length}`}</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Price</th>
              <th>Type</th>
              <th>Booking Required</th>
              <th>Accessibility</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item, index) => (
              <tr key={index}>
                <td>{item.activity}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>{item.bookingRequired ? "Yes" : "No"}</td>
                <td>{item.accessibility}</td>
                <td><button onClick={() => handleDelete(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

export default App
