import { ChangeEvent, useRef } from "react";

import { Typography } from ".";
import clsx from "clsx";
import { useFocusRing } from "@react-aria/focus";
import { useTextField } from "@react-aria/textfield";

type TextFieldElement = HTMLInputElement | HTMLTextAreaElement;
type TextFieldChangeEvent = ChangeEvent<TextFieldElement>;

export interface TextFieldProps {
	label: string;
	placeholder?: string;
	value?: string;
	onChange?: (value: string, event: TextFieldChangeEvent) => void;
	onInput?: (value: string, event: TextFieldChangeEvent) => void;
	type?: "text" | "search" | "url" | "tel" | "email" | "password";
	multiline?: boolean;
	disabled?: boolean;
	autoFocus?: boolean;
	required?: boolean;
	rounded?: boolean;
	className?: string;
	fullWidth?: boolean;
	showLabel?: boolean;
}

export function TextField({
	label,
	placeholder,
	multiline,
	disabled,
	autoFocus,
	required,
	type,
	onInput,
	onChange,
	value,
	rounded,
	className,
	fullWidth,
	showLabel,
}: TextFieldProps) {
	const { isFocusVisible, focusProps } = useFocusRing({
		isTextInput: true,
		autoFocus,
	});

	const ref = useRef();

	const InputElement = multiline ? "textarea" : "input";

	const { labelProps, inputProps } = useTextField(
		{
			onInput: (event: TextFieldChangeEvent) => {
				!disabled && onInput && onInput(event.target.value, event);
			},
			onChange: (event: TextFieldChangeEvent) => {
				!disabled && onChange && onChange(event.target.value, event);
			},
			inputElementType: InputElement,
			isDisabled: disabled,
			isRequired: required,
			label,
			placeholder,
			autoFocus,
			type,
			value,
		},
		ref
	);

	return (
		<div
			className={clsx(
				"MicroTextInputWrapper flex flex-col ",
				fullWidth && "w-full"
				// Ring is on this not the actual element to prevent the ring from getting cut off
			)}
		>
			<label {...labelProps} className={clsx(!showLabel && "sr-only")}>
				<Typography>{label}</Typography>
			</label>
			<div
				className={clsx(
					"p-4 bg-inset dark:bg-inset-d",
					rounded ? "rounded-full" : "rounded-a-little-bit"
				)}
			>
				<InputElement
					{...inputProps}
					{...focusProps}
					ref={ref}
					className={clsx(
						"duration-100 resize-none bg-inset dark:bg-inset-d placeholder-placeholder dark:placeholder-placeholder-d text-text dark:text-text-d outline-none focus:outline-none",
						fullWidth && "w-full",
						multiline
							? "scrollable rounded-a-little-bit p-11" // 15 - 4 because of the padding for the ring
							: clsx(
									"p-8.5", // 12.5 - 4 because of the padding for the ring
									rounded
										? "rounded-full"
										: "rounded-a-little-bit"
							  ),
						isFocusVisible && "focus:ring-4",
						className
					)}
				/>
			</div>
		</div>
	);
}
