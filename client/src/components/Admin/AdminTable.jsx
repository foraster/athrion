import { renderSortArrow } from "../../utils/helpers";

/**
 * @param {{
 *   columns: { label: string, key: string, sortable?: boolean }[],
 *   data: any[],
 *   selectAllChecked: boolean,
 *   onSelectAllToggle: () => void,
 *   onSort?: (key: string) => void,
 *   sortConfig?: { key: string, direction: "asc" | "desc" },
 *   renderRow: (item: any) => JSX.Element,
 *   emptyText?: string
 * }} props
 */
const AdminTable = ({
  columns,
  data,
  selectAllChecked,
  onSelectAllToggle,
  onSort,
  sortConfig,
  renderRow,
  emptyText = "No entries found.",
}) => {
  return (
    <div className="overflow-x-auto border border-gray-600 rounded-lg">
      <table className="min-w-full text-md text-left">
        <thead className="bg-neutral-800 text-gray-300 uppercase">
          <tr>
            {/* Select all checkbox */}
            <th className="px-2 py-3">
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={onSelectAllToggle}
                className="w-4 h-4"
              />
            </th>
            {columns.map(({ label, key, sortable }) => (
              <th
                key={key}
                className={`px-4 py-3 ${sortable ? "cursor-pointer select-none" : ""}`}
                onClick={() => sortable && onSort?.(key)}
              >
                {label}
                {sortable && renderSortArrow(sortConfig, key)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-neutral-900 divide-y divide-neutral-700">
          {data.map(renderRow)}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-6 text-gray-400"
              >
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;