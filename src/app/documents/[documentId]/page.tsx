import { Editor } from "./editor";

interface DocumentIdPageParams {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageParams) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
