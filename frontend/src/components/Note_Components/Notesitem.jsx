import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa";
// import Alert from '../Alert';
import NoteContext from '../../context/notes/NoteContext';
// import { useAlert } from '../../context/alert/AlertContext';

import {motion} from 'framer-motion';

function Notesitem(props) {

    const { deleteNote } = useContext(NoteContext);
    const { showAlert } = props;

    const handleDelete = () => {
        // console.log(props.note._id);
        deleteNote(props.note._id);

        showAlert("Note deleted successfully", "warning")

    }

    const handleUpdate = () => {
        props.updateNote(props.note);
        
    }

    return (
        <motion.div initial={{translateY: '100%', opacity: 0.5}} animate={{translateY: '', transition: {
            duration: 2
        }, opacity: 1}}>
            <div className="card scroll-container rounded-md w-96 md:w-80 sm:w-72 h-40 bg-orange-400 shadow-xl  relative text-white">

                <div className="card-body p-4">


                    <h1 className="card-title  sm:text-xl text-3xl text-black font-medium">{props.note.title}</h1>

                    <MdDelete className="absolute  md:text-2xl sm:text-xl top-5 right-12 hover:scale-125 cursor-pointer hover:text-black " onClick={handleDelete} />
                    <FaEdit className="absolute  md:text-2xl sm:text-xl right-4 top-5 cursor-pointer hover:scale-125 hover:text-black" onClick={handleUpdate} />



                    <p className='selection:text-green-500 selection:bg-yellow-400 mt-3'>{props.note.description}...</p>

                </div>
            </div>
        </motion.div>
    )
}

export default Notesitem


