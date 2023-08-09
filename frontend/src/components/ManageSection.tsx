type ManageSectionProps = {
  sectionName: string,
}

export default function ManageSection({ sectionName }:ManageSectionProps) {
  return (
    <div>
      <h1>
        {sectionName} Management
      </h1>
    </div>
  );
}
