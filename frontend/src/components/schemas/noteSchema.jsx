import * as yup from 'yup';

const noteSchema = yup.object({
    title: yup.string().min(3).max(30).required("Please enter title"),
    description: yup.string().min(10).required("Please enter minimum 10 characters"),
    tag: yup.string().min(3).max(10),
})

export default noteSchema
