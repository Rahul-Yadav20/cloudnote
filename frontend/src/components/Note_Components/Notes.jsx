import React, { useContext, useEffect, useState } from 'react'
// import NoteContext from '../context/notes/NoteContext'
import Notesitem from './Notesitem';
import NoteContext from '../../context/notes/NoteContext';
import { useRef } from 'react';
import AddNote from '../AddNote';
import { useNavigate } from 'react-router-dom';
// import bgVideo from '../../images/bgVideo.mp4'


function Notes(props) {

    const context = useContext(NoteContext);

    const { showAlert } = props;

    const { notes, fetchAllNotes, updateNote } = context;

    const nevigate = useNavigate();

    useEffect(() => {

        // if token exist in localstorage then fetch all notes for that user
        if (localStorage.getItem('token')) {
            fetchAllNotes();
        }
        else {
            nevigate("/login")
        }
        // console.log(fetchAllNotes());
    }, []);


    const ref = useRef(null);

    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });



    const update = (currentNote) => {
        document.getElementById('my_modal_5').showModal();
        setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        ref.current.click();
        updateNote(note.id, note.title, note.description, note.tag);
        showAlert("Note updated successfully", "warning");
    }


    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (

        <div className='bg-black w-full h-screen pt-8'>
            <AddNote showAlert={showAlert} />
            {/* <div className='text-3xl text-white text-center font-mono font-extrabold mt-5 z-50'>Notes</div> */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" ref={ref} onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle sm:mt-10 xsm:-mt-20">
                <div className="modal-box bg-slate-200 scroll-container sm:w-[512px] xsm:w-96 xsm:rounded-lg mx-auto">
                    <h3 className="font-bold text-2xl ml-10">Update Note</h3>
                    
                    <form className='mt-5 w-10/12 mx-auto h-[450px]  flex flex-col gap-2 backdrop-blur-lg shadow-white  shadow-md p-4 rounded-lg bg-cyan-200 border-2 border-transparent'>


                        {/* Name Field */}
                        <label htmlFor="title" className="text-xl">Title</label>
                        <input type="text" className='rounded-md h-10 p-4 text-black focus:outline-orange-400 border-2 border-black' name="title" id="title" value={note.title} onChange={handleChange} placeholder="Enter title.." required />


                        {/* Email Field */}
                        <label htmlFor="description" className="text-xl">Description</label>
                        <textarea className='rounded-md h-32 p-4 text-black focus:outline-orange-400 border-2 border-black' name="description" id="description" value={note.description} onChange={handleChange} placeholder="Enter Description.." required />


                        {/* Name Field */}
                        <label htmlFor="tag" className="text-xl">Tag</label>
                        <input type="text" className='rounded-md h-10 p-4 text-black focus:outline-orange-400 border-2 border-black' name="tag" id="tag" value={note.tag} onChange={handleChange} placeholder="Enter tag.." required />



                        {/* Submit Button */}
                        <div className="flex space-x-4">

                            <button type='submit' className='bg-cyan-600 p-2 rounded-md text-white w-28 mt-4 font-medium disabled:opacity-70 disabled:bg-orange-400' disabled={(!note.title || !note.description) ? true : false} onClick={handleSubmit}>Update Note</button>


                        </div>

                    </form>
                    <div className="modal-action absolute top-0 right-5">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button type='submit' className=" text-lg hover:text-white" ref={ref}>X</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className='w-full flex justify-evenly flex-wrap gap-4 mt-4 mb-10'>

                {notes.length === 0 && <h1 className='text-red-600 text-lg'>No note available</h1>}
                {
                    notes.map((note) => {
                        return <Notesitem key={note._id} note={note} updateNote={update} showAlert={showAlert} />
                    })

                }
            </div>
        </div>

    )
}

export default Notes
