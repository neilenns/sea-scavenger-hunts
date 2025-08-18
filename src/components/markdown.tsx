import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProperties {
  children: string;
  className?: string;
}

const Markdown = ({ children, className }: MarkdownProperties) => {
  const t = useTranslations("components");

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
                className="underline"
                {...(anchorProperties as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
              >
                {children}
                <span className="sr-only">
                  {" "}
                  {t("markdown.link-opens-in-new-tab")}
                </span>
              </a>
            ) : (
              <Link
                href={url}
                className="underline"
                {...(anchorProperties as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
              >
                {children}
              </Link>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc pl-6 my-2">{children}</ul>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
