import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProperties {
  children: string;
}

const Markdown = ({ children }: MarkdownProperties) => {
  return (
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
              margin: "1em 0",
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
  );
};

export default Markdown;
