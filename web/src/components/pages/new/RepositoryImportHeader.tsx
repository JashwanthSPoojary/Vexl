export default function RepositoryImportHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Import Repository</h1>
      <p className="text-muted-foreground text-sm">
        Select a repository to import into your workspace.{" "}
        <span className="font-medium text-foreground">
          Only React projects are supported.
        </span>
      </p>
    </div>
  );
}
