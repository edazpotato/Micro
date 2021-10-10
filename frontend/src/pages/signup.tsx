import {
	Button,
	Card,
	Divider,
	Layout,
	Link,
	TextField,
	Typography,
} from "../components";

export default function Homepage() {
	return (
		<Layout title="Sign up" authPage>
			<div className="flex flex-col min-h-screen justify-center items-center">
				<Card>
					<form
						action="#"
						className="w-full flex flex-col items-center">
						<div className="w-full px-60 py-20 space-y-20">
							<TextField
								label="Username..."
								placeholder="Username..."
								type="text"
								required
							/>
							<TextField
								label="Email..."
								placeholder="Email..."
								type="email"
								required
							/>
							<TextField
								label="Password..."
								placeholder="Password..."
								required
								type="password"
							/>
							{/* TODO: ADD INFO BUTTON FOR ACCESS CODE FIELD */}
							<TextField
								label="Access code..."
								placeholder="Access code..."
								type="text"
								required
							/>
						</div>
						<Divider />
						<div className="py-10">
							<Button
								colour="blue"
								text="Signup"
								className="p-4"
							/>
						</div>
					</form>
				</Card>

				<Link href="/login">Switch to Login</Link>
			</div>
		</Layout>
	);
}
