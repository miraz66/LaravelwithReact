import clsx from "clsx";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={clsx("block text-white text-lg font-medium", className)}
        >
            {value ? value : children}
        </label>
    );
}
