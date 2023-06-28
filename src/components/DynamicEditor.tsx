import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../components/editor'), { ssr: false });

export function DynamicEditor({
  url,
  headers,
}: { url: string; headers?: Record<string, string> }): JSX.Element {
  return <Editor url={url} headers={headers} />;
}
