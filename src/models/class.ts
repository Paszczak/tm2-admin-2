export type ClassType = {
  id: string;
  name: string;
  slug?: string;
};

export type ClassContentType = {
  id: string;
  classId: string;
  title: string;
  body: string;
  files?: string[];
  created: string;
};
