import classNames from "classnames";
import { useState } from "react";

export type Theme = "light" | "dark";
export interface InputBoxProps {
	placeholder?: string;
	value?: string;
	theme?: Theme;
	onChange?: (label: string) => void;
	className?: string;
	style?: React.CSSProperties;
	fill?: boolean;
	autoFocus?: boolean;
	type?: React.HTMLInputTypeAttribute;
	error?: string | undefined
}

const themes = {
	base: "shadow p-2 rounded outline-none",
	light: "text-black bg-white/20 focus:bg-white/30",
	dark:
		"text-white bg-black/60 hover:bg-black/70 focus:bg-black/80\
	focus:shadow-white/30"
};

export function useInputBox(initialValue: string = "") {
	const [value, setValue] = useState(initialValue);

	const onChange = (value: string) => setValue(value);

	return {
		value,
		setValue,
		onChange,
	};
}

export default function InputBox({
	theme,
	placeholder,
	value,
	fill,
	className,
	style,
	autoFocus,
	type,
	onChange,
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
