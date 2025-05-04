export default function Field({ children, className, onSort }) {
  return (
    <td className={`p-4 min-w-4 ${className}`} onClick={onSort}>
      {children}
    </td>
  );
}
