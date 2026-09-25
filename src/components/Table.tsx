import { ReactNode } from 'react'

interface TableProps {
  head: string[]
  rows: ReactNode[][]
  caption: string
}

// Hairline-ruled table, first column carrying the emphasis.
export default function Table({ head, rows, caption }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.88rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="whitespace-nowrap px-[18px] py-3 text-left text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-ink-soft"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border-t border-ink/25 px-[18px] py-[11px] align-top ${
                    cellIndex === 0 ? 'font-bold' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
