/**
 * Defines the InputBox React Component in the new tab page.
 * @module InputBox
 */

import classNames from "classnames";
import { useState } from "react";

/**
 * The InputBox can be styled in two ways: light or dark.
 */
export type Theme = "light" | "dark";

/**
 * The input box properties
 */
export interface InputBoxProps {
	/** Placeholder text for the input box */
	placeholder?: string;
	/** The value of the input box */
	value?: string;
	/** The theme of the input box */
	theme?: Theme;
	/** Function to be called when the input box value changes */
	onChange?: (label: string) => void;
	/** Additional class name(s) for the input box */
	className?: string;
	/** Additional inline styles for the input box */
	style?: React.CSSProperties;
	/** Whether the input box should fill its container */
	fill?: boolean;
	/** Whether the input box should be focused on mount */
	autoFocus?: boolean;
	/** The type of the input box */
	type?: React.HTMLInputTypeAttribute;
	/** Error message to be displayed below the input box */
	error?: string | undefined
}

/**
 * Object containing CSS classes for the different input box themes
 */
const themes = {
	base: "shadow p-2 rounded outline-none",
	light: "text-black bg-white/20 focus:bg-white/30",
	dark:
		"text-white bg-black/60 hover:bg-black/70 focus:bg-black/80\
	focus:shadow-white/30"
};

/**
 * Custom hook for managing input box state
 * @param initialValue - The initial value of the input box
 * @returns An object containing the current value of the input box, a function to set the value, and a function to handle changes to the value
 */
export function useInputBox(initialValue: string = "") {
	const [value, setValue] = useState(initialValue);

	const onChange = (value: string) => setValue(value);

	return {
		value,
		setValue,
		onChange,
	};
}

/**
 * React component for an input box
 * @param theme - The theme of the input box
 * @param placeholder - Placeholder text for the input box
 * @param value - The value of the input box
 * @param fill - Whether the input box should fill its container
 * @param className - Additional class name(s) for the input box
 * @param style - Additional inline styles for the input box
 * @param autoFocus - Whether the input box should be focused on mount
 * @param type - The type of the input box
 * @param onChange - Function to be called when the input box value changes
 * @returns A React input element
 */
export default function InputBox({
	theme,
	placeholder,
	value,
	fill,
	className,
	style,
	autoFocus,
	type,
	onChange
}: InputBoxProps) {
	return (
		<input
			className={classNames(
				themes["base"],
				themes[theme || "light"],
				{
					"w-full": fill
				},
				className
			)}
			type={type}
			style={style}
			value={value}
			placeholder={placeholder}
			autoFocus={autoFocus}
			onChange={(e) => onChange && onChange(e.target.value)}
		/>
	);
}
