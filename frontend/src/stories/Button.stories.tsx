import { Button, ButtonProps } from "../components";
import { Meta, Story } from "@storybook/react";

import { Plus as PlusIcon } from "react-feather";
import React from "react";

export default {
	component: Button,
	title: "Components/Button",
	argTypes: { onPress: { action: "click " } },
} as Meta;

export const Blue = () => (
	<Button colour="blue" onPress={() => console.log("Clicked!")}>
		Blue button
	</Button>
);

export const Disabled = () => (
	<Button colour="blue" disabled>
		Disabled button
	</Button>
);

export const Grey = () => (
	<div>
		<Button colour="grey" onPress={() => console.log("Clicked!")}>
			<PlusIcon />
		</Button>
	</div>
);

export const GreyDisabled = () => (
	<div>
		<Button colour="grey" disabled>
			<PlusIcon />
		</Button>
	</div>
);
