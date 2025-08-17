import { ReactNode } from "react";

// These tags are available
type Tag = "ul" | "li";

type RichTextProperties = {
  className?: string;
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

export default function RichText({ className, children }: RichTextProperties) {
  return (
    <div className={className}>
      {children({
        ul: (chunks: ReactNode) => <ul>{chunks}</ul>,
        li: (chunks: ReactNode) => <li>{chunks}</li>,
      })}
    </div>
  );
}
