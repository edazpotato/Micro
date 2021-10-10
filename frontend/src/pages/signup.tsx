import { Button, Card, Layout, TextField, Typography } from "../components";

export default function Homepage() {
	return (
		<Layout>
			<form action="get">
				<div className="flex flex-row min-h-screen justify-center items-center">
					<Card className="grid gap-4 place-items-center rounded-lg px-60 py-20">
						<TextField
							label="Username..."
							placeholder="Username..."
							type="text"
							required={true}></TextField>
						<TextField
							label="Email..."
							placeholder="Email..."
							type="email"
							required={true}></TextField>
						<TextField
							label="Password..."
							placeholder="Password..."
							required={true}
							type="password"></TextField>
						{/* TODO: ADD INFO BUTTON FOR ACCESS CODE FIELD */}
						<TextField
							label="Access code..."
							placeholder="Access code..."
							type="text"
							required={true}></TextField>
						<div className="divider"></div>
						<Button colour="blue" text="Signup" className="p-4" />
					</Card>
					<Typography>
						<p>
							<a href="/login">Already have an account?</a>
						</p>
					</Typography>
				</div>
			</form>
		</Layout>
	);
}
