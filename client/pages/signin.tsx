import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import LogIn from "../layouts/login";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "next/link";
import { signIn } from "next-auth/react"
import { useFormik } from "formik";
import * as yup from 'yup';

const signInSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required(),
  password: yup.string().required()
	.matches(
		/^(?=.*\d)(?=.*[A-Z])(?=.*[!#$%&? "])[a-zA-Z0-9!#$%&?]{10,}$/,
		"Password should be min 10 characters and contain 1 number, 1 Uppercase and 1 special character (!#$%&? "),
});

export default function SingIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

	const handleGoogleSignIn = async () => {
		signIn('google', {callbackUrl: "http://localhost:3000"} )
	}

	const onSubmit = async (values: any) => {
		alert(JSON.stringify(values, null, 2))
	}
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: signInSchema,
		onSubmit
	})

  return (
		<LogIn>
			<Head>
				<title>Sign In</title>
        <meta name="Login" content="Login through the method of your choosing." />
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl">Explore</h1>
					<p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
				</div>

				<form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
					<TextField
						id="email"
						label="Email"
						variant="outlined"
						error={'email' in formik.errors}
						helperText={formik.errors.email}
						{...formik.getFieldProps('email')}
					/>
					<FormControl variant="outlined">
						<InputLabel htmlFor="password">Password</InputLabel>
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
					<Button className="bg-blue-400" variant="contained" type="submit">Sign In</Button>
					<Button
						className="bg-blue-400"
						variant="contained"
						endIcon={<GoogleIcon />}
						onClick={handleGoogleSignIn}
						type="submit"
					>
						Sign in with Google
					</Button>
					<Button
						className="bg-blue-400"
						variant="contained"
						endIcon={<FacebookIcon />}
						type="submit"
					>
						Sign in with Facebook
					</Button>
				</form>

				<p className="text-center text-gray-400">
					Don't you have an account yet?
					<Link className="text-blue-600" href="/signup">Sign Up</Link>
				</p>
			</section>
		</LogIn>
  )
}
