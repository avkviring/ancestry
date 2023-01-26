import { Node } from "relatives-tree/lib/types";

// RelType {
//   blood = "blood",
//   married = "married",
//   divorced = "divorced",
//   adopted = "adopted",
//   half = "half"
// }

export type Photo = {
  description?: string;
  persons?: string[];
  image?: string;
  backSideImg?: string;
  date?: string;
  place?: string;
};

export type Document = {
  type?: string;
  description?: string;
  persons?: string[];
  image?: string;
  weight?: string;
  url?: string;
};

export type AdditionalPerson = {
  name?: string;
  img?: string;
  birthday?: string;
  placebirth?: string;
  deathplace?: string;
  deathday?: string;
  surnameBefore?: string[];
  surname?: string;
  photos?: Photo[];
  documents?: Document[];
  biography?: string;
  isActive?: boolean;
};

export type Person = AdditionalPerson & Node;

export type ExtendedNode = AdditionalPerson &
  Node &
  Readonly<{
    top: number;
    left: number;
    hasSubTree: boolean;
  }>;
