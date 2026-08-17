export function DataTable({
  columns,
  rows,
  highlightLastRow,
}: {
  columns: string[];
  rows: (string | number)[][];
  highlightLastRow?: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-white/[0.02]">
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isLast = highlightLastRow && i === rows.length - 1;
            return (
              <tr
                key={i}
                className={
                  isLast
                    ? "bg-coral/[0.06] font-medium text-foreground"
                    : i % 2 === 0
                    ? "bg-transparent"
                    : "bg-white/[0.015]"
                }
              >
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 ${j === 0 ? "text-foreground" : "mono-tag text-muted"}`}>
                    {cell}
                    {isLast && j === 0 && <span className="ml-2 text-[10px] text-coral">★ ensemble</span>}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
