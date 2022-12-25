import { BlogAuthor } from "../interfaces";

export const AUTHORS: Record<string, BlogAuthor> = {
  steviegt6: {
    name: "Tomat",
    picture: "https://github.com/steviegt6.png",
  },
};

export default function getAuthor(
  authorShorthand: string | undefined = undefined,
  authorName: string | undefined = undefined,
  authorProfile: string | undefined = undefined
): BlogAuthor {
  if (authorShorthand && AUTHORS[authorShorthand]) {
    return AUTHORS[authorShorthand];
  }

  if (!authorName) authorName = "<no name>";
  if (!authorProfile) authorProfile = "<no profile>"; // 404 image eventually
  return { name: authorName, picture: authorProfile };
}
