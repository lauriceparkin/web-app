import React from 'react'
import { deleteBike, getBikeById } from '../services/bikes'
import { images } from '../services/constants'
import Footer from '../components/shared/Footer'


class MyBikes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bikes: []
    }
  }
  componentDidMount = () => {
    if (this.state.bikes.length < 1) {
      this.props.user.users_bikes.map(async (bike) => {
        const response = await getBikeById(bike)
        console.log(response)
        this.setState(prevState => ({ bikes: [...prevState.bikes, response] }))
      })
    }
  }

  renderBikes = () => {


    if (this.state.bikes) {

      return this.state.bikes.map(bike => {
        let bikeImg = ''
        bike.image ? bikeImg = bike.image : bikeImg = images[bike.type]
        return (
          <div className='bike' key={bike._id}>
            <div>Brand: {bike.brand}</div>
            <div>Type: {bike.type}</div>
            <div>Location: {bike.location}</div>
            <div>Description: {bike.description}</div>
            <div>Price: {bike.price}</div>
            <div>Picture: <img src={bikeImg} alt="bike" /></div>
            <div className="buttons">
              <button className="danger" value={bike._id} onClick={this.destroy}>Delete Bike</button>
              <button
                className="edit"
                value={bike._id}
                onClick={(e) => {
                  this.props.history.push(
                    `/users/${this.props.user._id}/bikes/${e.target.value}/edit`
                  )
                }}
              >Edit</button>
            </div>
          </div>
        )
      })
    } else {
      return null
    }
  }
  destroy = (e) => {
    deleteBike(e.target.value)
      .then(() => {
        this.setState({ bikes: [] })
        this.componentDidMount()
      })
      .catch(console.error)
  }
  render() {

    return (
      <>
        

        <div className="div_image3">
          </div>
          <div className='div_text3'>   
            
            <h3>Click the button below to list a New Bike for Sale.</h3>
            
            <div className="buttons">
              <button className="edit" onClick={() => this.props.history.push(`/users/${this.props.user._id}/create`)}>Sell My Bike</button>
              <div>{this.renderBikes()}</div>
            </div>  
            <h3>Already have bike listed with us? Click on My Bikes to see all your listings.</h3>

          </div>
      


        <Footer />
      </>
    )
  }
}
export default MyBikes