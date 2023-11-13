import classNames from "classnames";

export type MainAxis = "row" | "column" | "row-reverse" | "column-reverse";
export type AxisAlignment =
	| "start"
	| "center"
	| "end"
	| "around"
	| "between"
	| "evenly";
export type ItemsAlignment =
	| "start"
	| "center"
	| "end"
	| "stretch"
	| "baseline";

export interface ContainerProps {
	children: React.ReactNode;
	mainAxis?: MainAxis;
	mainAxisAlignment?: AxisAlignment;
	crossAxisAlignment?: AxisAlignment;
	itemsAlignment?: ItemsAlignment;
	expand?: boolean;
	float?: boolean;
	fill?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

const axisStyle = {
	"row": "flex-row",
	"column": "flex-col",
	"row-reverse": "flex-row-reverse",
	"column-reverse": "flex-col-reverse"
};

const justifyStyle = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	around: "justify-around",
	between: "justify-between",
	evenly: "justify-evenly"
};

const contentStyle = {
	start: "content-start",
	center: "content-center",
	end: "content-end",
	around: "content-around",
	between: "content-between",
	evenly: "content-evenly"
};

const itemsStyle = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
	baseline: "items-baseline"
};

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

export function Title({ label }: { label: string }) {
	return <h1 className="text-2xl font-bold text-center">{label}</h1>;
}

export function Expandable({ children }: { children: React.ReactNode }) {
	return <div className="grow">{children}</div>;
}

export function Space() {
	return <div className="grow" />;
}
