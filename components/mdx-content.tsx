import { MDXRemote } from "next-mdx-remote/rsc";

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-record max-w-none">
      <MDXRemote source={source} />
    </div>
  );
}
