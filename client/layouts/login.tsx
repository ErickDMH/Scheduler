import { PropsWithChildren } from "react";
import styles from '../styles/Login.module.css'

export default function LogIn(props: PropsWithChildren) {
	const {children } = props;
	return (
		<div className="flex h-screen bg-blue-400">
			<div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
				<div className={styles.imgBg}>

				</div>
				<div className="right flex flex-col justify-evenly">
					<div className="text-center py-10">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}
