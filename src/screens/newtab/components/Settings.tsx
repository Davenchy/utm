import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import InputBox from "./InputBox.tsx";
import { Container, Header, Title } from "./QuickLayout";
import { useStorageScope } from "@/features/StorageManager.tsx";

function Label({ text: text }: { text: string }) {
	return <h1 className="text-l font-bold">{text}</h1>;
}

function SettingsSection({
	label,
	children
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-2">
			<h1 className="text-xl font-bold text-center">{label}</h1>
			{children}
			<hr />
		</div>
	);
}

function WallpaperSection() {
	const [image, setImage] = useStorageScope("backgroundImage");

	return (<SettingsSection label="Wallpaper">
		<Label text="From URL" />
		<InputBox
			type="url"
			theme="dark"
			placeholder="Wallpaper URL (Leave Empty For Default Wallpaper)"
			value={image}
			onChange={(value) => setImage(_ => value)}
			fill
		/>
	</SettingsSection>)
}

export function SettingsDialog() {
	return (
		<Container itemsAlignment="stretch" fill>
			<Header>
				<FontAwesomeIcon icon={faSliders} />
				<Title label="Settings" />
			</Header>
			<Container itemsAlignment="stretch" className="p-2 overflow-hidden overflow-y-auto" expand>
				<WallpaperSection />
			</Container>
		</Container>
	);
}

export default function Settings() {
	return (<div className="w-8/12 h-3/4">
		<SettingsDialog />
	</div>);
}
