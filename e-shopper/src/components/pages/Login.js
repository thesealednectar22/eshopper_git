import React, { useState } from 'react'
import styles from '../../css/Login.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../interceptor/axiosInterceptor';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';

 function Login() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [OpenError, setOpenError] = useState(false);
    const [setErrors] = useState({
        email: false,
        password: false,
    });
    const theme = createTheme({
        palette: {
            success: {
                main: 'rgba(170, 196, 174, 1)'
            },
        }
    });

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/forgot")
    }
    const handleClickForgot = (event) => {
        event.preventDefault();
        navigate("/register")
    }

    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('email is Required'),
            password: Yup.string()
                .required('Password is required')
                .min(9, 'Password must be more than 8 characters')
                .max(50, 'Password must not exceed 50 characters')
                .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Password must contain one uppercase, one number and one special case character')
        }),
        onSubmit: (values, { setSubmitting }) => {
            if (!form.isValid) {
                setErrors({
                    email: form.touched.email && form.errors.email,
                    password: form.touched.password && form.errors.password,
                });
                setSubmitting(false);
                return;
            }
            if (form.isValid) {
                axiosInstance.post('/login/', form.values)
                    .then((Response) => {
                        setSubmitting(false);
                        localStorage.setItem("access", Response.data.access)
                        localStorage.setItem("refresh", Response.data.refresh)
                        setOpen(true);
                        setTimeout(() => {
                            navigate("/")
                        }, 1500)
                    }, (errors) => {
                        setOpenError(true)
                        setSubmitting(false);
                    },)
            }
        }
    });

    return (
        <div>
            <div className={styles['body-login']}>
                <ThemeProvider theme={theme}>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="success">
                            Login Successful!
                        </MuiAlert>
                    </Snackbar>
                    <Snackbar open={OpenError} autoHideDuration={6000} onClose={() => setOpenError(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenError(false)} severity="error">
                            Invalid credentials
                        </MuiAlert>
                    </Snackbar>
                </ThemeProvider>
                <div className={styles['e-shopper-two-grids']}>
                    <div className={styles['mid-className']}>
                        <div className={styles['txt-left-side']}>
                            <h2> Login Here </h2>
                            <p></p>
                            <form action="#" method="post" onSubmit={form.handleSubmit}>
                                <div className={styles['form-left-to-e-shop']} id={form.touched.email && form.errors.email ? 'error' : ''}>
                                    {/* <img src={require('../images/email.png')} className="img-fluid-icons" alt="" /> */}
                                    <EmailIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                    <input type="email" name="email" placeholder="Email" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.email} />
                                </div>
                                {form.touched.email && form.errors.email ? (
                                    <div className={styles['text-danger']}>{form.errors.email}</div>
                                ) : null}
                                <div className={styles['form-left-to-e-shop']} id={form.touched.password && form.errors.password ? 'error' : ''}>
                                    {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                                    <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                    <input type="password" name="password" placeholder="Password" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.password} />
                                </div>
                                {form.touched.password && form.errors.password ? (
                                    <div className={styles['text-danger']}>{form.errors.password}</div>
                                ) : null}
                                <a className={styles['forgot-link']} style={{ cursor: "pointer" }} onClick={handleClick} href='/'>
                                    Forgot Password?
                                </a>
                                <button className={`${styles['button']} ${styles['accept-btn']}`} type="submit">
                                    Login
                                </button>
                            </form>
                            <div className={styles['e-shopper_more-buttn']}>
                                <h3>Don't Have an account..?
                                    <a style={{ cursor: "pointer" }} href='/' onClick={handleClickForgot}>
                                        Sign Up Here
                                    </a>
                                </h3><br></br>
                            </div>
                        </div>
                        <div className={styles['img-right-side']}>
                            <h3>Welcome To E-shopper</h3>
                            <p></p>
                            <img src={require('../../images/shop.jpg')} className={styles['img-fluid']} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default Login