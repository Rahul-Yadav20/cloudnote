import React from 'react'
import * as yup from 'yup';

const registerSchema = yup.object({
    name: yup.string().min(3).max(30).required("Please enter name"),
    email: yup.string().email().required("Please enter email"),
    password: yup.string().min(6).required("Please enter password"),
    confirm_password: yup.string().required("Please re-enter password").oneOf([yup.ref("password"), null], "Password doesn't match")
})


export default registerSchema
