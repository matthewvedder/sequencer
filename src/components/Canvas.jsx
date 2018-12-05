import React, { Component } from 'react'
import GridLayout from 'react-grid-layout'
import Navbar from './Navbar'
import Thumbnail from './Thumbnail'
// import Image1 from '../images/pose.jpeg'
// import Image2 from '../images/pose2.jpeg'
// import Image3 from '../images/pose3.jpeg'
// import Image4 from '../images/pose4.jpeg'
// import Image5 from '../images/pose5.jpeg'
import Warrior2 from '../images/warrior2.jpg'
import KingPodgeon from '../images/king-pidgeon.jpg'
import Crow from '../images/crow.jpg'
import Locust from '../images/locust.jpg'
import DownDog from '../images/down-dog.jpg'
import '../styles/Canvas.css'

class Canvas extends Component {
  mapImages() {
    const keys=['a', 'b', 'c', 'd', 'e']
    return [Warrior2, KingPodgeon, Crow, Locust, DownDog].map((img, index) => {
      return (
        <div key={keys[index]}>
          <Thumbnail img={img}/>
        </div>
      )
    })
  }


  render() {
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 23},
      {i: 'b', x: 1, y: 0, w: 1, h: 23},
      {i: 'c', x: 2, y: 0, w: 1, h: 23},
      {i: 'd', x: 3, y: 0, w: 1, h: 23},
      {i: 'e', x: 4, y: 0, w: 1, h: 23}
    ]

    return (
      <div className='canvas'>
        <GridLayout
          className="layout"
          layout={layout}
          cols={5}
          rowHeight={1}
          width={1200}
          isResizable={false}
        >
          {this.mapImages()}
        </GridLayout>
      </div>
    )
  }
}

export default Canvas
