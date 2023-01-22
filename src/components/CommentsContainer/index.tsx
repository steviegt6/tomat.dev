import ThemableGiscus, { ThemableGiscusProps } from "../ThemableGiscus";

export interface CommentsContainerProps extends ThemableGiscusProps {}

export default function CommentsContainer(props: CommentsContainerProps) {
  return (
    <div>
      <hr className="mt-3 mb-2" />
      <ThemableGiscus {...props} />
    </div>
  );
}
