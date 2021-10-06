import {
	Avatar,
	Button,
	Card,
	Divider,
	Layout,
	Typography,
	UserName,
} from "../../components";

import { UserPlus as UserPlusIcon } from "react-feather";
import { useRouter } from "next/router";

export default function UserPage() {
	const router = useRouter();
	let name = router.query["user"];
	if (Array.isArray(name)) name = name[0];

	return (
		<Layout title={name}>
			<Card className="flex-col">
				<div className="flex p-15">
					<Avatar
						size="humongous"
						src="https://github.com/themoddedchicken.png"
						name="TheModdedChicken"
					/>
					<div className="flex flex-col ml-13">
						<UserName
							name="TheModdedChicken"
							supporter
							size="big"
						/>
						<div className="flex items-center space-x-7">
							<UserPlusIcon className="stroke-current text-icon" />
							<Typography>Aug 29, 2021</Typography>
						</div>
						<div className="flex space-x-7">
							<span>
								<Typography boldness="bold">10</Typography>{" "}
								<Typography>Followers</Typography>
							</span>
							<span>
								<Typography boldness="bold">1</Typography>{" "}
								<Typography>Post</Typography>
							</span>
						</div>
					</div>
				</div>
				<Divider />
				<div className="w-full flex items-center px-15 py-9">
					<Typography>“Damn that Edaz”</Typography>
					<Button
						className="ml-auto"
						colour="blue"
						text="Follow"
						disabled
					/>
				</div>
			</Card>
		</Layout>
	);
}
