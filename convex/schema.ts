import { v } from "convex/values";
import { defineEnt, defineEntSchema, getEntDefinitions } from "convex-ents";

const schema = defineEntSchema({
	// Option 1
	cats_1: defineEnt({
		name: v.string(),
	}).edge("cat_age_1", {
		to: "cat_ages_1",
		ref: "cat_1_id", // cat_ages has the foreign key
	}),

	cat_ages_1: defineEnt({
		age: v.number(),
		cat_1_id: v.id("cats_1"), // Add the field definition
	}).edge("cat_1", {
		to: "cats_1",
		field: "cat_1_id", // This table stores the foreign key
	}),

	// Option 2
	cats_2: defineEnt({
		name: v.string(),
		cat_age_2_id: v.optional(v.id("cat_ages_2")),
	})
		.deletion("soft") // Enable soft deletes
		.edge("cat_age_2", {
			to: "cat_ages_2",
			field: "cat_age_2_id",
			optional: true,
			deletion: "soft", // Cascade delete from cats_2 to cat_ages_2 is only one-directional when using soft deletes
		}),

	cat_ages_2: defineEnt({
		age: v.number(),
	})
		.deletion("soft") // Enable soft deletes
		.edge("cat_2", {
			to: "cats_2",
			ref: "cat_age_2_id",
			// NO deletion config here = no cascade from cat_ages_2 to cats_2
		}),

	cats_3: defineEnt({
		name: v.string(),
		cat_age_3_id: v.optional(v.id("cat_ages_3")),
	}),

	cat_ages_3: defineEnt({
		age: v.number(),
	}),
});

export default schema;

export const entDefinitions = getEntDefinitions(schema);
