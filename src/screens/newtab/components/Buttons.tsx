// This file defines the Button and CircleButton React Components of the new tab page.
// It is a set of buttons that allow the user, for instance, to open and close the new tab page's settings menu

import { IOpenCloseSystemHook } from "@/features/OpenCloseSystem";
import classNames from "classnames";

export type ButtonStyle = "primary" | "label";
export interface BaseButtonProps {
	onClick: () => void;
	style: ButtonStyle;
	type?: "submit" | "reset" | "button" | undefined;
	className?: string | undefined;
	active?: boolean;
	openCloseSystem?: IOpenCloseSystemHook;
}

type ButtonProps = BaseButtonProps &
	(
		| {
			label: string;
			children?: React.ReactNode;
		}
		| {
			children: React.ReactNode;
			label?: string;
		}
	);

// The Button can be styled in three ways: primary, label, and active
const buttonStyles = {
	main: "font-bold rounded w-fit py-1 px-2 outline-none",
	active:
		"text-black bg-white/90 hover:bg-white active:bg-white focus:bg-white",
	primary:
		"text-black bg-white/70 hover:bg-white/80 active:bg-white/90 focus:bg-white/80",
	label:
		"text-white hover:text-black hover:bg-white/80 focus:bg-white/90 focus:text-black"
};

export function Button({
	label,
	onClick,
	style,
	type,
	className,
	children,
	active,
	openCloseSystem,
}: ButtonProps) {
	const activeState = openCloseSystem ? openCloseSystem.active : active;

	return (
		<button
			className={classNames(
				buttonStyles.main,
				{
					[buttonStyles.active]: activeState,
					[buttonStyles[style]]: !activeState,
				},
				className
			)}
			onClick={openCloseSystem ? openCloseSystem.toggle : onClick}
			type={type}
		>
			{children ? (
				<div className="flex items-center space-x-2">{children}</div>
			) : (
				label
			)}
		</button>
	);
}

export function CircleButton({
	onClick,
	children,
	className
}: {
	onClick: () => void;
	children: React.ReactNode;
	className?: string | undefined;
}) {
	return (
		<button
			className={classNames(
				"hover:bg-black/50 text-white rounded-full cursor-pointer bg-black/20\
				justify-center items-center place-items-center place-content-center\
				flex",
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
