type InputTextProps = {
  placeholder: string,
  type?: string,
}

function InputText({ placeholder, type = 'text' }: InputTextProps) {
  return (
    <input
      type={type}
      placeholder={ placeholder }
      className="border rounded p-1 h-8 focus:border-opacity-80 m-1"
    />
  );
}

export default InputText;
