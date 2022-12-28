import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import LogIn from "../layouts/login";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "next/link";

export default function SingIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
		<LogIn>
			<Head>
				<title>Sign In</title>
			</Head>

			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl">Explore</h1>
					<p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
				</div>

				<form className="flex flex-col gap-3">
					<TextField id="email" label="Email" variant="outlined" />
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
						/>
					</FormControl>
					<Button className="bg-blue-400" variant="contained">Sign In</Button>
					<Button className="bg-blue-400" variant="contained" endIcon={<GoogleIcon />}>
						Sign in with Google
					</Button>
					<Button className="bg-blue-400" variant="contained" endIcon={<FacebookIcon />}>
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
