import { v } from "convex/values";
import { mutation } from "./functions";

// Cat 1
export const createCat1 = mutation({
	args: {
		name: v.string(),
		age: v.number(),
	},
	handler: async (ctx, args) => {
		const newCat1Id = await ctx.table("cats_1").insert({
			name: args.name,
		});
		await ctx.table("cat_ages_1").insert({
			cat_1_id: newCat1Id,
			age: args.age,
		});
		return newCat1Id;
	},
});

export const createCat1WithoutAge = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const newCat1Id = await ctx.table("cats_1").insert({
			name: args.name,
		});
		return newCat1Id;
	},
});

export const deleteCat1 = mutation({
	args: {
		cat_1_id: v.id("cats_1"),
	},
	handler: async (ctx, args) => {
		const cat1 = await ctx.table("cats_1").getX(args.cat_1_id);
		await cat1.delete();
		return args.cat_1_id;
	},
});

export const deleteCat1Age = mutation({
	args: {
		cat_1_id: v.id("cats_1"),
	},
	handler: async (ctx, args) => {
		const cat1Age = await ctx
			.table("cat_ages_1")
			.getX("cat_1_id", args.cat_1_id);
		await cat1Age.delete();
	},
});

// Cat 2
export const createCat2 = mutation({
	args: {
		name: v.string(),
		age: v.number(),
	},
	handler: async (ctx, args) => {
		const catAge2Id = await ctx.table("cat_ages_2").insert({
			age: args.age,
		});
		const newCat2Id = await ctx.table("cats_2").insert({
			name: args.name,
			cat_age_2_id: catAge2Id,
		});
		return newCat2Id;
	},
});

export const createCat2WithoutAge = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const newCat2Id = await ctx.table("cats_2").insert({
			name: args.name,
		});
		return newCat2Id;
	},
});

export const deleteCat2 = mutation({
	args: {
		cat_2_id: v.id("cats_2"),
	},
	handler: async (ctx, args) => {
		const cat2 = await ctx.table("cats_2").getX(args.cat_2_id);
		await cat2.delete();
		if (cat2.cat_age_2_id != null) {
			const cat2Age = await ctx.table("cat_ages_2").getX(cat2.cat_age_2_id);
			await cat2Age.delete();
		}
		return args.cat_2_id;
	},
});

export const deleteCat2Age = mutation({
	args: {
		cat_2_id: v.id("cats_2"),
	},
	handler: async (ctx, args) => {
		const cat2 = await ctx.table("cats_2").getX(args.cat_2_id);
		if (cat2.cat_age_2_id != null) {
			const cat2Age = await ctx.table("cat_ages_2").get(cat2.cat_age_2_id);
			if (cat2Age != null) {
				await cat2Age.delete();
			}
		}
	},
});

// Cat 3
export const createCat3 = mutation({
	args: {
		name: v.string(),
		age: v.number(),
	},
	handler: async (ctx, args) => {
		const catAge2Id = await ctx.table("cat_ages_3").insert({
			age: args.age,
		});
		const newCat3Id = await ctx.table("cats_3").insert({
			name: args.name,
			cat_age_3_id: catAge2Id,
		});
		return newCat3Id;
	},
});

export const createCat3WithoutAge = mutation({
	args: {
		name: v.string(),
	},
	handler: async (ctx, args) => {
		const newCat3Id = await ctx.table("cats_3").insert({
			name: args.name,
		});
		return newCat3Id;
	},
});

export const deleteCat3 = mutation({
	args: {
		cat_3_id: v.id("cats_3"),
	},
	handler: async (ctx, args) => {
		const cat3 = await ctx.table("cats_3").getX(args.cat_3_id);
		await cat3.delete();
		if (cat3.cat_age_3_id != null) {
			const cat3Age = await ctx.table("cat_ages_3").getX(cat3.cat_age_3_id);
			await cat3Age.delete();
		}
		return args.cat_3_id;
	},
});

export const deleteCat3Age = mutation({
	args: {
		cat_3_id: v.id("cats_3"),
	},
	handler: async (ctx, args) => {
		const cat2 = await ctx.table("cats_3").getX(args.cat_3_id);
		if (cat2.cat_age_3_id != null) {
			const cat3Age = await ctx.table("cat_ages_3").get(cat2.cat_age_3_id);
			if (cat3Age != null) {
				await cat3Age.delete();
			}
		}
	},
});
