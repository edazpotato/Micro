import { useRouter } from "next/router";

export default function UserPage() {
	const router = useRouter();
	return <>{router.query["user"]}</>;
}
