/*
 * Copyright (c) Fabra Pty Ltd 2025.
 */

import type {
	GenericActionCtx,
	GenericMutationCtx,
	GenericQueryCtx,
} from "convex/server";
import { entsTableFactory } from "convex-ents";
import {
	customAction,
	customCtx,
	customMutation,
	customQuery,
} from "convex-helpers/server/customFunctions";

import type { DataModel } from "./_generated/dataModel";
import {
	type ActionCtx,
	action as baseAction,
	internalAction as baseInternalAction,
	internalMutation as baseInternalMutation,
	internalQuery as baseInternalQuery,
	mutation as baseMutation,
	query as baseQuery,
	type MutationCtx,
	type QueryCtx,
} from "./_generated/server";
import { entDefinitions } from "./schema";

export const queryCtx = (ctx: GenericQueryCtx<DataModel>) => {
	return {
		...ctx,
		db: {
			...ctx.db,
			system: ctx.db.system,
		},
		table: entsTableFactory(ctx, entDefinitions),
	} as const;
};

export const query = customQuery(baseQuery, customCtx(queryCtx));
export const internalQuery = customQuery(
	baseInternalQuery,
	customCtx(queryCtx),
);

export const mutationCtx = (ctx: GenericMutationCtx<DataModel>) => {
	return {
		...ctx,
		db: {
			...ctx.db,
			system: ctx.db.system,
		},
		table: entsTableFactory(ctx, entDefinitions),
	} as const;
};

export const mutation = customMutation(baseMutation, customCtx(mutationCtx));
export const internalMutation = customMutation(
	baseInternalMutation,
	customCtx(mutationCtx),
);

export const actionCtx = (ctx: GenericActionCtx<DataModel>) => ctx;

export const action = customAction(baseAction, customCtx(actionCtx));
export const internalAction = customAction(
	baseInternalAction,
	customCtx(actionCtx),
);
