import React, { useState } from 'react'
import styles from '../../css/Forgot.module.css'
import style from '../../css/Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../interceptor/axiosInterceptor';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [open, setOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const navigate = useNavigate()
    const theme = createTheme({
        palette: {
            success: {
                main: 'rgba(170, 196, 174, 1)'
            },
        }
    });
    const handleClick = (event) => {
        event.preventDefault();
        navigate("/register")
    }
    const handleClickSign = (event) => {
        event.preventDefault();
        navigate("/login")
    }
    const waitTheme = createTheme({
        palette: {
            success: {
                main: 'rgb(196, 170, 192, 0.8)'
            },
        }
    });
    const [setErrors] = useState({
        email: false,
    });
    const form = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('email is Required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            setSnackOpen(true)
            if (!form.isValid) {
                setErrors({
                    email: form.touched.email && form.errors.email,
                });
                setSubmitting(false);
                return;
            }
            if (form.isValid) {
                axiosInstance.post('/forgot-password/', form.values)
                    .then((Response) => {
                        setSnackOpen(false)
                        setOpen(true)
                        console.log(Response)
                    })
            }
        }
    });

    return (
        <div>
            <div className={style['body-login']}>
                <ThemeProvider theme={theme}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="success" style={{ minWidth: '300px' }}>
                            email Send Successfully!
                        </MuiAlert>
                    </Snackbar>
                </ThemeProvider>
                <ThemeProvider theme={waitTheme}>
                    <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <div>
                            <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="success" style={{ minWidth: '300px' }}>
                                preparing to send email!
                            </MuiAlert>
                            {snackOpen && <LinearProgress color="secondary" />}
                        </div>
                    </Snackbar>
                </ThemeProvider>
                <div className={styles['row']}>
                    <h1>Forgot Password?</h1>
                    <form onSubmit={form.handleSubmit}>
                        <h6 className={styles['information-text']}>Enter your registered email to reset your password.</h6>
                        <div className={style['form-group']}>
                            <div className={style['form-left-to-e-shop']} id={form.touched.email && form.errors.email ? 'error' : ''}>
                                {/* <img src={require('../images/email.png')} className="img-fluid-icons" alt="" /> */}
                                <EmailIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                <input type="email" name="email" placeholder="Email" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.email} />
                            </div>
                            {form.touched.email && form.errors.email ? (
                                <div className={style['text-danger']}>{form.errors.email}</div>
                            ) : null}
                            {/* <button type='submit'>Reset Password</button> */}
                            <button className={`${style['button']} ${style['accept-btn']}`} type="submit">
                                Reset Password
                            </button>
                        </div>
                        <div className={styles['footer']}>
                            <h5>New here? <a href='/' style={{ cursor: "pointer" }} onClick={handleClick}>Sign Up</a></h5>
                            <h6>Already have an account? <a href='/' style={{ cursor: "pointer" }} onClick={handleClickSign}>Sign In.</a></h6>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword

