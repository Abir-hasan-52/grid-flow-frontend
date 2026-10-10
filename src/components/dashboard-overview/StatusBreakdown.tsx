import { Badge } from "@/components/ui/badge";

interface StatusBreakdownProps {
  title: string;
  items: { status?: string; type?: string; _count: number }[];
}

export default function StatusBreakdown({ title, items }: StatusBreakdownProps) {
  return (
    <div className="rounded-xl border bg-background p-5">
      <p className="mb-3 text-sm font-medium">{title}</p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No data</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Badge key={item.status ?? item.type} variant="secondary">
              {(item.status ?? item.type)}: {item._count}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}