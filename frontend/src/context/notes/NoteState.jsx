import React, { useState } from 'react'
import NoteContext from './NoteContext'
// import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'

const NoteState = (props) => {
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    const host = "http://localhost:5000";


    const fetchAllNotes = async () => {


        const allNotes = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await allNotes.json();
        // console.log(json);
        setNotes(json);
    }

    // const fetchAllNotes = () => {
    //     setTimeout(async () => {

    //         const allNotes = await fetch(`${host}/api/notes/fetchAllNotes`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-type': 'application/json',
    //                 'auth-token': localStorage.getItem('token')
    //             }
    //         });
    //         const json = await allNotes.json();
    //         // console.log(json);
    //         setNotes(json);
    //     }, 1000);
    // }

   



    // console.log("notes",notes);
    // Add a note
    const addNote = async (title, description, tag) => {
        //TODO API Call
        const res = await fetch(`${host}/api/notes/createNote`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            // body: JSON.stringify({title:title, description:description, tag:tag})
            body: JSON.stringify({ title, description, tag })
        });

        const note = await res.json();
        // console.log(json);
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        //TODO API Call
        const res = await fetch(`${host}/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })

        // console.log("deleteing note with id + ", id);

        const deletedNote = await res.json();
        // console.log(deletedNote);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    // Update a note
    const updateNote = async (id, title, description, tag) => {
        const res = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })

        const json = res.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchAllNotes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
