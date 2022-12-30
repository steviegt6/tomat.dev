import ThemableGiscus, { ThemableGiscusProps } from "../ThemableGiscus";

export interface CommentsContainerProps extends ThemableGiscusProps {}

export default function CommentsContainer(props: CommentsContainerProps) {
  return <ThemableGiscus {...props} />;
}
