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
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import KeyIcon from '@mui/icons-material/Key';

function Register() {
    let error, errorMsg;
    const theme = createTheme({
        palette: {
            success: {
                main: 'rgba(170, 196, 174, 1)'
            },
        }
    });
    const handleClick = (event) => {
        event.preventDefault();
        navigate("/login")
    }
    const navigate = useNavigate()
    const [openWarning, setOpenwarning] = useState(false);
    const [open, setOpen] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [setErrors] = useState({
        email: false,
        phone: false,
        password: false,
        confirmPassword: false
    });
    const form = useFormik({
        initialValues: {
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('email is required'),
            phone: Yup.string()
                .length(10, 'Phone number must be 10 digits'),
            password: Yup.string()
                .required('Password is required')
                .min(9, 'Password must be more than 8 characters')
                .max(50, 'Password must not exceed 50 characters')
                .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, 'Password must contain one uppercase, one number and one special case character'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            if (!form.isValid) {
                setErrors({
                    email: form.touched.email && form.errors.email,
                    phone: form.touched.phone && form.errors.phone,
                    password: form.touched.password && form.errors.password,
                    confirmPassword: form.touched.confirmPassword && form.errors.confirmPassword
                });
                setSubmitting(false);
                return;
            }
            axiosInstance.post('/register/', values)
                .then((response) => {
                    setSubmitting(false);
                    setOpen(true);
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500)
                }, (errors) => {
                    if (errors.request.status === 409) {
                        error = errors.response.data.errors.map((x, index) => (x.message))
                        errorMsg = error.length === 2 ? "Email and Phone already exist" : error[0]
                        setErrMsg(errorMsg);
                        setOpenwarning(true)
                    }
                    setSubmitting(false);
                    // dispatch(storeData(errors));
                },)
        }
    });


    return (
        <div>
            <div className={styles['body-login']}>
                <ThemeProvider theme={theme}>
                    <Snackbar open={openWarning} autoHideDuration={6000} onClose={() => setOpenwarning(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setOpenwarning(false)} severity="warning">
                            {errMsg}
                        </MuiAlert>
                    </Snackbar>
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="success">
                            Registration Successful!
                        </MuiAlert>
                    </Snackbar>
                </ThemeProvider>
                <div className={styles['e-shopper-two-grids']}>
                    <div className={styles['mid-className']}>
                        <div className={styles['txt-left-side']}>
                            <h2> Register Here </h2>
                            <p></p>
                            <form action="#" method="post" onSubmit={form.handleSubmit}>
                                <div className={styles['form-left-to-e-shop']} id={form.touched.email && form.errors.email ? 'error' : ''}>
                                    {/* <img src={require('../images/email.png')} className="img-fluid-icons" alt="" /> */}
                                    <EmailIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                    <input type="email" name="email" placeholder="Email &#42;" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.email} />
                                </div>
                                {form.touched.email && form.errors.email ? (
                                    <div className={styles['text-danger']}>{form.errors.email}</div>
                                ) : null}
                                <div className={styles['form-left-to-e-shop']} id={form.touched.phone && form.errors.phone ? 'error' : ''}>
                                    {/* <img src={require('../images/phone.png')} className="img-fluid-icons" alt="" /> */}
                                    <LocalPhoneIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                    <input type="text" name="phone" placeholder="phone" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.phone} />
                                </div>
                                {form.touched.phone && form.errors.phone ? (
                                    <div className={styles['text-danger']}>{form.errors.phone}</div>
                                ) : null}
                                <div className={styles['form-left-to-e-shop']} id={form.touched.password && form.errors.password ? 'error' : ''}>
                                    {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                                    <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                    <input type="password" name="password" placeholder="Password &#42;" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.password} />
                                </div>
                                {form.touched.password && form.errors.password ? (
                                    <div className={styles['text-danger']}>{form.errors.password}</div>
                                ) : null}
                                <div className={styles['form-left-to-e-shop']} id={form.touched.confirmPassword && form.errors.confirmPassword ? 'error' : ''}>
                                    {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                                    <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                                    <input type="password" name="confirmPassword" placeholder="confirmPassword &#42;" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.confirmPassword} />
                                </div>
                                {form.touched.confirmPassword && form.errors.confirmPassword ? (
                                    <div className={styles['text-danger']}>{form.errors.confirmPassword}</div>
                                ) : null}
                                {/* <div className="btnn">
                                <button type="submit">Register </button>
                            </div> */}
                                <button className={`${styles['button']} ${styles['accept-btn']}`} type="submit">
                                    Register
                                </button>
                            </form>
                            <div className={styles['e-shopper_more-buttn']}>
                                <h3>Already have an account?
                                    <a href='/' onClick={handleClick}>
                                        Login Here
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div className={styles['img-right-side']}>
                            <h3>Welcome To E-shopper</h3>
                            <p></p>
                            <img src={require('../../images/shop.jpg')} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register