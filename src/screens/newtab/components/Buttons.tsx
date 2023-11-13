import classNames from "classnames";

export type ButtonStyle = "primary" | "label";
export interface BaseButtonProps {
	onClick: () => void;
	style: ButtonStyle;
	type?: "submit" | "reset" | "button" | undefined;
	className?: string | undefined;
}

type ButtonProps = BaseButtonProps & ({
	label: string; children?: React.ReactNode
} | {
	children: React.ReactNode; label?: string
});


const buttonStyles = {
	main: "font-bold rounded w-fit py-1 px-2 outline-none",
	primary:
		"text-black bg-white/70 hover:bg-white/80 active:bg-white/90 focus:bg-white/80",
	label: "text-white hover:text-black hover:bg-white/80 focus:bg-white/90 focus:text-black",
};

export function Button({
	label,
	onClick,
	style,
	type,
	className,
	children,
}: ButtonProps
) {
	return (
		<button
			className={classNames(buttonStyles.main, buttonStyles[style], className)}
			onClick={onClick}
			type={type}
		>
			{
				children
					? <div className="flex items-center space-x-2">{children}</div>
					: label
			}
		</button>
	);
}

export function CircleButton({
	onClick,
	children,
	className,
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
				className)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
