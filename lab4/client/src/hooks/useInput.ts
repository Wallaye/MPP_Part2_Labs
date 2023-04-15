import React, {useState} from "react";

interface InputReturn {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function useInput(initialValue: string): InputReturn
    {
    const [value, setValue] = useState<string>(initialValue);

    const onChange = (event: any) => {
        setValue(event.target.value);
    }

    return {
        value,
        onChange
    }
}