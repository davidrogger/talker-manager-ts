type WarningMsgProps = {
  message: string,
}

function WarningMsg({ message }:WarningMsgProps) {
  return (
    <div className="absolute w-full border rounded border-red-400 border-opacity-50 p-1 translate-y-full left-0 -bottom-2 text-center">
      <span className="text-sm text-red-300">
        { message }
      </span>
    </div>
  );
}

export default WarningMsg;
