import { Card, ProgressBar, Typography } from "../components";

import { Meta } from "@storybook/react";

export default {
	component: ProgressBar,
	title: "Components/ProgressBar",
} as Meta;

export const Basic = () => (
	<>
		<Card className="p-16 w-full">
			<ProgressBar max={100} current={45} label="Level 1" />
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const WithAmountCompleted = () => (
	<>
		<Card className="p-16 w-full">
			<ProgressBar
				showAmountCompleted
				max={100}
				current={45}
				label="Level 1"
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);

export const WithAmountCompletedRenderer = () => (
	<>
		<Card className="p-16 w-full">
			<ProgressBar
				showAmountCompleted
				renderAmountCompleted={(max, current, percentageCompleted) =>
					`${current} / ${max} xp`
				}
				max={100}
				current={45}
				label="Level 1"
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
