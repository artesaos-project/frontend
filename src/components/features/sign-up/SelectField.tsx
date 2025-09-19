interface SelectProps {
  options: { value: string; label: string }[];
  [key: string]: unknown;
}

const Select = ({ options, ...props }: SelectProps) => (
  <select
    {...props}
    className="col-span-1 rounded-3xl px-2 p-2 border-2 border-midnight font-bold text-center"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;
