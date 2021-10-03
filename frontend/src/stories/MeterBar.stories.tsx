import { Meta } from "@storybook/react";
import { MeterBar } from "../components";

export default {
	component: MeterBar,
	title: "Components/MeterBar",
} as Meta;

export const Basic = () => (
	<MeterBar
		label="Revenue split"
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
);
