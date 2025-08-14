import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProperties {
  children: string;
  className?: string;
}

const Markdown = ({ children, className }: MarkdownProperties) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <Link
              href={href ?? "#"}
              target="_blank"
              rel="noreferrer noopener"
              style={{ textDecoration: "underline" }}
            >
              {children}
            </Link>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5em",
                margin: "0.5em 0",
              }}
            >
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li style={{ marginBottom: "0.25em" }}>{children}</li>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
