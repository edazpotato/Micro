import { Link } from "../components";
import { Meta } from "@storybook/react";

export default {
	component: Link,
	title: "Components/Link",
} as Meta;

export const Basic = () => <Link>I'm a link</Link>;
