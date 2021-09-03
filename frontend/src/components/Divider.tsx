export function Divider({ vertical }: { vertical?: boolean }) {
	return (
		<hr
			className={`MicroDivider ${
				vertical ? "h-full border-l" : "w-full border-b"
			} border-border dark:border-border-d`}
		/>
	);
}
