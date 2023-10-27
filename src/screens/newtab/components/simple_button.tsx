function SimpleButton({
	label,
	onClick
}: {
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			className="hover:bg-white/20 p-2 rounded cursor-pointer"
			onClick={onClick}
		>
			{label}
		</button>
	);
}

export default SimpleButton;
