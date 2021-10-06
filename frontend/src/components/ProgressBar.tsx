import { Typography } from ".";
import clsx from "clsx";

interface ProgressBarProps {
	className?: string;
	max: number;
	current: number;
	label: string;
	showAmountCompleted?: boolean;
	renderAmountCompleted?: (
		max: number,
		current: number,
		percentage: string
	) => string;
}

export function ProgressBar({
	max,
	current,
	className,
	label,
	showAmountCompleted = false,
	renderAmountCompleted,
}: ProgressBarProps) {
	const widthPercentage = ((current / max) * 100).toFixed(2);

	// Not using <progress /> here because it's a pain to style
	return (
		<div
			className={clsx(
				"MicroProgressBarRoot flex flex-col w-full",
				className
			)}>
			<div className="flex mb-6">
				<Typography boldness="mediumly bold" largeness="button">
					{label}
				</Typography>
				<div className="ml-auto">
					<Typography boldness="mediumly bold" largeness="button">
						{showAmountCompleted &&
							(renderAmountCompleted
								? renderAmountCompleted(
										max,
										current,
										widthPercentage
								  )
								: `${current} / ${max}`)}
					</Typography>
				</div>
			</div>
			<div
				className="MicroProgressBar bg-inset dark:bg-inset-d h-15 w-full overflow-hidden rounded-medium"
				title={`${widthPercentage}%`}>
				<span
					style={{ width: `${widthPercentage}%` }}
					className="block h-full bg-blue"></span>
			</div>
		</div>
	);
}
