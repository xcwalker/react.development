import { useSetAtom } from "jotai";
import { eventAtom, projectsAtom } from "./atoms";
import { useEffect } from "react";
import FirebaseGetRealtimeDataSet from "./functions/firebase/storage/useRealtimeDataSet";

export default function Fetcher() {
	const setEvents = useSetAtom(eventAtom);
	const setProjects = useSetAtom(projectsAtom);

	useEffect(() => {
		FirebaseGetRealtimeDataSet("events", setEvents);
		FirebaseGetRealtimeDataSet("projects", setProjects, {
			organizationID: import.meta.env.VITE_ORGANIZATION_ID
		});
	}, [setEvents, setProjects]);

	return <></>
}