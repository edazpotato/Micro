import { Card, MeterBar, Typography } from "../components";

import { Meta } from "@storybook/react";

export default {
	component: MeterBar,
	title: "Components/MeterBar",
} as Meta;

export const Basic = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
				renderTotalAmountText={(amount) => `Out of $${amount}`}
				renderExtendedText={(amount) => `$${amount} NZD`}
				sections={[
					{
						label: "Joe",
						amount: 69,
						colour: [144, 52, 140],
					},
					{
						label: "Micro",
						amount: 35.32,
						colour: [35, 83, 158],
					},
					{
						label: "Charity",
						amount: 125.45,
						renderExtendedText: (amount) => `$${amount} USD`,
						colour: [158, 35, 72],
					},
				]}
			/>
		</Card>
		<Typography>
			^ Inside a card so that it can be seen against the correct
			background.
		</Typography>
	</>
);
