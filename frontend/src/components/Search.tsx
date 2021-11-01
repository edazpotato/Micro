import clsx from "clsx";
import { TextField } from ".";

export interface SearchProps {
        className?: string;
}

export function Search({
        className,
}: SearchProps) {
    return (
	    <div className="p-12">
                {/* TODO: Add search icon */}
                <TextField label="search" placeholder="Find people and posts..." type="search" rounded className={
                    clsx(
                        "w-full",
                        className
                    )}></TextField>
            </div>
    );
}