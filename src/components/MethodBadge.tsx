export default function MethodBadge({ method }: { method: string }) {
  return (
    <span className="bg-accent px-2 py-[5px] text-[0.68rem] font-extrabold uppercase leading-none tracking-[0.12em] text-paper">
      {method}
    </span>
  )
}
