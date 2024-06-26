import type { CollectionConfig } from "payload/types";

import { isAdmin, isAdminFieldLevel } from "@/access/isAdmin";
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from "@/access/isAdminOrSelf";

const Users: CollectionConfig = {
	slug: "users",
	auth: {
		tokenExpiration: 28800, // 8 hours
		cookies: {
			sameSite:
				process.env.NODE_ENV === "production" && !process.env.DISABLE_SECURE_COOKIE
					? "None"
					: undefined,
			secure:
				process.env.NODE_ENV === "production" && !process.env.DISABLE_SECURE_COOKIE
					? true
					: undefined,
			domain: process.env.COOKIE_DOMAIN,
		},
	},
	admin: {
		useAsTitle: "email",
	},
	access: {
		create: isAdmin,
		read: () => true,
		update: isAdminOrSelf,
		delete: isAdminOrSelf,
	},
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "firstName",
					type: "text",
					required: true,
				},
				{
					name: "lastName",
					type: "text",
					required: true,
				},
			],
		},
		{
			name: "roles",
			type: "select",
			hasMany: true,
			defaultValue: ["public"],
			required: true,
			access: {
				read: isAdminOrSelfFieldLevel,
				create: isAdminFieldLevel,
				update: isAdminFieldLevel,
			},
			options: ["admin", "public"],
		},
	],
};

export default Users;
