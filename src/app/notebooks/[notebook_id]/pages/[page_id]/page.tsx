export default function Page(
  { params }: { params: { notebook_id: string, page_id:string } }
) {
  const notebook_id: string = params.notebook_id;
  const page_id: string = params.page_id;

  return (
    <span className="h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl font-bold">notebooks/{notebook_id}/pages/{page_id}</p>
      </div>
    </span>
  );
}
