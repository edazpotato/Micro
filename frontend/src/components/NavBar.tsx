import { Hash as HashIcon } from "react-feather";
import { Typography } from ".";

export function NavBar() {
	let Icon = HashIcon;
	return (
		<header className="MicroNavBar h-60 sticky w-full ">
			<nav className="w-full h-full bg-foreground dark:bg-foreground-d flex items-center justify-center">
				<Icon className="text-header-icon dark:text-header-icon-d mr-2 h-8 w-8 stroke-2.5 stroke-current" />
				<Typography largeness="huge" boldness="mediumly bold">
					Micro
				</Typography>
			</nav>
		</header>
	);
}
