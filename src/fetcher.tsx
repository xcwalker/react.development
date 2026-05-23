import { useSetAtom } from "jotai";
import { blogAtom, eventAtom, projectsAtom } from "./atoms";
import { useEffect } from "react";
import FirebaseGetRealtimeDataSet from "./functions/firebase/storage/useRealtimeDataSet";

export default function Fetcher() {
	const setEvents = useSetAtom(eventAtom);
	const setProjects = useSetAtom(projectsAtom);
	const setBlog = useSetAtom(blogAtom);

	useEffect(() => {
		FirebaseGetRealtimeDataSet("events", setEvents, {
      organizationID: import.meta.env.VITE_ORGANIZATION_ID,
    });
		FirebaseGetRealtimeDataSet("projects", setProjects, {
			organizationID: import.meta.env.VITE_ORGANIZATION_ID
		});
		FirebaseGetRealtimeDataSet("blog", setBlog, {
      organizationID: import.meta.env.VITE_ORGANIZATION_ID,
    });
	}, [setEvents, setProjects, setBlog]);

	return <></>
}