import React from 'react'
import { motion } from 'framer-motion'

// import bgVideo from "../images/bgVideo.mp4"
import Notes from './Note_Components/Notes'
// import AddNote from './AddNote'
import bgVideo from "../images/bgVideo.mp4"

function Home(props) {

  const { showAlert } = props



  return (
    <motion.div className={`w-full h-screen bg-black`} initial={{ y: -20 }} animate={{ y: 0, transition: { duration: 0.5 } }}>

      <video src={bgVideo} autoPlay loop muted className="w-full h-screen absolute  object-cover"></video>

      <Notes showAlert={showAlert} />


    </motion.div >
  )
}

export default Home
