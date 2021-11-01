import { TextField } from "../components";
import clsx from "clsx";

export const Normal = () => (
	<>
        	<div className="p-12">
                {/* TODO: Add search icon */}
                <TextField label="search" placeholder="Find people and posts..." type="search" rounded className={
                    clsx(
                        "w-full",
                    )}></TextField>
            </div>
	</>
);