import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Themes = string[];

export type BlogAuthor = {
  name: string;
  picture: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: BlogAuthor;
  excerpt: string;
  content: MDXRemoteSerializeResult;
};
