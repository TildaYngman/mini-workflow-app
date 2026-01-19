export type Note = {
  id: string;
  title: string;
  text: string;
  status: "pending" | "approved";
};
