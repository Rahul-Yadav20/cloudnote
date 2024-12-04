import React, { useContext } from 'react'
import image from "../images/about_img.jpg"
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

function About() {

  return (
    <motion.div className='text-white w-full h-screen' initial={{ translateX: '-100%' }} animate={{
      translateX: 0, transition: {
        duration: 0.5
      }
    }}>
      <div >

        <img src={image} alt="" className='w-full h-screen object-cover'/>
      </div>
      <div className='w-[40rem] text-white absolute top-[30%] left-14 text-xl md:top-[30%] text-justify sm:top-0 xsm:top-10 md:w-[40rem] xsm:w-[80%]'>
        
        <TypeAnimation 
          sequence={[
            `Welcome to NoteKeeper, your go-to cloud application for securely storing and managing your important notes. At NoteKeeper, we understand that in today's fast-paced world, keeping track of your thoughts, ideas, and critical information is essential. That's why we've designed an intuitive platform that ensures your notes are always at your fingertips, no matter where you are.`,
            1000,
                  
          ]}

          wrapper='span'
          speed={100}
          
          cursor={false}
        />
        <TypeAnimation 
          style={{whiteSpace: 'pre-line'}} 
          sequence={[
            2500,
            `\n\nWith NoteKeeper, you can effortlessly create, edit, and organize your notes in a user-friendly interface. Our robust cloud storage ensures that your data is always safe and accessible across all your devices. Whether you're jotting down a quick idea, drafting a detailed plan, or saving important reminders, NoteKeeper has you covered.`,
           
            
          ]}

          wrapper='span'
          speed={100}
          cursor={false}
          
        />
      </div>
    </motion.div>
  )
}

export default About
