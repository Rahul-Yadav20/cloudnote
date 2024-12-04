import { useFormik } from "formik";
import noteSchema from './schemas/noteSchema';
import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
// import { useAlert } from "../context/alert/AlertContext";

// import bgVideo from "../images/bgVideo.mp4"



function AddNote(props) {

    const { addNote } = useContext(NoteContext);

    const {showAlert} = props;


    const note = { title: "", description: "", tag: "" };


    const { values, handleChange, handleBlur, errors, touched, handleReset } = useFormik({
        initialValues: note,
        validationSchema: noteSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(values.title, values.description, values.tag);
        showAlert("Note Added Successfully", "info")
    }




    return (
        <div className='flex flex-col items-center justify-around mx-auto text-white pt-10 relative '>

           


            <h1 className="text-3xl text-white font-medium -mt-5 mb-5 z-10">Add a Note</h1>
            {/* Add Note form */}
            <form className=' w-10/12 h-[450px]  md:w-1/2 lg:w-1/3 flex flex-col gap-2 backdrop-blur-lg shadow-white  shadow-md p-4 rounded-lg border-2 border-black'>

                {/* Name Field */}
                <label htmlFor="title" className="text-xl">Title</label>
                <input type="text" className='rounded-md h-10 p-4 text-black focus:outline-orange-400 border-2 border-black' name="title" id="title" value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder="Enter title.." />
                {/* Error handling  using noteSchema*/}
                {(errors.title && touched.title && values.title !== '') ? <p className="text-yellow-400 font-medium">{errors.title}</p> : null}


                {/* Email Field */}
                <label htmlFor="description" className="text-xl">Description</label>
                <textarea className='rounded-md h-32 p-4 text-black focus:outline-orange-400 border-2 border-black' name="description" id="description" value={values.description} onChange={handleChange} onBlur={handleBlur} placeholder="Enter Description.." />
                {/* Error handling  using noteSchema*/}
                {(errors.description && touched.description && values.description !== '') ? <p className="text-yellow-400 font-medium">{errors.description}</p> : null}


                {/* Name Field */}
                <label htmlFor="tag" className="text-xl">Tag</label>
                <input type="text" className='rounded-md h-10 p-4 text-black focus:outline-orange-400 border-2 border-black' name="tag" id="tag" value={values.tag} onChange={handleChange} onBlur={handleBlur} placeholder="Enter tag.." />
                {/* Error handling  using noteSchema*/}
                {(errors.tag && touched.tag && values.tag !== '') ? <p className="text-yellow-400 font-medium">{errors.tag}</p> : null}



                {/* Submit Button */}
                <div className="flex space-x-4">

                    <button type='submit' className='bg-cyan-600 p-2 rounded-md text-white w-24 mt-4 font-medium disabled:opacity-70 disabled:bg-orange-400' disabled={(values.title.length<=2 || values.description.length<=9) ? true : false} onClick={handleSubmit}>Add Note</button>

                    <button type='reset' className='bg-red-600 p-2 rounded-md text-white w-24 mt-4 font-medium' onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    )


}

export default AddNote
