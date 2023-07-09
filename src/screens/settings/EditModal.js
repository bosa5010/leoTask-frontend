import React, { useEffect, useState } from "react";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import SimpleModal from "../../components/modal/SimpleModal";

export default function EditModal({
  onClose,
  onOpen,
  title,
  onSubmit,
  loading,
  success,
  error,
  item = { name: "", description: "", extraFieldName: "" },
  extraFieldName,
  typeField = "text",
  labeField = "",
  icon,
  component,
  className,
  myProp,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [extraField, setExtraField] = useState("");

  const inputChangeHandler = (setValue, e) => {
    const value = e.target.value;
    setValue(value);
  };

  useEffect(() => {
    item.name && setName(item.name);
    item.description && setDescription(item.description);
    extraFieldName &&
      item[extraFieldName] !== "" &&
      setExtraField(item[extraFieldName]);
  }, [item, extraFieldName]);

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(name, description, extraField);
    setTimeout(function () {
      setName("");
      setDescription("");
      setExtraField("");
    }, 2000);
  };

  return (
    <SimpleModal
      title={title}
      onClose={onClose}
      onOpen={onOpen}
      icon={icon}
      component={component}
      className={className}
    >
      <h2>
        {title} {name && name}
      </h2>
      <form className="form" id="formAdd" onSubmit={submitHandler}>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error} </MessageBox>}
        {success && (
          <MessageBox variant="success">{title} Successfuly</MessageBox>
        )}
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              required={true}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoComplete="password"
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              autoComplete="password"
              required={true}
            ></textarea>
          </div>
          {extraFieldName && (
            <div>
              <label htmlFor={extraFieldName}>{labeField}</label>
              <input
                id={extraFieldName}
                type={typeField}
                placeholder={`Enter ${extraFieldName}`}
                value={extraField}
                onChange={(e) => {
                  inputChangeHandler(setExtraField, e);
                }}
                autoComplete="password"
                required={true}
              ></input>
            </div>
          )}
          <div>{myProp}</div>

          <div>
            <label></label>
            <button type="submit" className="primary">
              {title}
            </button>
          </div>
        </>
      </form>
    </SimpleModal>
  );
}
