import Select from "react-select";

export default function Filter({
  type,
  text,
  name,
  options,
  isMulti,
  changeValue,
}) {
  function handleChange(value) {
    changeValue((prevValue) => ({ ...prevValue, [name]: value }));
  }

  return (
    <div className="border-2 p-2 rounded-2xl">
      <label className="pr-3" htmlFor={name}>
        {text}
      </label>
      {type === "DATE" ? (
        <input
          className="block h-9"
          type="date"
          name={name}
          onChange={(event) => handleChange(event.target.value)}
        />
      ) : (
        <Select
          defaultValue=""
          onChange={(item) => {
            if (isMulti) {
              handleChange(item.map((option) => option.value));
            } else {
              handleChange(item.value);
            }
          }}
          options={options}
          isMulti={isMulti}
          closeMenuOnSelect={!isMulti}
          name={name}
        />
      )}
    </div>
  );
}
