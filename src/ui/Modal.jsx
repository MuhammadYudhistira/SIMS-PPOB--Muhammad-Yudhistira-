import { createPortal } from "react-dom";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const iconMap = {
  information: <img src="/Logo.png" className="size-12" />,
  success: <AiOutlineCheckCircle className="text-green-500 size-12" />,
  warning: <AiOutlineWarning className="text-yellow-500 size-12" />,
  danger: <AiOutlineCloseCircle className="text-red-500 size-12" />,
};

export default function Modal({ message, amount, type = "information", onOk, onCancel }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white w-full max-w-sm mx-auto rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center gap-3">
          <div>{iconMap[type]}</div>
          <div className="flex-1">
            <p className="text-gray-800 font-medium text-center">{message}</p>
            {amount && (
              <p className="text-gray-800 font-medium text-center text-2xl">Rp{amount}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-end gap-4">
          <button
            onClick={onOk || (() => { })}
            className="text-red-500 font-bold cursor-pointer"
          >

            {type === "information" ? "Ya, Lanjutkan Top Up" : "OK"}
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-gray-300 font-bold cursor-pointer"
            >
              Batalkan
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
