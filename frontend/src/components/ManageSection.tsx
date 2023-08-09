type ManageSectionProps = {
  sectionName: string,
}

export default function ManageSection({ sectionName }:ManageSectionProps) {
  return (
    <div className="border rounded m-4 p-4 hover:shadow-2xl">
      <h1 className="text-slate-500">
        {sectionName} Management
      </h1>
    </div>
  );
}
