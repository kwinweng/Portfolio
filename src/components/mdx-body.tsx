import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { useMDXComponents } from "../../mdx-components";

export function MDXBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={useMDXComponents()}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: { light: "github-light", dark: "github-dark" },
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
