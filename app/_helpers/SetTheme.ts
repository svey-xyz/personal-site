"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const setTheme = (currentTheme = "") => {
	const newTheme = currentTheme === "light" ? "dark" : "light";
	cookies().set("theme", newTheme); // This method can only be used with `Server Actions` or `Route Handlers`.
	revalidatePath("/");
};
