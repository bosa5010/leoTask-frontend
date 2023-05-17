import React from "react";
import Select from "react-select";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

export default function ReactSelect({
  closeMenuOnSelect,
  defaultValue = [],
  onChange,
  onInputChange,
  options,
  isMulti,
  isSearchable,
  isDisabled,
  label,
  name,
  error,
  value,
  loading,
  defaultInputValue = "",
  placeholder = "",
  getOptionValue,
  getOptionLabel,
  setSelectedOptions,
  required = false,
  mandatoryError = false,
}) {
  const handleSelectOption = (e) => {
    setSelectedOptions && setSelectedOptions(e);
    onChange && onChange(e);
  };
  return (
    <div>
      <div>
        <label
          htmlFor={name}
          style={mandatoryError ? { color: "red", fontSize: "2.5rem" } : {}}
        >
          {required && "* "}
        </label>
        <label htmlFor={name}>{label}</label>
        {error && <MessageBox variant="danger">{error} </MessageBox>}

        {loading && <LoadingBox></LoadingBox>}
      </div>
      <div>
        <Select
          closeMenuOnSelect={closeMenuOnSelect}
          defaultValue={defaultValue}
          onChange={handleSelectOption}
          onInputChange={onInputChange}
          options={options}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          name={name}
          value={value}
          placeholder={
            placeholder
              ? "Select " + placeholder + " ..."
              : "Select " + label + " ..."
          }
          className="basic-multi-select"
          classNamePrefix="select"
          getOptionValue={getOptionValue ? getOptionValue : ({ _id }) => _id}
          getOptionLabel={getOptionLabel ? getOptionLabel : ({ name }) => name}
          defaultInputValue={defaultInputValue}
        />
      </div>
    </div>
  );
}
