export function Divider({ vertical }: { vertical?: boolean }) {
	return (
		<hr
			className={`${
				vertical ? "h-full border-l" : "w-full border-b"
			} border-border dark:border-border-d`}
		/>
	);
}
