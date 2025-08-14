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
          a: ({ href, children, ...properties }) => {
            const url = href ?? "#";

            // Consider http/https as external. Leave mailto/tel as-is (no target).
            const isExternal = /^https?:\/\//i.test(url);

            // ReactMarkdown passes `node` which should not be spread onto DOM elements.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { node, ...anchorProperties } = (properties ?? {}) as Record<
              string,
              unknown
            >;

            return isExternal ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
                {...(anchorProperties as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
              >
                {children}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link
                href={url}
                style={{ textDecoration: "underline" }}
                {...(anchorProperties as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
              >
                {children}
              </Link>
            );
          },
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
