import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../interceptor/axiosInterceptor';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyIcon from '@mui/icons-material/Key';
import styles from '../../css/Forgot.module.css'
import style from '../../css/Login.module.css'


function ResetPassword() {
  const { userId, resetToken } = useParams();
  const [open, setOpen] = useState(false);
  const theme = createTheme({
    palette: {
      success: {
        main: 'rgba(170, 196, 174, 1)'
      },
    }
  });
  const navigate = useNavigate()
  const [setErrors] = useState({
    password: false,
    confirmPassword: false
  });
  const form = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      userId: userId,
      resetToken: resetToken
    },
    validationSchema: Yup.object({
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
          password: form.touched.password && form.errors.password,
          confirmPassword: form.touched.confirmPassword && form.errors.confirmPassword,
        });
        setSubmitting(false);
        return;
      }
      if (form.isValid) {
        axiosInstance.post('/reset-password/', form.values)
          .then((Response) => {
            setOpen(true);
            setTimeout(() => {
              navigate("/login")
            }, 1500)
            console.log(Response)
          })
      }
    }
  })

  return (
    <div>
      <div className={style['body-login']}>
        <ThemeProvider theme={theme}>
          <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <MuiAlert elevation={6} variant="filled" onClose={() => setOpen(false)} severity="success">
              Password Reset Successfully!
            </MuiAlert>
          </Snackbar>
        </ThemeProvider>
        <div className={styles['row']}>
          <h1>Reset Password</h1>
          <form onSubmit={form.handleSubmit}>
            <h6 className={styles['information-text']}>Enter a new password to reset your password.</h6>
            <div className={styles['form-group']}>
              <div className={style['form-left-to-e-shop']} id={form.touched.password && form.errors.password ? 'error' : ''}>
                {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                <input type="password" name="password" placeholder="Password" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.password} />
              </div>
              {form.touched.password && form.errors.password ? (
                <div className={styles['txt-danger']}>{form.errors.password}</div>
              ) : null}
              <div className={style['form-left-to-e-shop']} id={form.touched.confirmPassword && form.errors.confirmPassword ? 'error' : ''}>
                {/* <img src={require('../images/key.png')} className="img-fluid-icons" alt="" /> */}
                <KeyIcon style={{ fill: 'rgba(173,216,230,1)', width: '40px', height: '30px', marginLeft: '4px', marginTop: '4px', marginBottom: '4px' }} />
                <input type="password" name="confirmPassword" placeholder="ConfirmPassword" onBlur={form.handleBlur} onChange={form.handleChange} value={form.values.confirmPassword} />
              </div>
              {form.touched.confirmPassword && form.errors.confirmPassword ? (
                <div className={styles['txt-danger']}>{form.errors.confirmPassword}</div>
              ) : null}
              <button className={`${style['button']} ${style['accept-btn']}`} type='submit'>Submit  </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
