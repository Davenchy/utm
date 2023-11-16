// This file exports a Container component for the new tab page.


import classNames from "classnames";

/**
 * The main axis of the container.
 */
export type MainAxis = "row" | "column" | "row-reverse" | "column-reverse";

/**
 * The alignment of items along the main axis.
 */
export type AxisAlignment =
	| "start"
	| "center"
	| "end"
	| "around"
	| "between"
	| "evenly";

/**
 * The alignment of items along the cross axis.
 */
export type ItemsAlignment =
	| "start"
	| "center"
	| "end"
	| "stretch"
	| "baseline";

/**
 * Props for the Container component.
 */
export interface ContainerProps {
	/**
	 * The child elements to be rendered inside the container.
	 */
	children: React.ReactNode;
	/**
	 * The main axis of the container.
	 */
	mainAxis?: MainAxis;
	/**
	 * The alignment of items along the main axis.
	 */
	mainAxisAlignment?: AxisAlignment;
	/**
	 * The alignment of items along the cross axis.
	 */
	crossAxisAlignment?: AxisAlignment;
	/**
	 * The alignment of items along the items axis.
	 */
	itemsAlignment?: ItemsAlignment;
	/**
	 * Whether the container should expand to fill its parent container.
	 */
	expand?: boolean;
	/**
	 * Whether the container should be positioned absolutely.
	 */
	float?: boolean;
	/**
	 * Whether the container should fill its parent container.
	 */
	fill?: boolean;
	/**
	 * Additional class names to be applied to the container.
	 */
	className?: string;
	/**
	 * Additional styles to be applied to the container.
	 */
	style?: React.CSSProperties;
}

/**
 * Styles for the main axis of the container.
 */
const axisStyle = {
	"row": "flex-row",
	"column": "flex-col",
	"row-reverse": "flex-row-reverse",
	"column-reverse": "flex-col-reverse"
};

/**
 * Styles for the alignment of items along the main axis.
 */
const justifyStyle = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	around: "justify-around",
	between: "justify-between",
	evenly: "justify-evenly"
};

/**
 * Styles for the alignment of items along the cross axis.
 */
const contentStyle = {
	start: "content-start",
	center: "content-center",
	end: "content-end",
	around: "content-around",
	between: "content-between",
	evenly: "content-evenly"
};

/**
 * Styles for the alignment of items along the items axis.
 */
const itemsStyle = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
	baseline: "items-baseline"
};

/**
 * A flexible container component for creating layouts.
 * @param mainAxis The main axis of the container.
 * @param mainAxisAlignment The alignment of items along the main axis.
 * @param crossAxisAlignment The alignment of items along the cross axis.
 * @param itemsAlignment The alignment of items along the items axis.
 * @param className Additional class names to be applied to the container.
 * @param expand Whether the container should expand to fill its parent container.
 * @param float Whether the container should be positioned absolutely.
 * @param fill Whether the container should fill its parent container.
 * @param style Additional styles to be applied to the container.
 * @param children The child elements to be rendered inside the container.
 * @returns A flexible container component for creating layouts.
 */
export function Container({
	mainAxis,
	mainAxisAlignment,
	crossAxisAlignment,
	itemsAlignment,
	className,
	expand,
	float,
	fill,
	style,
	children
}: ContainerProps) {
	const isRow = mainAxis === "row" || mainAxis === "row-reverse";

	return (
		<div
			className={classNames(
				"bg-black/50 flex text-white",
				axisStyle[mainAxis || "column"],
				justifyStyle[
				isRow ? mainAxisAlignment || "start" : crossAxisAlignment || "start"
				],
				contentStyle[
				isRow ? crossAxisAlignment || "start" : mainAxisAlignment || "start"
				],
				itemsStyle[itemsAlignment || "start"],
				{
					"grow": expand,
					"absolute": float,
					"w-full h-full": fill
				},
				className
			)}
			style={style}
		>
			{children}
		</div>
	);
}

/**
 * A header component for the container.
 * @param children The child elements to be rendered inside the header.
 * @returns A header component for the container.
 */
export function Header({ children }: { children: React.ReactNode }) {
	return (
		<div
			className="bg-black/80 py-2 flex justify-center items-center w-full
				space-x-2"
		>
			{children}
		</div>
	);
}

/**
 * A title component for the container.
 * @param label The label to be displayed as the title.
 * @returns A title component for the container.
 */
export function Title({ label }: { label: string }) {
	return <h1 className="text-2xl font-bold text-center">{label}</h1>;
}

/**
 * An expandable component for the container.
 * @param children The child elements to be rendered inside the expandable.
 * @returns An expandable component for the container.
 */
export function Expandable({ children }: { children: React.ReactNode }) {
	return <div className="grow">{children}</div>;
}

/**
 * A space component for the container.
 * @returns A space component for the container.
 */
export function Space() {
	return <div className="grow" />;
}
