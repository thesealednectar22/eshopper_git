import { useFormik } from 'formik'
import '../css/Forgot.css'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import authGuard from '../guards/AuthGuard';
import axiosInstance from '../interceptor/axiosInterceptor';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';


function ChangePassword() {
    let errorMsg;
    let accessToken = localStorage.getItem('access')
    const navigate = useNavigate()
    const [OpenError, setOpenError] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const theme = createTheme({
        palette: {
            success: {
                main: 'rgba(170, 196, 174, 1)'
            },
        }
    });
    const [open, setOpen] = useState(false);
    const [setErrors] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const form = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required('Old Password is required')
                .min(9, 'Old Password must be more than 8 characters')
                .max(50, 'Old Password must not exceed 50 characters'),
            newPassword: Yup.string()
                .required('Password is required')
                .min(9, 'Password must be more than 8 characters')
                .max(50, 'Password must not exceed 50 characters')
                .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Password must contain one uppercase, one number and one special case character'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('newPassword'), null], 'Confirm Password does not match'),
        }),


        onSubmit: (values, { setSubmitting }) => {
            if (!form.isValid) {
                setErrors({
                    oldPassword: form.touched.oldPassword && form.errors.oldPassword,
                    newPassword: form.touched.newPassword && form.errors.newPassword,
                    confirmPassword: form.touched.confirmPassword && form.errors.confirmPassword,
                });
                setSubmitting(false);
                return;
            }
            if (form.isValid) {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
                axiosInstance.post('/change-password/', form.values, {
                    headers
                })
                    .then((Response) => {
                        navigate("/login")
                        setOpen(true)
                        console.log(Response)
                    })
                    .catch((errors) => {
                        console.log(errors.response.data.message)
                        errorMsg = errors.response.data.message
                        setOpenError(true)
                        setErrMsg(errorMsg)
                    })
            }
        }
    })

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="success">
                        Password Changed Successfully!
                    </MuiAlert>
                </Snackbar>
                <Snackbar open={OpenError} autoHideDuration={6000} onClose={() => setOpenError(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                    <MuiAlert elevation={6} variant="filled" onClose={() => setOpenError(false)} severity="error">
                        {errMsg}
                    </MuiAlert>
                </Snackbar>
            </ThemeProvider>
            <div className="row">
                <h1>Change Password</h1>
                <form onSubmit={form.handleSubmit}>
                    <h6 className="information-text">Enter a new password to change your password.</h6>
                    <div className="form-group">
                        <div className="form-left-to-e-shop" id={form.touched.oldPassword && form.errors.oldPassword ? 'error' : ''}>
                            {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                            <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                            <input type="password" name="oldPassword" placeholder="Old Password" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.oldPassword} />
                        </div>
                        {form.touched.oldPassword && form.errors.oldPassword ? (
                            <div className='txt-danger'>{form.errors.oldPassword}</div>
                        ) : null}
                        <div className="form-left-to-e-shop" id={form.touched.newPassword && form.errors.newPassword ? 'error' : ''} >
                            {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                            <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                            <input type="password" name="newPassword" placeholder="New Password" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.newPassword} />
                        </div>
                        {form.touched.newPassword && form.errors.newPassword ? (
                            <div className='txt-danger'>{form.errors.newPassword}</div>
                        ) : null}
                        <div className="form-left-to-e-shop" id={form.touched.confirmPassword && form.errors.confirmPassword ? 'error' : ''} >
                            {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                            <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                            <input type="password" name="confirmPassword" placeholder="ConfirmPassword" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.confirmPassword} />
                        </div>
                        {form.touched.confirmPassword && form.errors.confirmPassword ? (
                            <div className='txt-danger'>{form.errors.confirmPassword}</div>
                        ) : null}
                        {/* <button type='submit'>Submit  </button> */}
                        <button className="button accept-btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default authGuard(ChangePassword)