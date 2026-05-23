import { atomWithStorage } from "jotai/utils";
import type { EventType, ItemType } from "./types";

export const eventAtom = atomWithStorage<{ id: string; value: EventType }[]>(
  "events",
  [],
  undefined,
  {
    getOnInit: true,
  },
);

export const projectsAtom = atomWithStorage<{ id: string; value: ItemType }[]>(
  "projects",
  [],
  undefined,
  {
    getOnInit: true,
  },
);

export const blogAtom = atomWithStorage<{ id: string; value: ItemType }[]>(
  "blog",
  [],
  undefined,
  {
    getOnInit: true,
  },
);