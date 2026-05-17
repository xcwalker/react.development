import type { ReactNode } from "react";

type Classes = {
  id?: string;
  className?: string;
};

export type SectionType = {
  id: string;
  className?: string;
  children: ReactNode;
  container?: Classes;
  style?: React.CSSProperties;
  background?: ReactNode;
  aria?: {
    label?: string;
    busy?: boolean;
    hidden?: boolean;
  };
};

export type EventType = {
  link: string;
  type: string;
  title: string;
  date: {
    start: string;
    end: string;
  };
  location: string;
};

export const EventVariants = {
  livestream: {
    title: "Live Event",
    icon: "airwave",
  },
  ama: {
    title: "Q&A Session",
    icon: "question_mark",
  },
  release: {
    title: "Product Release",
    icon: "deployed_code",
  },
  test: {
    title: "Test Event",
    icon: "experiment",
  },
};

export type ItemType = {
  data: {
    title: string;
    subTitle: string;
    description: string;

    instructions?: {
      prep?: string[];
      cook: string[];
    };
    ingredients?: string[];
    information?: {
      prepTime: string;
      cookTime: string;
      serves: string;
    };
  };
  metaData: {
    date: {
      created: string;
      modified: string;
    };
    thumbnail: string;
    images: string[];
    youtube?: string;
    tags: string[];
    collection: string;
    collectionName: string;
    colors?: {
      dark: string;
      light: string;
    };
    authorID: string;
    key?: string;
    github?: string;
    workshop?: string;
    parnix?: boolean;
    organizationID?: string;
  };
};