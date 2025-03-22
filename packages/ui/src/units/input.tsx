import { HTMLAttributes } from "react";
import { Text } from "./text";

interface InputController<T> extends HTMLAttributes<HTMLInputElement | HTMLSelectElement> {
    initialValue: T extends string | number | readonly string[] ? T : never;
    value: T;
    setValue: (value: T) => void;
}

export function Input<T>({ _controller, placeholder, label, inputType, options }: { _controller: InputController<T>, placeholder: string, label: string, inputType: "text" | "number" | "password" | "search" | "email" | "textarea" | "select", options?: { value: string | number, label: string }[] }) {
    return (
        <div className="w-full flex flex-col gap-2">
            {label.trim() !== "" && <Text variant={'label'}>{label}</Text>}
            {inputType !== 'textarea' && inputType !== 'select' ?
                <input
                    type={inputType}
                    className="ui-w-full ui-border ui-border-[#F0F4FD] placeholder:ui-text-brand-lightblack/40 placeholder:ui-text-sm ui-h-[50px] ui-rounded-md ui-px-5 focus:ui-ring-brand-darkblue/50 focus:ui-ring-2 ui-duration-100 ui-outline-none"
                    placeholder={placeholder}
                    defaultValue={_controller.initialValue as string} // Adjusted type here
                    onChange={(e) => _controller.setValue(inputType === "number" ? e.target.valueAsNumber as T : e.target.value.trim() as T)}
                /> :
                inputType === 'textarea' ?
                    <textarea
                        className="ui-w-full ui-border ui-border-[#F0F4FD] placeholder:ui-text-brand-lightblack/40 placeholder:ui-text-sm ui-h-[50px] ui-rounded-md ui-px-5 ui-min-h-[140px] ui-outline-none ui-py-3 ui-resize-none focus:ui-ring-brand-darkblue/50 focus:ui-ring-2 ui-duration-100"
                        placeholder={placeholder}
                        defaultValue={_controller.initialValue as string} // Adjusted type here
                        onChange={(e) => _controller.setValue(e.target.value as T)}
                    /> :
                    <select
                        className="ui-w-full ui-border ui-border-[#F0F4FD] placeholder:ui-text-brand-lightblack/40 placeholder:ui-text-sm ui-h-[50px] ui-rounded-md ui-px-5 ui-outline-none focus:ui-ring-brand-darkblue/50 focus:ui-ring-2 ui-duration-100"
                        defaultValue={_controller.initialValue as string} // Adjusted type here
                        onChange={(e) => _controller.setValue(e.target.value as T)}
                    >
                        {options && options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
            }
        </div>
    );
}

