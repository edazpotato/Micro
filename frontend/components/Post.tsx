import { Card, Divider } from ".";

export function Post() {
	return (
		<Card className="MicroPost flex-0 min-h-120">
			<div className="p-12 flex items-center justify-center flex-col"></div>
			<Divider vertical />
			<div className="flex flex-col ">
				<Divider />
			</div>
		</Card>
	);
}
