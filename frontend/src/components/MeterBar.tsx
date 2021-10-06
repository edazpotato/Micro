import { Typography } from ".";
import clsx from "clsx";

function getNumbersPercentageOfSum(
	numbers: number[],
	decimalPlaces: number = 2
): [number[], number] {
	let total = 0;
	for (const number of numbers) {
		total += number;
	}
	return [
		numbers.map((number) =>
			Number(((number / total) * 100).toFixed(decimalPlaces))
		),
		Number(total.toFixed(decimalPlaces)),
	];
}

function getContrastText(background: [number, number, number]) {
	/* Taken from this StackOverflow answer: https://stackoverflow.com/a/3943023/11588447
	 * by user @mark-ransom
	 */
	return background[0] * 0.299 +
		background[1] * 0.587 +
		background[2] * 0.114 >
		186
		? "#000000"
		: "#ffffff";
}

interface MeterBarSection {
	label: string;
	amount: number;
	renderSectionAmount?: (amount: number) => string;
	colour: [number, number, number];
}

interface MeterBarProps {
	className?: string;
	label: string;
	sections: MeterBarSection[];
	showTotal?: boolean;
	showAmounts?: boolean;
	renderSectionAmount?: (amount: number) => string;
	renderTotal?: (amount: number) => string;
}

export function MeterBar({
	sections,
	className,
	renderSectionAmount,
	label,
	renderTotal,
	showTotal,
	showAmounts,
}: MeterBarProps) {
	const [percentages, total] = getNumbersPercentageOfSum(
		sections.map((section) => section.amount),
		2
	);

	const parsedSections = sections
		.map((section, i) => ({
			backgroundColour: section.colour,
			percentage: percentages[i],
			renderSectionAmount: section.renderSectionAmount,
			label: section.label,
			amount: section.amount,
		}))
		.sort((a, b) => a.amount - b.amount);

	// Not using <meter /> here because it's a pain to style
	return (
		<div className={clsx("MicroMeterBar w-full flex flex-col", className)}>
			<div className="px-20 flex">
				<Typography largeness="large">
					{label}
					{showTotal &&
						" " +
							(renderTotal
								? renderTotal(total)
								: `(Out of ${total})`)}
				</Typography>
				<legend className="ml-auto flex space-x-12">
					{parsedSections.map((section, i) => (
						<span
							key={section.percentage + "_" + i}
							className="flex items-center">
							<svg width="10" height="10" className="mr-2">
								<rect
									width="10"
									height="10"
									rx="2"
									ry="2"
									style={{
										fill: `rgb(${section.backgroundColour[0]}, ${section.backgroundColour[1]}, ${section.backgroundColour[2]})`,
									}}
								/>
							</svg>
							<Typography>{section.label}</Typography>
						</span>
					))}
				</legend>
			</div>
			<div className=" h-50 w-full rounded-medium flex items-center overflow-hidden">
				{parsedSections.map((section, i) => (
					<span
						key={section.percentage + "_" + i}
						className="h-full overflow-hidden flex-0 flex flex-nowrap items-center justify-center"
						style={{
							backgroundColor: `rgb(${section.backgroundColour[0]}, ${section.backgroundColour[1]}, ${section.backgroundColour[2]})`,
							width: `${section.percentage}%`,

							color: getContrastText(section.backgroundColour),
						}}>
						{`${section.percentage}%`}
						{showAmounts &&
							section.percentage > 30 &&
							` (${
								section.renderSectionAmount
									? section.renderSectionAmount(
											section.amount
									  )
									: renderSectionAmount
									? renderSectionAmount(section.amount)
									: section.amount
							})`}
					</span>
				))}
			</div>
		</div>
	);
}
