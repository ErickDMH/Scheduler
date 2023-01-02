import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import LogIn from "../layouts/login";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required')
	.matches(
		/^(?=.*\d)(?=.*[A-Z])(?=.*[!#$%&? "])[a-zA-Z0-9!#$%&?]{10,}$/,
		"Password should be min 10 characters and contain 1 number, 1 Uppercase and 1 special character (!#$%&? "),
  confirmPassword: yup.string()
		.oneOf([yup.ref('password'), null], 'Password must match').required('Confirm password is required')
});

export default function SingUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

	const onSubmit = async (values: any) => {
		alert(JSON.stringify(values, null, 2))
	}
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		validationSchema: signUpSchema,
		onSubmit,
	})

  return (
		<LogIn>
			<Head>
				<title>Sign Up</title>
        <meta name="register" content="This is the sign up where you register directly to the page." />
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl">Explore</h1>
					<p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
				</div>

				<form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
					<TextField
						id="name"
						label="Username"
						variant="outlined"
						error={'name' in formik.errors}
						helperText={formik.errors.name}
						{...formik.getFieldProps('name')}
					/>
					<TextField
						id="email"
						label="Email"
						variant="outlined"
						error={'email' in formik.errors}
						helperText={formik.errors.email}
						{...formik.getFieldProps('email')}
					/>
					<FormControl variant="outlined">
						<InputLabel htmlFor="password" error={'password' in formik.errors}>Password</InputLabel>
						<OutlinedInput
							id="password"
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Password"
							error={'password' in formik.errors}
							{...formik.getFieldProps('password')}
						/>
						<FormHelperText id="password-helper" error={'password' in formik.errors}>{formik.errors.password}</FormHelperText>
					</FormControl>
					<FormControl variant="outlined">
						<InputLabel htmlFor="confirmPassword" error={'confirmPassword' in formik.errors}>Confirm Password</InputLabel>
						<OutlinedInput
							id="confirmPassword"
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label="Confirm Password"
							error={'confirmPassword' in formik.errors}
							{...formik.getFieldProps('confirmPassword')}
						/>
						<FormHelperText id="confirmPassword-helper" error={'confirmPassword' in formik.errors}>{formik.errors.confirmPassword}</FormHelperText>
					</FormControl>
					<Button
						className="bg-blue-400"
						variant="contained"
						type="submit"
					>
						Sign Up
					</Button>
				</form>
			</section>

			<p className="text-center text-gray-400 pt-4">
				Have an account?
				<Link className="text-blue-600" href="/signin">Sign In</Link>
			</p>
		</LogIn>
  )
}
