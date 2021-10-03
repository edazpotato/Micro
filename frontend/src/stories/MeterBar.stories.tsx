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
				sections={[
					{
						label: "Micro",
						amount: 35.32,
						colour: [35, 83, 158],
					},
					{
						label: "Charity",
						amount: 125.45,
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

export const WithMoreThanTwoSections = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
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

export const WithAmounts = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
				showAmounts
				sections={[
					{
						label: "Micro",
						amount: 35.32,
						colour: [35, 83, 158],
					},
					{
						label: "Charity",
						amount: 125.45,
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

export const WithAmountRenderers = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
				showAmounts
				renderSectionAmount={(amount) => `$${amount} NZD`}
				sections={[
					{
						label: "Micro",
						amount: 35.32,
						colour: [35, 83, 158],
					},
					{
						label: "Charity",
						amount: 125.45,
						colour: [158, 35, 72],
						renderSectionAmount: (amount) => `🎉${amount}!!🎉`,
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

export const WithTotal = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
				showTotal
				sections={[
					{
						label: "Micro",
						amount: 35.32,
						colour: [35, 83, 158],
					},
					{
						label: "Charity",
						amount: 125.45,
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

export const WithTotalRenderer = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
				showTotal
				renderTotal={(amount) => `(Out of $${amount} NZD)`}
				sections={[
					{
						label: "Micro",
						amount: 35.32,
						colour: [35, 83, 158],
					},
					{
						label: "Charity",
						amount: 125.45,
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

export const WithEverything = () => (
	<>
		<Card className="p-16 w-full">
			<MeterBar
				label="Revenue split"
				showTotal
				renderTotal={(amount) => `(Out of $${amount} NZD)`}
				showAmounts
				renderSectionAmount={(amount) => `$${amount} NZD`}
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
						renderSectionAmount: (amount) => `$${amount} USD`,
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
